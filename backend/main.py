from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_classic.chains import RetrievalQA
from langchain_ollama import OllamaLLM

from typing import Optional
import shutil
import time
import uuid
import os
import re
import pandas as pd
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Use specific origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global cache for QA chains if needed
session_chains = {}
# ---------------------------- Models ----------------------------

class ExplainRequest(BaseModel):
    concept: str
    session_id: str

class QuizRequest(BaseModel):
    prompt: Optional[str] = None
    session_id: str

# ---------------------------- Endpoints ----------------------------

@app.post("/summarize_pdf/")
async def summarize_pdf(file: UploadFile = File(...)):
    # Save uploaded file to disk
    file_location = f"temp_{file.filename}"
    with open(file_location, "wb") as f:
        f.write(await file.read())

    try:
        # Load and split PDF
        loader = PyPDFLoader(file_location)
        documents = loader.load()
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        docs = text_splitter.split_documents(documents)

        # Generate unique session ID
        session_id = f"session_{int(time.time())}_{uuid.uuid4().hex[:8]}"
        persist_path = os.path.join("sessions", session_id)
        os.makedirs(persist_path, exist_ok=True)

        # Build vectorstore
        embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
        vectorstore = Chroma.from_documents(docs, embedding_model, persist_directory=persist_path)
        retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 10})
        llm = OllamaLLM(model="llama3.2:1b")
        qa_chain = RetrievalQA.from_chain_type(llm=llm, retriever=retriever)

        # Cache chain for reuse if needed
        session_chains[session_id] = qa_chain

        # Summarize first N chunks
        combined_text = "\n".join([doc.page_content for doc in docs[:15]])
        prompt = (
    "You are a clear and engaging explainer. Create a detailed, accurate summary of the following content, "
    "making it easy for students to understand while keeping all important facts and technical details.\n\n"
    "Focus on:\n"
    "1. Breaking big ideas into smaller, easy-to-digest points.\n"
    "2. Keeping important terms, numbers, and examples.\n"
    "3. Organizing ideas with short headings or bullet points.\n"
    "4. Avoiding extra fluff—stick to what’s in the text.\n"
    "5. If something is missing, mark it as [information not provided].\n\n"
    "Output format:\n"
    "- Short intro paragraph giving the big picture.\n"
    "- Clear section-by-section breakdown.\n"
    "- A 'Key Takeaways' list for quick revision.\n\n"
    f"Document Content:\n{combined_text}\n\nDetailed Summary:"
)

        response = llm.invoke(prompt)

        return {
            "summary": response,
            "session_id": session_id
        }

    except Exception as e:
        return {"error": str(e)}

    finally:
        if os.path.exists(file_location):
            os.remove(file_location)

# ---------------------------------------------------

@app.post("/explain_concept/")
async def explain_concept(request: ExplainRequest):
    try:
        persist_path = os.path.join("sessions", request.session_id)
        if not os.path.exists(persist_path):
            return {"error": "Session not found. Please upload a PDF first."}

        embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
        vectorstore = Chroma(persist_directory=persist_path, embedding_function=embedding_model)
        retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 10})
        llm = OllamaLLM(model="llama3.2:1b")
        qa_chain = RetrievalQA.from_chain_type(llm=llm, retriever=retriever)

        concept = (request.concept or "").strip()
        # Build a concise instruction prompt. Let the retriever provide context.
        prompt = (
            f"You are a patient teacher. Explain the concept '{concept}' ONLY using the provided class notes. "
            "Do not add outside facts. Format your response in clear Markdown with sections: "
            "What it is, Why it matters, How it works, Examples, Common mistakes, Quick check."
        )

        # Use .run(...) to obtain a plain text answer (string) suitable for JSON responses
        response_text = qa_chain.run(prompt)

        return {"explanation": response_text}
    except Exception as e:
        print("explain_concept error:", str(e))
        return {"error": str(e)}

# ---------------------------------------------------

@app.post("/generate_quiz/")
async def generate_quiz(body: QuizRequest):
    try:
        persist_path = os.path.join("sessions", body.session_id)
        if not os.path.exists(persist_path):
            return {"error": "Please upload a PDF first to load context."}

        # Load vector DB
        embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
        vectorstore = Chroma(persist_directory=persist_path, embedding_function=embedding_model)
        retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 10})
        llm = OllamaLLM(model="llama3.2:1b")
        qa_chain = RetrievalQA.from_chain_type(llm=llm, retriever=retriever)

        # Retrieve content
        docs = vectorstore.similarity_search("overview", k=15)
        combined_text = "\n".join([doc.page_content for doc in docs])

        # Default to 10 questions
        question_count = 10
        if body.prompt:
            match = re.search(r"(\d+)\s*(?:questions|quiz)", body.prompt.lower())
            if match:
                question_count = int(match.group(1))

        prompt = (
            f"Create a {question_count}-question multiple-choice quiz based ONLY on the provided content.\n"
            "The quiz should be in three categories of difficulty: easy, moderate, and hard.\n"
            "First, list all questions with their options. Do NOT mark correct answers inline.\n"
            "Format the questions in clean **Markdown** so each question and its options are on separate lines.\n\n"
            "Each question should be numbered `1.`, `2.`, etc.\n"
            "Each option should be labeled `A)`, `B)`, `C)`, `D)` on its own line.\n\n"
            "After all questions have been listed, include an `Answers:` section that maps each question to its correct option, for example:\n"
            "`Answers:`\n"
            "`Q1) A`\n"
            "`Q2) C`\n\n"
            f"Content:\n{combined_text}\n\n"
            "Quiz:\n"
        )


        print(" Generating quiz...")
        response = llm.invoke(prompt)

        # If not enough questions generated
        if response.count("A)") < question_count:
            return {
                "quiz": f"⚠️ Only partial quiz generated. Here is what we could extract:\n\n{response}"
            }

        return {"quiz": response}

    except Exception as e:
        print(" Error generating quiz:", str(e))
        return {"error": str(e)}
    
class CaseStudyRequest(BaseModel):
    session_id: str
    # Optional prompt customization if needed
    prompt: Optional[str] = None

# ---------------------------------------------------

@app.post("/generate_case_study/")
async def generate_case_study(body: CaseStudyRequest):
    try:
        persist_path = os.path.join("sessions", body.session_id)
        if not os.path.exists(persist_path):
            return {"error": "Please upload a PDF first to load context."}

        # Load vectorstore
        embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
        vectorstore = Chroma(persist_directory=persist_path, embedding_function=embedding_model)
        retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 10})
        llm = OllamaLLM(model="llama3.2:1b")
        qa_chain = RetrievalQA.from_chain_type(llm=llm, retriever=retriever)

        # Retrieve relevant content (top 15 chunks)
        docs = vectorstore.similarity_search("overview", k=15)
        combined_text = "\n".join([doc.page_content for doc in docs])

        # Use custom prompt if provided, else default
        prompt = body.prompt or (
            "Read  uploaded PDF content  and create a business case study "
            "designed for undergraduate business students to solve in about 30 minutes. "
            "Make it engaging and realistic.\n"
            "End the case study with 5 thought-provoking discussion questions.\n\n"
            f"Content:\n{combined_text}\n\nCase Study:"
        )

        print("🧠 Generating case study...")
        response = llm.invoke(prompt)

        return {"caseStudy": response}

    except Exception as e:
        print("❌ Error generating case study:", str(e))
        return {"error": str(e)}
    
class VisualizeRequest(BaseModel):
    session_id: str
    prompt: str = ""

import json
import re

# ---------------------------------------------------

@app.post("/generate_visualization/")
async def generate_visualization(body: VisualizeRequest):
    try:
        persist_path = os.path.join("sessions", body.session_id)
        if not os.path.exists(persist_path):
            return {"error": "Please upload a PDF or CSV first to load context."}

        # Load vectorstore & retriever
        embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
        vectorstore = Chroma(persist_directory=persist_path, embedding_function=embedding_model)
        retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 10})

        llm = OllamaLLM(model="llama3.2:1b")
        qa_chain = RetrievalQA.from_chain_type(llm=llm, retriever=retriever)

        # Retrieve relevant docs (e.g. top 15)
        docs = vectorstore.similarity_search("data overview", k=15)
        combined_text = "\n".join([doc.page_content for doc in docs])

        # Prompt to check and create visualization text
        prompt_text = (
            "You are an assistant that reads the document content about data and decides if there is "
            "something meaningful to visualize. If yes, respond *only* with a JSON object containing:\n"
            " - description (string): short summary of the data\n"
            " - type (string): type of chart, e.g. 'bar_chart'\n"
            " - data (array): array of objects with 'label' and 'value' fields\n"
            "If you cannot visualize the data, reply with the exact string:\n"
            "'I cannot visualize data from this document.'\n\n"
            f"Document Content:\n{combined_text}\n\n"
            "Answer with JSON only:"
        )

        response = llm.invoke(prompt_text)
        print("LLM raw response:", repr(response))  # Debug output

        # Helper to extract JSON from response string
        def extract_json_from_response(text):
            match = re.search(r'(\{.*\})', text, re.DOTALL)
            if match:
                return match.group(1)
            return None

        json_str = extract_json_from_response(response)

        if json_str:
            try:
                visualization_json = json.loads(json_str)
                return {"visualization": visualization_json}
            except Exception as e:
                print("JSON parse error:", str(e))
                print("Failed extracted JSON:", repr(json_str))
                return {"error": "Could not parse extracted JSON from LLM response."}
        else:
            if response.strip() == "I cannot visualize data from this document.":
                return {"visualization": {"description": response, "type": "none", "data": []}}
            else:
                return {"error": "Could not find JSON in LLM response."}

    except Exception as e:
        return {"error": str(e)}


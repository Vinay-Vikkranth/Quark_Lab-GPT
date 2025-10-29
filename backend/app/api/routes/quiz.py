from fastapi import APIRouter, Depends
from app.models.schemas import QuizRequest, QuizResponse, ErrorResponse
from app.services.rag_service import RAGService
from app.services.session_service import SessionService
from app.utils.helpers import extract_question_count
from app.api.dependencies import get_rag_service, get_session_service

router = APIRouter()

@router.post("/generate_quiz/", response_model=QuizResponse)
async def generate_quiz(
    body: QuizRequest,
    rag_service: RAGService = Depends(get_rag_service),
    session_service: SessionService = Depends(get_session_service)
):
    """Generate quiz from uploaded documents."""
    try:
        if not session_service.session_exists(body.session_id):
            return {"error": "Please upload a PDF first to load context."}
        
        persist_path = session_service.get_session_path(body.session_id)
        vectorstore = rag_service.load_vectorstore(persist_path)
        
        # Retrieve content
        docs = vectorstore.similarity_search("overview", k=15)
        combined_text = "\n".join([doc.page_content for doc in docs])
        
        # Extract question count
        question_count = extract_question_count(body.prompt or "", 10)
        
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
        
        print("Generating quiz...")
        response = rag_service.llm.invoke(prompt)
        
        # Check if enough questions generated
        if response.count("A)") < question_count:
            response = f"⚠️ Only partial quiz generated. Here is what we could extract:\n\n{response}"
        
        return {"quiz": response}
        
    except Exception as e:
        print("Error generating quiz:", str(e))
        return {"error": str(e)}
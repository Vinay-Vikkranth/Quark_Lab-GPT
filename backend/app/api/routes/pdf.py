from fastapi import APIRouter, UploadFile, File, Depends
from app.models.schemas import SummaryResponse, ErrorResponse
from app.services.rag_service import RAGService
from app.services.session_service import SessionService
from app.services.document_service import DocumentService
from app.api.dependencies import get_rag_service, get_session_service, get_document_service

router = APIRouter()

@router.post("/summarize_pdf/", response_model=SummaryResponse)
async def summarize_pdf(
    file: UploadFile = File(...),
    rag_service: RAGService = Depends(get_rag_service),
    session_service: SessionService = Depends(get_session_service),
    document_service: DocumentService = Depends(get_document_service)
):
    """Summarize uploaded PDF file."""
    file_location = None
    try:
        # Save uploaded file
        file_location = await document_service.save_uploaded_file(file, file.filename)
        
        # Load and split PDF
        docs = document_service.load_and_split_pdf(file_location)
        
        # Create session
        session_id = session_service.generate_session_id()
        persist_path = session_service.create_session_directory(session_id)
        
        # Create vectorstore and QA chain
        vectorstore = rag_service.create_vectorstore(docs, persist_path)
        qa_chain = rag_service.create_qa_chain(vectorstore)
        rag_service.cache_qa_chain(session_id, qa_chain)
        
        # Generate summary
        combined_text = document_service.combine_document_text(docs, 15)
        prompt = (
            "You are a clear and engaging explainer. Create a detailed, accurate summary of the following content, "
            "making it easy for students to understand while keeping all important facts and technical details.\n\n"
            "Focus on:\n"
            "1. Breaking big ideas into smaller, easy-to-digest points.\n"
            "2. Keeping important terms, numbers, and examples.\n"
            "3. Organizing ideas with short headings or bullet points.\n"
            "4. Avoiding extra fluff—stick to what's in the text.\n"
            "5. If something is missing, mark it as [information not provided].\n\n"
            "Output format:\n"
            "- Short intro paragraph giving the big picture.\n"
            "- Clear section-by-section breakdown.\n"
            "- A 'Key Takeaways' list for quick revision.\n\n"
            f"Document Content:\n{combined_text}\n\nDetailed Summary:"
        )
        
        response = rag_service.llm.invoke(prompt)
        
        return {
            "summary": response,
            "session_id": session_id
        }
        
    except Exception as e:
        return {"error": str(e)}
    
    finally:
        if file_location:
            document_service.cleanup_temp_file(file_location)
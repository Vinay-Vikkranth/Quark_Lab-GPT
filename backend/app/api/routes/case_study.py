from fastapi import APIRouter, Depends
from app.models.schemas import CaseStudyRequest, CaseStudyResponse, ErrorResponse
from app.services.rag_service import RAGService
from app.services.session_service import SessionService
from app.api.dependencies import get_rag_service, get_session_service

router = APIRouter()

@router.post("/generate_case_study/", response_model=CaseStudyResponse)
async def generate_case_study(
    body: CaseStudyRequest,
    rag_service: RAGService = Depends(get_rag_service),
    session_service: SessionService = Depends(get_session_service)
):
    """Generate case study from uploaded documents."""
    try:
        if not session_service.session_exists(body.session_id):
            return {"error": "Please upload a PDF first to load context."}
        
        persist_path = session_service.get_session_path(body.session_id)
        vectorstore = rag_service.load_vectorstore(persist_path)
        
        # Retrieve relevant content
        docs = vectorstore.similarity_search("overview", k=15)
        combined_text = "\n".join([doc.page_content for doc in docs])
        
        # Use custom prompt if provided, else default
        prompt = body.prompt or (
            "Read uploaded PDF content and create a business case study "
            "designed for undergraduate business students to solve in about 30 minutes. "
            "Make it engaging and realistic.\n"
            "End the case study with 5 thought-provoking discussion questions.\n\n"
            f"Content:\n{combined_text}\n\nCase Study:"
        )
        
        print("🧠 Generating case study...")
        response = rag_service.llm.invoke(prompt)
        
        return {"caseStudy": response}
        
    except Exception as e:
        print("❌ Error generating case study:", str(e))
        return {"error": str(e)}
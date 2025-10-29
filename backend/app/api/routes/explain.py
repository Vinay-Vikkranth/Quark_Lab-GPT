from fastapi import APIRouter, Depends
from app.models.schemas import ExplainRequest, ExplanationResponse, ErrorResponse
from app.services.rag_service import RAGService
from app.services.session_service import SessionService
from app.api.dependencies import get_rag_service, get_session_service

router = APIRouter()

@router.post("/explain_concept/", response_model=ExplanationResponse)
async def explain_concept(
    request: ExplainRequest,
    rag_service: RAGService = Depends(get_rag_service),
    session_service: SessionService = Depends(get_session_service)
):
    """Explain a concept based on uploaded documents."""
    try:
        if not session_service.session_exists(request.session_id):
            return {"error": "Session not found. Please upload a PDF first."}
        
        persist_path = session_service.get_session_path(request.session_id)
        qa_chain = rag_service.get_or_create_qa_chain(request.session_id, persist_path)
        
        concept = request.concept.strip()
        prompt = (
            f"You are a patient teacher. Explain the concept '{concept}' ONLY using the provided class notes. "
            "Do not add outside facts. Format your response in clear Markdown with sections: "
            "What it is, Why it matters, How it works, Examples, Common mistakes, Quick check."
        )
        
        response_text = qa_chain.run(prompt)
        return {"explanation": response_text}
        
    except Exception as e:
        print("explain_concept error:", str(e))
        return {"error": str(e)}
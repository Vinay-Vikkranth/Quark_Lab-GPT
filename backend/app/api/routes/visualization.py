from fastapi import APIRouter, Depends
from app.models.schemas import VisualizeRequest, VisualizationResponse, ErrorResponse
from app.services.rag_service import RAGService
from app.services.session_service import SessionService
from app.utils.helpers import extract_json_from_response, safe_json_parse
from app.api.dependencies import get_rag_service, get_session_service

router = APIRouter()

@router.post("/generate_visualization/", response_model=VisualizationResponse)
async def generate_visualization(
    body: VisualizeRequest,
    rag_service: RAGService = Depends(get_rag_service),
    session_service: SessionService = Depends(get_session_service)
):
    """Generate visualization from uploaded documents."""
    try:
        if not session_service.session_exists(body.session_id):
            return {"error": "Please upload a PDF or CSV first to load context."}
        
        persist_path = session_service.get_session_path(body.session_id)
        vectorstore = rag_service.load_vectorstore(persist_path)
        
        # Retrieve relevant docs
        docs = vectorstore.similarity_search("data overview", k=15)
        combined_text = "\n".join([doc.page_content for doc in docs])
        
        # Prompt to check and create visualization
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
        
        response = rag_service.llm.invoke(prompt_text)
        print("LLM raw response:", repr(response))  # Debug output
        
        json_str = extract_json_from_response(response)
        
        if json_str:
            visualization_json = safe_json_parse(json_str)
            if visualization_json:
                return {"visualization": visualization_json}
            else:
                print("JSON parse error")
                print("Failed extracted JSON:", repr(json_str))
                return {"error": "Could not parse extracted JSON from LLM response."}
        else:
            if response.strip() == "I cannot visualize data from this document.":
                return {"visualization": {"description": response, "type": "none", "data": []}}
            else:
                return {"error": "Could not find JSON in LLM response."}
                
    except Exception as e:
        return {"error": str(e)}
from app.services.rag_service import rag_service
from app.services.session_service import SessionService
from app.services.document_service import DocumentService

def get_rag_service():
    """Dependency to get RAG service."""
    return rag_service

def get_session_service():
    """Dependency to get session service."""
    return SessionService()

def get_document_service():
    """Dependency to get document service."""
    return DocumentService()
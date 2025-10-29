import os
import time
import uuid
from app.config.settings import settings

class SessionService:
    @staticmethod
    def generate_session_id() -> str:
        """Generate a unique session ID."""
        return f"session_{int(time.time())}_{uuid.uuid4().hex[:8]}"
    
    @staticmethod
    def create_session_directory(session_id: str) -> str:
        """Create a directory for the session and return the path."""
        persist_path = os.path.join(settings.SESSIONS_DIR, session_id)
        os.makedirs(persist_path, exist_ok=True)
        return persist_path
    
    @staticmethod
    def session_exists(session_id: str) -> bool:
        """Check if a session directory exists."""
        persist_path = os.path.join(settings.SESSIONS_DIR, session_id)
        return os.path.exists(persist_path)
    
    @staticmethod
    def get_session_path(session_id: str) -> str:
        """Get the path to a session directory."""
        return os.path.join(settings.SESSIONS_DIR, session_id)
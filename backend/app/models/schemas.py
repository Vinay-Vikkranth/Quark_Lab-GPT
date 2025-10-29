from pydantic import BaseModel
from typing import Optional

class ExplainRequest(BaseModel):
    concept: str
    session_id: str

class QuizRequest(BaseModel):
    prompt: Optional[str] = None
    session_id: str

class CaseStudyRequest(BaseModel):
    session_id: str
    prompt: Optional[str] = None

class VisualizeRequest(BaseModel):
    session_id: str
    prompt: str = ""

class SummaryResponse(BaseModel):
    summary: str
    session_id: str

class ExplanationResponse(BaseModel):
    explanation: str

class QuizResponse(BaseModel):
    quiz: str

class CaseStudyResponse(BaseModel):
    caseStudy: str

class VisualizationResponse(BaseModel):
    visualization: dict

class ErrorResponse(BaseModel):
    error: str
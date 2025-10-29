from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config.settings import settings
from app.api.routes import pdf, explain, quiz, case_study, visualization

def create_app() -> FastAPI:
    app = FastAPI(
        title="RAG Assistant API",
        description="AI-powered learning tools API",
        version="1.0.0"
    )
    
    # Add CORS middleware
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=settings.CORS_ALLOW_CREDENTIALS,
        allow_methods=settings.CORS_ALLOW_METHODS,
        allow_headers=settings.CORS_ALLOW_HEADERS,
    )
    
    # Include routers - maintaining the original endpoint paths
    app.include_router(pdf.router, tags=["PDF"])
    app.include_router(explain.router, tags=["Explanation"])
    app.include_router(quiz.router, tags=["Quiz"])
    app.include_router(case_study.router, tags=["Case Study"])
    app.include_router(visualization.router, tags=["Visualization"])
    
    return app

app = create_app()

@app.get("/")
async def root():
    return {"message": "RAG Assistant API is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
from typing import Dict, Any
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_classic.chains import RetrievalQA
from langchain_ollama import OllamaLLM
from langchain_core.documents import Document
from app.config.settings import settings

class RAGService:
    def __init__(self):
        self.embedding_model = HuggingFaceEmbeddings(model_name=settings.EMBEDDING_MODEL)
        self.llm = OllamaLLM(model=settings.LLM_MODEL)
        self.session_chains: Dict[str, RetrievalQA] = {}
    
    def create_vectorstore(self, docs: list[Document], persist_path: str) -> Chroma:
        """Create a vectorstore from documents."""
        return Chroma.from_documents(
            docs, 
            self.embedding_model, 
            persist_directory=persist_path
        )
    
    def load_vectorstore(self, persist_path: str) -> Chroma:
        """Load an existing vectorstore."""
        return Chroma(
            persist_directory=persist_path, 
            embedding_function=self.embedding_model
        )
    
    def create_qa_chain(self, vectorstore: Chroma) -> RetrievalQA:
        """Create a QA chain from vectorstore."""
        retriever = vectorstore.as_retriever(
            search_type="similarity", 
            search_kwargs={"k": settings.SIMILARITY_SEARCH_K}
        )
        return RetrievalQA.from_chain_type(llm=self.llm, retriever=retriever)
    
    def get_or_create_qa_chain(self, session_id: str, persist_path: str) -> RetrievalQA:
        """Get cached QA chain or create new one."""
        if session_id not in self.session_chains:
            vectorstore = self.load_vectorstore(persist_path)
            self.session_chains[session_id] = self.create_qa_chain(vectorstore)
        return self.session_chains[session_id]
    
    def cache_qa_chain(self, session_id: str, qa_chain: RetrievalQA) -> None:
        """Cache QA chain for reuse."""
        self.session_chains[session_id] = qa_chain

# Global RAG service instance
rag_service = RAGService()
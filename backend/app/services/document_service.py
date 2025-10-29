import os
from typing import List
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.documents import Document
from app.config.settings import settings

class DocumentService:
    @staticmethod
    async def save_uploaded_file(file, filename: str) -> str:
        """Save uploaded file to disk and return the file path."""
        file_location = f"temp_{filename}"
        with open(file_location, "wb") as f:
            f.write(await file.read())
        return file_location
    
    @staticmethod
    def load_and_split_pdf(file_path: str) -> List[Document]:
        """Load PDF and split into chunks."""
        loader = PyPDFLoader(file_path)
        documents = loader.load()
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=settings.CHUNK_SIZE, 
            chunk_overlap=settings.CHUNK_OVERLAP
        )
        return text_splitter.split_documents(documents)
    
    @staticmethod
    def cleanup_temp_file(file_path: str) -> None:
        """Remove temporary file."""
        if os.path.exists(file_path):
            os.remove(file_path)
    
    @staticmethod
    def combine_document_text(docs: List[Document], max_docs: int = 15) -> str:
        """Combine text from multiple documents."""
        return "\n".join([doc.page_content for doc in docs[:max_docs]])
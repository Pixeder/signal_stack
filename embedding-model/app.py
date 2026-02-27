from fastapi import FastAPI
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
from functools import lru_cache
import uvicorn
from fake_detector import detect_fake_news


# -----------------------------
# App Initialization
# -----------------------------

app = FastAPI(
    title="AI Embedding Service",
    description="Local embedding microservice for Tech Intelligence Platform",
    version="1.0.0"
)


# -----------------------------
# Load Model (Once)
# -----------------------------

print("⏳ Loading embedding model...")

model = SentenceTransformer("all-MiniLM-L6-v2")

print("✅ Model loaded successfully")


# -----------------------------
# Request Schema
# -----------------------------

class TextRequest(BaseModel):
    text: str


# -----------------------------
# Cached Embedding Function
# -----------------------------

@lru_cache(maxsize=1000)
def get_embedding_cached(text: str):
    """
    Generate embedding with LRU cache
    (Speeds up repeated requests)
    """
    return model.encode(text)


# -----------------------------
# Routes
# -----------------------------

@app.get("/")
def health_check():
    """
    Health check endpoint
    """
    return {
        "status": "running",
        "service": "AI Embedding Service"
    }


@app.post("/embed")
def embed_text(req: TextRequest):
    """
    Convert text to embedding vector
    """

    # Clean input
    text = req.text.strip()

    if not text:
        return {
            "error": "Text cannot be empty"
        }

    # Get cached embedding
    vector = get_embedding_cached(text)

    return {
        "success": True,
        "dimension": len(vector),
        "embedding": vector.tolist()
    }

@app.post("/verify")
def verify_news(req: TextRequest):

    result = detect_fake_news(req.text)
    return {
        "success": True,
        "prediction": result
    }


# -----------------------------
# Run Server (Direct Run)
# -----------------------------

if __name__ == "__main__":

    uvicorn.run(
        "app:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )

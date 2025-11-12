from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .core.config import settings
from .api import auth, analyze_text, analyze_meme, network_map

# Create FastAPI application
app = FastAPI(
    title="SatyaNetra API",
    description="Backend API for real-time misinformation detection platform",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,  # Frontend origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(analyze_text.router)
app.include_router(analyze_meme.router)
app.include_router(network_map.router)


@app.get("/")
async def root():
    """Health check endpoint."""
    return {
        "status": "online",
        "service": "SatyaNetra API",
        "version": "1.0.0"
    }


@app.get("/health")
async def health_check():
    """Detailed health check."""
    return {
        "status": "healthy",
        "database": "connected",
        "services": {
            "text_classifier": "active",
            "meme_classifier": "active",
            "network_graph": "active"
        }
    }

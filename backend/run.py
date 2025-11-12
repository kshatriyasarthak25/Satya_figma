#!/usr/bin/env python3
"""
Run script for SatyaNetra Backend API

Usage:
    python run.py
"""
import uvicorn
from src.core.config import settings

if __name__ == "__main__":
    uvicorn.run(
        "src.main:app",
        host=settings.API_HOST,
        port=settings.API_PORT,
        reload=True,  # Enable auto-reload during development
        log_level="info"
    )

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from pydantic import BaseModel
from datetime import datetime
from ..core.security import get_current_user
from ..core.database import get_supabase
from ..services.meme_classifier import meme_classifier

router = APIRouter(prefix="/analyze", tags=["Analysis"])


class MemeAnalysisResponse(BaseModel):
    score: float
    label: str
    explanation: str
    image_size: str
    filename: str
    analysis_id: str


@router.post("/meme", response_model=MemeAnalysisResponse)
async def analyze_meme(
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user)
):
    """
    Analyze uploaded meme/image for harmful content.

    Frontend Integration:
    ```javascript
    const formData = new FormData();
    formData.append('file', imageFile);

    const response = await fetch('http://localhost:8000/analyze/meme', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      body: formData
    });
    const result = await response.json();
    console.log('Meme Score:', result.score, 'Label:', result.label);
    ```
    """
    # Validate file type
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")

    # Read image bytes
    image_bytes = await file.read()

    if len(image_bytes) > 10 * 1024 * 1024:  # 10MB limit
        raise HTTPException(status_code=400, detail="Image file too large (max 10MB)")

    # Analyze image using classifier service
    analysis_result = meme_classifier.analyze(image_bytes, file.filename)

    # Store analysis log in database
    supabase = get_supabase()
    log_entry = {
        "user_id": current_user["user_id"],
        "input_data": f"Image: {file.filename} ({analysis_result.get('image_size', 'unknown')})",
        "result_score": analysis_result["score"],
        "result_label": analysis_result["label"],
        "analysis_type": "meme",
        "created_at": datetime.utcnow().isoformat()
    }

    log_result = supabase.table("analysis_logs").insert(log_entry).execute()

    analysis_id = log_result.data[0]["id"] if log_result.data else "unknown"

    return MemeAnalysisResponse(
        score=analysis_result["score"],
        label=analysis_result["label"],
        explanation=analysis_result["explanation"],
        image_size=analysis_result.get("image_size", "unknown"),
        filename=analysis_result["filename"],
        analysis_id=analysis_id
    )

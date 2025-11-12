from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from datetime import datetime
from ..core.security import get_current_user
from ..core.database import get_supabase
from ..services.text_classifier import text_classifier

router = APIRouter(prefix="/analyze", tags=["Analysis"])


class TextAnalysisRequest(BaseModel):
    text: str


class TextAnalysisResponse(BaseModel):
    score: float
    label: str
    explanation: str
    indicators: int
    analysis_id: str


@router.post("/text", response_model=TextAnalysisResponse)
async def analyze_text(
    request: TextAnalysisRequest,
    current_user: dict = Depends(get_current_user)
):
    """
    Analyze text content for propaganda, misinformation, and harmful content.

    Frontend Integration:
    ```javascript
    const response = await fetch('http://localhost:8000/analyze/text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({ text: "Your text here..." })
    });
    const result = await response.json();
    console.log('Score:', result.score, 'Label:', result.label);
    ```
    """
    if not request.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty")

    # Analyze text using classifier service
    analysis_result = text_classifier.analyze(request.text)

    # Store analysis log in database
    supabase = get_supabase()
    log_entry = {
        "user_id": current_user["user_id"],
        "input_data": request.text[:500],  # Store first 500 chars
        "result_score": analysis_result["score"],
        "result_label": analysis_result["label"],
        "analysis_type": "text",
        "created_at": datetime.utcnow().isoformat()
    }

    log_result = supabase.table("analysis_logs").insert(log_entry).execute()

    analysis_id = log_result.data[0]["id"] if log_result.data else "unknown"

    return TextAnalysisResponse(
        score=analysis_result["score"],
        label=analysis_result["label"],
        explanation=analysis_result["explanation"],
        indicators=analysis_result["indicators"],
        analysis_id=analysis_id
    )

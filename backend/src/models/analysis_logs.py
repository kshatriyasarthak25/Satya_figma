from pydantic import BaseModel
from datetime import datetime
from typing import Optional, Any


class AnalysisLogCreate(BaseModel):
    user_id: str
    input_data: str
    result_score: float
    result_label: str
    analysis_type: str  # 'text' or 'meme'


class AnalysisLogResponse(BaseModel):
    id: str
    user_id: str
    input_data: str
    result_score: float
    result_label: str
    analysis_type: str
    created_at: datetime

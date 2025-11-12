from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class AlertCreate(BaseModel):
    title: str
    description: str
    severity: str  # 'critical', 'high', 'medium', 'low'


class AlertResponse(BaseModel):
    id: str
    title: str
    description: str
    severity: str
    timestamp: datetime

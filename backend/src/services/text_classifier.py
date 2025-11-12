import random
from typing import Dict


class TextClassifier:
    """
    Placeholder service for text analysis.
    In production, this would use IndicBERT or similar model for propaganda/misinformation detection.
    """

    def __init__(self):
        # Keyword-based heuristics for demo purposes
        self.harmful_keywords = [
            'propaganda', 'fake', 'hoax', 'conspiracy', 'misleading',
            'unverified', 'misinformation', 'disinformation'
        ]

    def analyze(self, text: str) -> Dict[str, any]:
        """
        Analyze text and return a risk score.
        Returns: {"score": float (0-1), "label": str, "explanation": str}
        """
        text_lower = text.lower()

        # Simple keyword matching for demo
        keyword_count = sum(1 for keyword in self.harmful_keywords if keyword in text_lower)

        # Calculate score (0 = safe, 1 = highly harmful)
        base_score = min(keyword_count * 0.15, 0.9)

        # Add some randomness for realism in demo
        score = min(base_score + random.uniform(0, 0.2), 1.0)

        # Determine label
        if score >= 0.7:
            label = "Harmful Content"
        elif score >= 0.5:
            label = "Potential Propaganda"
        elif score >= 0.3:
            label = "Suspicious"
        else:
            label = "Safe"

        # Generate explanation
        if keyword_count > 0:
            explanation = f"Detected {keyword_count} risk indicators in content."
        else:
            explanation = "No obvious risk indicators detected."

        return {
            "score": round(score, 2),
            "label": label,
            "explanation": explanation,
            "indicators": keyword_count
        }


# Singleton instance
text_classifier = TextClassifier()

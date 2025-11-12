import random
from typing import Dict
from PIL import Image
import io


class MemeClassifier:
    """
    Placeholder service for meme/image analysis.
    In production, this would use computer vision models for harmful meme detection.
    """

    def analyze(self, image_bytes: bytes, filename: str) -> Dict[str, any]:
        """
        Analyze uploaded image and return a risk score.
        Returns: {"score": float (0-1), "label": str, "explanation": str}
        """
        try:
            # Open and validate image
            image = Image.open(io.BytesIO(image_bytes))
            width, height = image.size

            # Mock analysis based on image properties
            # In production: Use CNN model trained on harmful memes

            # Random score for demo (weighted toward suspicious)
            score = random.uniform(0.4, 0.95)

            # Determine label
            if score >= 0.8:
                label = "Harmful Meme"
            elif score >= 0.6:
                label = "Suspected Propaganda"
            elif score >= 0.4:
                label = "Requires Review"
            else:
                label = "Safe"

            explanation = f"Image analysis complete. Dimensions: {width}x{height}. Risk indicators detected in visual patterns."

            return {
                "score": round(score, 2),
                "label": label,
                "explanation": explanation,
                "image_size": f"{width}x{height}",
                "filename": filename
            }

        except Exception as e:
            return {
                "score": 0.0,
                "label": "Analysis Failed",
                "explanation": f"Failed to analyze image: {str(e)}",
                "filename": filename
            }


# Singleton instance
meme_classifier = MemeClassifier()

import re
import json
from typing import Optional, Dict, Any

def extract_question_count(prompt: str, default: int = 10) -> int:
    """Extract number of questions from prompt."""
    if not prompt:
        return default
    
    match = re.search(r"(\d+)\s*(?:questions|quiz)", prompt.lower())
    return int(match.group(1)) if match else default

def extract_json_from_response(text: str) -> Optional[str]:
    """Extract JSON from LLM response."""
    match = re.search(r'(\{.*\})', text, re.DOTALL)
    return match.group(1) if match else None

def safe_json_parse(json_str: str) -> Optional[Dict[Any, Any]]:
    """Safely parse JSON string."""
    try:
        return json.loads(json_str)
    except json.JSONDecodeError:
        return None
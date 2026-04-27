from model_metadata_central._registry import MODELS_BY_ID


def load_metadata(model_id: str) -> dict | None:
    """Load model metadata from the bundled registry, or None if not found."""
    return MODELS_BY_ID.get(model_id)

from model_metadata_central._registry import MODELS_BY_ID


def get_metadata_models() -> list[str]:
    """Get all model_ids in the registry."""
    return list(MODELS_BY_ID.keys())

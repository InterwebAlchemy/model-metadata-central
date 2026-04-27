from model_metadata_central._registry import PROVIDERS_BY_ID


def get_provider_ids() -> list[str]:
    """Get all provider_ids in the registry."""
    return list(PROVIDERS_BY_ID.keys())

from model_metadata_central._registry import PROVIDERS_BY_ID


def load_provider(provider_id: str) -> dict | None:
    """Load a provider definition by provider_id, or None if not found."""
    return PROVIDERS_BY_ID.get(provider_id)

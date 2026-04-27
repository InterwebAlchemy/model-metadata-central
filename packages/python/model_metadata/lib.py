from model_metadata.utils.exceptions import ModelMetadataNotFoundError
from model_metadata.utils.get_metadata_models import get_metadata_models
from model_metadata.utils.load_metadata import load_metadata


def get_model(model_id: str) -> dict:
    """
    Get metadata for a specific model by model_id.

    Raises:
        ModelMetadataNotFoundError: if no model with the given model_id exists.
    """
    return load_metadata(model_id)


def get_all_models() -> list[dict]:
    """
    Get all models from the registry.
    """
    models = get_metadata_models()
    return [load_metadata(m) for m in models]


def get_models_by_provider(provider_id: str) -> list[dict]:
    """
    Get all models available on a given provider.
    """
    return [
        m for m in get_all_models()
        if m.get("providers")
        and any(p.get("provider_id") == provider_id for p in m["providers"])
    ]


def get_model_on_provider(provider_id: str, provider_model_id: str | None = None) -> dict | None:
    """
    Find a model available on a specific provider.

    If provider_model_id is given, match both provider and the model's ID on that provider.
    Otherwise return the first model found on the provider.
    """
    for model in get_all_models():
        providers = model.get("providers") or []
        for p in providers:
            if p.get("provider_id") == provider_id:
                if provider_model_id is None:
                    return model
                if p.get("model_id_on_provider") == provider_model_id:
                    return model
    return None


def get_metadata() -> dict[str, dict]:
    """
    Get metadata for all models as a dict keyed by model_id.
    """
    return {m["model_id"]: m for m in get_all_models()}


def get_models() -> list[str]:
    """
    Get all model_ids. Deprecated: use get_all_models() for typed data.
    """
    return get_metadata_models()
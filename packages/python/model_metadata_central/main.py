from model_metadata_central.utils.get_models import get_models
from model_metadata_central.utils.load_metadata import load_metadata


def get_model_metadata(model_name: str) -> dict:
    """
    Get metadata for a specific model from central metadata store.
    """
    metadata = load_metadata(model_name)

    return metadata[model_name]


def get_models() -> [str]:
    """
    Get all models from central metadata store.
    """
    models = get_models()

    return models


def metadata() -> dict:
    """
    Get metadata for all models from central metadata store.
    """
    models = get_models()

    metadata = {}

    for model in models:
        metadata[model] = get_model_metadata(model)

    return metadata

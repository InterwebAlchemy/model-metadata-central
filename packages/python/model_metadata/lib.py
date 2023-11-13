from model_metadata.utils.get_metadata_models import get_metadata_models
from model_metadata.utils.load_metadata import load_metadata


def get_model_metadata(model_name: str) -> dict:
    """
    Get metadata for a specific model from central metadata store.
    """
    metadata = load_metadata(model_name)

    return metadata


def get_models() -> [str]:
    """
    Get all models from central metadata store.
    """
    models = get_metadata_models()

    return models


def get_metadata() -> dict:
    """
    Get metadata for all models from central metadata store.
    """
    models = get_models()

    metadata = dict()

    for model in models:
        metadata[f"{model}"] = get_model_metadata(model)

    return metadata

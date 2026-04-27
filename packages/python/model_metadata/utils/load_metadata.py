import os

import yaml

from model_metadata.utils.exceptions import ModelMetadataNotFoundError
from model_metadata.utils.get_metadata_directory import get_metadata_directory


def load_metadata(model_name: str) -> dict:
    """
    Load model metadata from yaml file.

    Raises:
        ModelMetadataNotFoundError: if no metadata file exists for the given model name.
    """
    path = os.path.join(get_metadata_directory(), f"{model_name}.yaml")

    if not os.path.exists(path):
        raise ModelMetadataNotFoundError(model_name)

    with open(path, "r") as f:
        return yaml.safe_load(f)

import os

import yaml

from model_metadata_central.utils.get_metadata_directory import get_metadata_directory


def load_metadata(model_name: str) -> dict:
    """
    Load model metadata from yaml file.
    """
    path = get_metadata_directory()

    path = os.path.join(get_metadata_directory(), f"{model_name}.yaml")

    metadata = {}

    with open(path, "r") as f:
        metadata = yaml.safe_load(f)

    return metadata

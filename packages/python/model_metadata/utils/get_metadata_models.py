import os
from pathlib import Path

from model_metadata.utils.get_metadata_directory import get_metadata_directory


def get_metadata_models() -> [str]:
    """
    Get all models from central metadata store.
    """
    metadata_directory = get_metadata_directory()

    model_names = [
        Path(model_name).stem
        for model_name in os.listdir(metadata_directory)
        if model_name.endswith(".yaml")
    ]

    return model_names

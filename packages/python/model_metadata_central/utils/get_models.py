import os

from model_metadata_central.utils.get_metadata_directory import get_metadata_directory


def get_models() -> [str]:
    """
    Get all models from central metadata store.
    """
    metadata_directory = get_metadata_directory()

    model_names = [
        model_name.split(".")[0]
        for model_name in os.listdir(metadata_directory)
        if model_name.endswith(".yaml")
    ]

    return model_names

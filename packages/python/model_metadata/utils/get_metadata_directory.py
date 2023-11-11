import os

import model_metadata_central

METADATA_DIRECTORY = "data"


def get_metadata_directory() -> str:
    """
    Get metadata directory.
    """
    module_path = os.path.dirname(model_metadata_central.__file__)

    return os.path.join(module_path, METADATA_DIRECTORY)

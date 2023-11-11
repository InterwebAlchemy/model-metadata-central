import os

import model_metadata

METADATA_DIRECTORY = "data"


def get_metadata_directory() -> str:
    """
    Get metadata directory.
    """
    module_path = os.path.dirname(model_metadata.__file__)

    return os.path.join(module_path, METADATA_DIRECTORY)

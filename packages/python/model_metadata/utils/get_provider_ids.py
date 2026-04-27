import os
from pathlib import Path

from model_metadata.utils.load_provider import get_providers_directory


def get_provider_ids() -> list[str]:
    """Get all provider_ids in the registry."""
    return [
        Path(f).stem
        for f in os.listdir(get_providers_directory())
        if f.endswith(".yaml")
    ]
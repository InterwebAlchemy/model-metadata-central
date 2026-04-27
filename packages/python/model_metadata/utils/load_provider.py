import os

import yaml
import model_metadata

PROVIDERS_DIR = "providers"


def get_providers_directory() -> str:
    """Get the absolute path to the providers directory."""
    return os.path.join(os.path.dirname(model_metadata.__file__), PROVIDERS_DIR)


def load_provider(provider_id: str) -> dict | None:
    """
    Load a provider definition by provider_id.

    Returns None if the provider file does not exist.
    """
    path = os.path.join(get_providers_directory(), f"{provider_id}.yaml")
    if not os.path.exists(path):
        return None
    with open(path, "r") as f:
        return yaml.safe_load(f)
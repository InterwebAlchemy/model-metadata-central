import os

from model_metadata_central.utils.get_metadata_directory import get_metadata_directory
from model_metadata_central.utils.get_models import get_models
from model_metadata_central.utils.load_metadata import load_metadata


def test_get_metadata_directory():
    assert get_metadata_directory() == os.path.join(
        os.getcwd(), "model_metadata_central", "data"
    )


def test_get_models():
    models = get_models()

    assert len(models) == len(os.listdir(get_metadata_directory()))


def test_load_metadata():
    metadata = load_metadata("gpt-3.5-turbo")

    assert (
        metadata["model_id"] == "gpt-3.5-turbo"
        and metadata["model_provider"] == "openai"
        and metadata["model_name"] == "GPT-3.5 Turbo"
        and metadata["model_type"] == "chat"
    )

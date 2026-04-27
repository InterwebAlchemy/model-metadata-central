import pytest

from model_metadata_central import get_all_models, get_all_providers
from model_metadata_central.generated.models import ModelMetadata, ProviderMetadata


def test_all_models_validate_against_schema():
    for model in get_all_models():
        ModelMetadata.model_validate(model)


def test_all_providers_validate_against_schema():
    for provider in get_all_providers():
        ProviderMetadata.model_validate(provider)


def test_invalid_model_rejected():
    with pytest.raises(Exception):
        ModelMetadata.model_validate({"model_id": "incomplete"})

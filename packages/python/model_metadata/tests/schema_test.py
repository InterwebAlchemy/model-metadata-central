import json

import pytest
from jsonschema import validate

from model_metadata.lib import get_model_metadata

schema = json.load(open("model_metadata/schema.json"))


def test_validate_schema():
    metadata = get_model_metadata("gpt-3.5-turbo")

    try:
        validate(metadata, schema=schema)
    except:
        pytest.fail("Validation failed.")

    assert True


def test_invalid_schema():
    metadata = {
        "model_id": "gpt-3.5-turbo",
    }

    with pytest.raises(Exception):
        validate(metadata, schema=schema)

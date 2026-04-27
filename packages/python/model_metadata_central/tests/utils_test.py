from model_metadata_central import (
    get_all_models,
    get_all_providers,
    get_model,
    get_models_by_provider,
    get_provider,
    get_provider_model_id,
)
from model_metadata_central.utils.get_metadata_models import get_metadata_models
from model_metadata_central.utils.get_provider_ids import get_provider_ids
from model_metadata_central.utils.load_metadata import load_metadata
from model_metadata_central.utils.load_provider import load_provider


def test_load_metadata_known():
    m = load_metadata("gpt-3.5-turbo")
    assert m is not None
    assert m["model_id"] == "gpt-3.5-turbo"
    assert m["model_type"] == "chat"


def test_load_metadata_unknown_returns_none():
    assert load_metadata("unknown-model") is None


def test_get_metadata_models_matches_registry():
    ids = get_metadata_models()
    assert len(ids) == len(get_all_models())
    assert "gpt-4o" in ids


def test_get_model_round_trips():
    m = get_model("gpt-4o")
    assert m is not None
    assert m["context_window"] == 128000


def test_get_models_by_provider_anthropic():
    anthropic_models = get_models_by_provider("anthropic")
    assert len(anthropic_models) > 0
    assert all(
        any(p["provider_id"] == "anthropic" for p in m.get("providers") or [])
        for m in anthropic_models
    )


def test_load_provider_known():
    p = load_provider("openai")
    assert p is not None
    assert p["provider_id"] == "openai"


def test_load_provider_unknown_returns_none():
    assert load_provider("nonexistent") is None


def test_get_provider_ids_matches_registry():
    pids = get_provider_ids()
    assert len(pids) == len(get_all_providers())
    assert "openai" in pids


def test_get_provider_model_id():
    assert get_provider_model_id("gpt-4o", "openai") == "gpt-4o"


def test_get_provider_model_id_unknown_model_returns_none():
    assert get_provider_model_id("does-not-exist", "openai") is None

"""Loader for the bundled JSON registries built by scripts/build_registry.py."""
import json
from pathlib import Path

_PKG_DIR = Path(__file__).resolve().parent


def _load(name: str) -> list[dict]:
    path = _PKG_DIR / name
    if not path.exists():
        raise RuntimeError(
            f"Bundled {name} is missing. Run "
            "`uv run python scripts/build_registry.py` to generate it."
        )
    return json.loads(path.read_text())


MODELS: list[dict] = _load("registry.json")
PROVIDERS: list[dict] = _load("providers.json")

MODELS_BY_ID: dict[str, dict] = {m["model_id"]: m for m in MODELS}
PROVIDERS_BY_ID: dict[str, dict] = {p["provider_id"]: p for p in PROVIDERS}

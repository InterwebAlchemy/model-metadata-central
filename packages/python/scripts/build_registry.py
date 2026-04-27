"""Bundle models/*.yaml + providers/*.yaml into registry.json + providers.json
inside the package, mirroring the TypeScript build-registry step.

Run via `uv run python scripts/build_registry.py`.
"""
import json
from pathlib import Path

import yaml

HERE = Path(__file__).resolve().parent
PKG_DIR = HERE.parent / "model_metadata_central"
REPO_ROOT = HERE.parent.parent.parent

MODELS_DIR = REPO_ROOT / "models"
PROVIDERS_DIR = REPO_ROOT / "providers"


def load_yaml_dir(directory: Path) -> list[dict]:
    return [
        yaml.safe_load(p.read_text())
        for p in sorted(directory.glob("*.yaml"))
    ]


def main() -> None:
    models = load_yaml_dir(MODELS_DIR)
    providers = load_yaml_dir(PROVIDERS_DIR)

    (PKG_DIR / "registry.json").write_text(json.dumps(models, indent=2) + "\n")
    (PKG_DIR / "providers.json").write_text(json.dumps(providers, indent=2) + "\n")

    print(f"Wrote {len(models)} models, {len(providers)} providers")


if __name__ == "__main__":
    main()

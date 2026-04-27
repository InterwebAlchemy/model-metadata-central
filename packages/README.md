# Language Packages

Pre-compiled registries and typed APIs for consuming model metadata in your project.

## TypeScript

```sh
npm install @interwebalchemy/model-metadata
```

[Read the README →](./typescript/README.md)

## Python

```sh
pip install model-metadata
```

[Read the README →](./python/README.md)

## Build

Both packages compile YAML sources to JSON registries during `prepare`/`prepublish`:

```sh
cd packages/typescript && npm install && npm run build
cd packages/python && poetry install && poetry run python -c "from model_metadata.utils.load_metadata import load_metadata; print(load_metadata('gpt-4o'))"
```

## Aligning APIs

The TypeScript and Python packages aim to share the same API surface:

| TypeScript | Python |
|---|---|
| `getModel(id)` | `get_model(id)` |
| `getAllModels()` | `get_all_models()` |
| `getModelsByProvider(id)` | `get_models_by_provider(id)` |
| `getModelOnProvider(id, providerModelId)` | `get_model_on_provider(id, provider_model_id)` |
| `getProvider(id)` | `get_provider(id)` |
| `getAllProviders()` | `get_all_providers()` |
| `getProviderModelId(modelId, providerId)` | `get_provider_model_id(model_id, provider_id)` |
| Named exports (`gpt4o`, etc.) | Module constants (`GPT_4_O`, etc.) |

Both packages use the same underlying JSON schema types, pre-compiled from the YAML definitions in the repo root.
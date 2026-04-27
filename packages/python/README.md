# model-metadata-central

Typed registry of LLM model metadata for Python — context windows, pricing, provider routing.

```sh
pip install model-metadata-central
```

## Usage

### Full registry

```python
from model_metadata_central import get_all_models, get_all_providers

models = get_all_models()
for model in models:
    print(f"{model['model_name']}: {model['context_window']} context")
```

### Look up a single model

```python
from model_metadata_central import get_model

model = get_model("gpt-4o")
if model:
    print(model["context_window"])          # 128000
    print(model["cost_per_token"])          # {"input": 0.000005, "output": 0.000015}
```

### Filter by provider

```python
from model_metadata_central import get_models_by_provider

anthropic = get_models_by_provider("anthropic")
openrouter = get_models_by_provider("openrouter")
```

### Provider routing

```python
from model_metadata_central import get_provider_model_id, get_provider

# Get the model ID for a specific provider
openai_id = get_provider_model_id("gpt-4o", "openai")           # "gpt-4o"
orouter_id = get_provider_model_id("gpt-4o", "openrouter")     # "openai/gpt-4o"

# Get provider config
provider = get_provider("openai")
print(provider["base_url"])    # "https://api.openai.com/v1"
print(provider["auth_type"])    # "api_key"
```

### Named model constants

```python
from model_metadata_central import GPT_4_O, CLAUDE_OPUS_4_7

# Fully typed dict — bundlers exclude the rest
print(GPT_4_O["context_window"])
```

## API

| Function | Returns | Description |
|---|---|---|
| `get_model(id)` | `dict \| None` | Lookup by model_id |
| `get_all_models()` | `list[dict]` | All models |
| `get_models_by_provider(provider_id)` | `list[dict]` | Filter by provider |
| `get_model_on_provider(provider_id, provider_model_id=None)` | `dict \| None` | Find model on a specific provider |
| `get_provider(id)` | `dict \| None` | Provider config |
| `get_all_providers()` | `list[dict]` | All providers |
| `get_provider_model_id(model_id, provider_id)` | `str \| None` | Provider-specific model ID |

## Data

- Registry pre-compiled from `models/*.yaml` at install/build time
- 74 models across 17 providers
- Prices are in USD per token

## Schema

Matches the JSON Schema definitions in the repo root.

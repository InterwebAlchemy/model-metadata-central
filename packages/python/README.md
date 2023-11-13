# Model Metadata

A centralized, language-agnostic, open-source approach to storing and sharing model definitions like context windows, cost per token, etc.

**Note**: You can read more about the motivation behind this initiative in [the Model Metadata Central project's README](https://github.com/InterwebAlchemy/model-metadata-central).

## Example Usage

### Get metadata for a specific model

```python
from model_metadata.lib import get_model_metadata

turbo_model = get_model_metadata("gpt-3.5-turbo")
```

### Working with metadata for all models

```python
from model_metadata.lib import get_metadata

max_tokens = {}

# Get the max_tokens for each model that has one defined
for model, model_metadata in get_metadata.items():
    if "max_tokens" in model_metadata:
        max_tokens[model] = model_metadata["max_tokens"]
```

### Get a list of available models

```python
from model_metadata.lib import get_models

models = get_models()
```
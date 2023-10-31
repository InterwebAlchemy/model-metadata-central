A centralized, open source approach to storing and sharing model definitions like context windows, cost per token, etc.

## Problem

Nearly every project that wants to incorporate multiple models needs to handle knowledge about the underlying model like context window length.

This leads to the proliferation of essentially the same code repeated across multiple codebases that all need to be updated when new models are released, token costs change, a model is deprecated, etc.

### Examples
- [LangChain `base/base_language/count_tokens.ts`](https://github.com/langchain-ai/langchainjs/blob/main/langchain/src/base_language/count_tokens.ts)
- [LiteLLM `model_prices_and_context_window.json`](https://github.com/BerriAI/litellm/blob/main/model_prices_and_context_window.json)
  - **Note**: This was my inspiration for this initiative
- [AutoGen `token_count_utils.py`](https://github.com/microsoft/autogen/blob/main/autogen/token_count_utils.py)
- [tokentrim model_map.py](https://github.com/KillianLucas/tokentrim/blob/main/tokentrim/model_map.py)
	- **Note**: [Open Interpreter](https://github.com/KillianLucas/open-interpreter/) relies on this
- [AI Research Assistant `sevices/openai/models`](https://github.com/InterwebAlchemy/obsidian-ai-research-assistant/tree/main/src/services/openai/models)
	- **Note**: This is one of my projects
- [Mentat `llm_api.py`](https://github.com/AbanteAI/mentat/blob/main/mentat/llm_api.py)
- [AutoGPT `autogpt/core/resource/model_providers/openai.py`](https://github.com/Significant-Gravitas/AutoGPT/blob/master/autogpts/autogpt/autogpt/core/resource/model_providers/openai.py)
- [AgentGPT `next/src/types/modelSettings.ts`](https://github.com/reworkd/AgentGPT/blob/main/next/src/types/modelSettings.ts)
- [MetaGPT `utils/token_counter.py`](https://github.com/geekan/MetaGPT/blob/main/metagpt/utils/token_counter.py)

Have more examples? [Create a Pull Request](https://github.com/InterwebAlchemy/llm-model-definitions/pulls).

## Proposal

Centralized ownership (by an open source foundation) of a tech stack agnostic utility that defines model information and allows developers to easily import and consume these definitions in their own codebases.

### JSON Schema

A [JSON Schema](https://json-schema.org/) definition can be found in [`model.schema.json`](./model.schema.json), and example model definitions can be found in the [`/models` directory](./models).

This schema defines properties that are relevant to the model and developers who wish to leverage it in their own codebases.

#### Required Properties

- `modelId`: The identifier of the model that the provider uses
  - **Example**: `gpt-3.5-turbo`
- `modelName`: The human-friendly name of the model
	- **Example**: `GPT-3.5 Turbo`
- `modelType`: The type of model (`chat` or `completion`)
	- **Example**: `chat`
- `contextWindow`: The maximum number of tokens in the model's context window
	- **Example**: `4096`

#### Optional Properties

- `modelProvider`: The provider of the model in lowercase
  - **Example**: `openai`
- `modelDescription`: A human-friendly description of the model
- `modelVersion`: The version of the model
  - **Example** `0613`
- `costPerToken`: The cost per token in USD
  - **Example**: ```json {
    "input": 0.0000015,
    "output": 0.000002
  }```
  - **Note**: supports either a basic number or an object with `input` and `output` numbers to define different costs between input tokens and output tokens
- `knowledgeCutoff`: The training data cutoff date for the model
  - **Note**: This is helpful when dealing with applications where you may need to know if you should supplement the model's training data with more recent information
- `tokenEncoding`: What encoding the model uses for tokens
  - **Example**: `cl100k_base`
  - **Note**: This is helpful when using `tiktoken`, `gpt-tokenizer`, etc. or needing to know if a model requires an [alternate approach to counting tokens](https://github.com/belladoreai/llama-tokenizer-js)
- `tuning`: The types of tuning that the model has been given in Array format; currently supports `function`, `instruction`, `code`, `multilingual`, and `multimodal`
  - **Example**: `["function", "instruction"]`
  - **Note**: This is helpful when deciding which models are suitable for given tasks

#### Example

Here is the example Model Definition for [OpenAI's GPT-3.5 Turbo model](https://platform.openai.com/docs/models/gpt-3-5):

```json
{
  "modelId": "gpt-3.5-turbo",
  "modelName": "GPT-3.5 Turbo",
  "modelProvider": "openai",
  "modelDescription": "Most capable GPT-3.5 model and optimized for chat at 1/10th the cost of text-davinci-003.",
  "modelInfo": "https://platform.openai.com/docs/models/gpt-3-5",
  "modelVersion": "latest",
  "modelType": "chat",
  "contextWindow": 4097,
  "costPerToken": {
    "input": 0.0000015,
    "output": 0.000002
  },
  "knowledgeCutoff": "2021-09-01",
  "tokenEncoding": "cl100k_base",
  "tuning": ["function", "instruction"]
}
```

## Roadmap

**Note**: This project is open to feedback at every stage of rhis roadmap.

- [x] Create JSON Schema
- [x] Generate example model definitions
- [x] Discuss schema with [AI Engineer Foundation](https://github.com/AI-Engineer-Foundation/)
- [ ] Rename to `model-metadata-central`
- [ ] Integrate a GitHub Action to validate metadata against schema
- [ ] Publish JSON Schema to GitHub Pages
- [ ] Integrate metadata for more models
- [ ] Add guidance for including metadata definitions via git submodule
- [ ] Generate language-specific packages for importing these definitions into other codebases
  - [ ] TypeScript
  - [ ] Python
  - [ ] Rust
  - [ ] Go
  - Other languages? Open an [issue](https://github.com/InterwebAlchemy/llm-model-definitions/issues) to request one!
- [ ] Integrate a GitHub Action to generate these packages
- [ ] Integrate a GitHub Action to publish these packages to NPM, PyPI, etc.
- [ ] Donate project to [AI Engineer Foundation](https://github.com/AI-Engineer-Foundation/)
- [ ] Update publishing actions to publish to the AI Engineer Foundation's NPM, PyPI, etc.
- [ ] Ongoing support, evangelism, and maintenance of the project
- [ ] **Hopeful**: Generate static GitHub Pages site that lists models, displays their metadata, and allows filtering by properties
- [ ] **Hopeful**: Get [projects](https://github.com/InterwebAlchemy/llm-model-definitions#examples) to adopt the language-specific packages and extend them as necessary instead of creating their own model definitions
- [ ] **Aspirational**: Get model providers to adopt the schema definition and update the repo when model metadata changes or new models are released

# Model Metadata Central

A centralized, language-agnostic, open-source approach to storing and sharing model definitions like context windows, cost per token, etc.

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

A [JSON Schema](https://json-schema.org/) definition can be found in [`model-metadata.schema.json`](./model-metadata.schema.json), and example Model Metadata definitions can be found in the [`/models` directory](./models).

This schema defines properties that are relevant to the model and developers who wish to leverage it in their own codebases.

#### Required Properties

- `model_id`: The identifier of the model that the provider uses
  - **Example**: `gpt-3.5-turbo`
- `model_name`: The human-friendly name of the model
	- **Example**: `GPT-3.5 Turbo`
- `model_type`: The type of model (`chat`, `completion`, or `embedding`)
	- **Example**: `chat`
- `context_window`: The maximum number of tokens in the model's context window
	- **Example**: `4096`

#### Optional Properties

- `model_provider`: The provider of the model in lowercase
  - **Example**: `openai`
- `model_description`: A human-friendly description of the model
- `model_version`: The version of the model
  - **Example** `0613`
- `cost_per_token`: The cost per token in USD
  - **Example**: ```json {
    "input": 0.0000015,
    "output": 0.000002
  }```
  - **Note**: supports either a basic number or an object with `input` and `output` numbers to define different costs between input tokens and output tokens
- `knowledge_cutoff`: The training data cutoff date for the model
  - **Note**: This is helpful when dealing with applications where you may need to know if you should supplement the model's training data with more recent information
- `token_encoding`: What encoding the model uses for tokens
  - **Example**: `cl100k_base`
  - **Note**: This is helpful when using `tiktoken`, `gpt-tokenizer`, etc. or needing to know if a model requires an [alternate approach to counting tokens](https://github.com/belladoreai/llama-tokenizer-js)
- `tuning`: The types of tuning that the model has been given in Array format; currently supports `function`, `instruction`, `code`, `multilingual`, and `multimodal`
  - **Example**: `["function", "instruction"]`
  - **Note**: This is helpful when deciding which models are suitable for given tasks
- `deprecated`: Whether the model has been deprecated by the provider
  - **Example**: `false`
  - **Note**: Deprecated models may still work but should be avoided for new integrations
- `providers`: Which providers serve this model and how to reference it on each
  - **Example**:
    ```yaml
    providers:
      - provider_id: openai
        model_id_on_provider: gpt-4o
      - provider_id: openrouter
        model_id_on_provider: openai/gpt-4o
    ```
  - **Note**: Allows a single model to be accessed via direct provider API or aggregator. Provider definitions live in `/providers`.

### Provider Schema

Provider definitions in [`providers/`](./providers) describe API endpoints and routing. See [`provider.schema.json`](./provider.schema.json).

#### Required Properties

- `provider_id`: Unique lowercase identifier matching the `providers/` filename and used in model `provider_reference`
- `name`: Human-readable name
- `api_type`: One of `openai_compatible`, `anthropic`, `openai`, `other`
- `routing_priority`: `direct` (serves models itself) or `aggregator` (routes to other providers) or `both`

#### Provider Routing

The `routing_priority` field differentiates direct providers (who serve models themselves) from aggregators (who route to other providers):

| `routing_priority` | Provider Examples |
|---|---|
| `direct` | OpenAI, Anthropic, DeepSeek, Groq, Mistral, Cloudflare |
| `aggregator` | OpenRouter |

Ollama, LM Studio, and LocalAI use `direct` but default to localhost with no auth — override `base_url` and `auth_type` in your app config when deploying.

Local providers default to localhost with no auth. Override `base_url` and `auth_type` in your app config when deploying.

```yaml
provider_id: openai
name: OpenAI
website_url: https://openai.com
api_type: openai_compatible
base_url: https://api.openai.com/v1
auth_type: api_key
routing_priority: direct
status: active
```

### Included Models

33 models across 8 providers:

**OpenAI** — gpt-3.5-turbo, gpt-4, gpt-4o, gpt-4o-mini, gpt-4.5, gpt-5.4-image-2, gpt-5.5, gpt-5.5-pro, o3, o4-mini

**Anthropic** — claude-haiku-4, claude-opus-latest, claude-opus-4.6-fast, claude-opus-4.7, claude-sonnet-4.2

**Google** — gemini-2.0-flash, gemini-2.5-flash, gemini-2.5-pro, gemma-4-26b, gemma-4-31b

**DeepSeek** — deepseek-coder-v4, deepseek-v4-flash, deepseek-v4-pro

**xAI** — grok-4.2, grok-4.2-multi-agent

**Moonshot AI** — kimi-k2.6, kimi-v3

**Qwen** — qwen3.6-flash, qwen3.6-plus

**Other** — mistral-7b-instruct

Full definitions live in [`/models`](./models).

## Roadmap

**Note**: This project is open to feedback at every stage of this roadmap.

- [x] Create JSON Schema
- [x] Generate example model definitions
- [x] Discuss schema with [AI Engineer Foundation](https://github.com/AI-Engineer-Foundation/)
- [x] Rename to `model-metadata-central`
- [ ] Integrate a GitHub Action to validate Model Metadata definitions against schema
- [ ] Publish JSON Schema to GitHub Pages
- [ ] Add guidance for including metadata definitions via git submodule
- [ ] Generate language-specific packages for importing these definitions into other codebases
  - [ ] TypeScript
  - [x] Python
  - [ ] Rust
  - [ ] Go
  - Other languages? Open an [issue](https://github.com/InterwebAlchemy/llm-model-definitions/issues) to request one!
- [x] Integrate metadata for more models
- [ ] Integrate metadata for more providers (Groq, Cloudflare, Mistral, local runtimes)
- [ ] Integrate a GitHub Action to publish these packages to NPM, PyPI, etc.
- [ ] Donate project to [AI Engineer Foundation](https://github.com/AI-Engineer-Foundation/)
- [ ] Update publishing actions to publish to the AI Engineer Foundation's NPM, PyPI, etc.
- [ ] Ongoing support, evangelism, and maintenance of the project
- [ ] **Hopeful**: Generate static GitHub Pages site that lists models, displays their metadata, and allows filtering by properties
- [ ] **Hopeful**: Get [projects](https://github.com/InterwebAlchemy/llm-model-definitions#examples) to adopt the language-specific packages and extend them as necessary instead of creating their own model definitions
- [ ] **Aspirational**: Get model providers to adopt the schema definition and update the repo when model metadata changes or new models are released

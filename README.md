A centralized, open source approach to storing and sharing model definitions like context windows, cost per token, etc.

## Problem

Nearly every project that wants to incorporate multiple models needs to handle knowledge about the underlying model like context window length.

This leads to the proliferation of essentially the same code repeated across multiple codebases that all need to be updated when new models are released, token costs change, a model is deprecated, etc.

## Proposal

Centralized ownership (by an open source foundation) of a tech stack agnostic utility that defines model information and allows developers to easily import and consume these definitions in their own codebases.

## Examples

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

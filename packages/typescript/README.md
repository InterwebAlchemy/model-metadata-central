# @interwebalchemy/model-metadata

Typed registry of LLM model metadata — context windows, pricing, provider routing — for TypeScript/Node.js projects.

## Install

```sh
npm install @interwebalchemy/model-metadata
```

## Usage

### Full registry

```ts
import { getAllModels, getAllProviders } from "@interwebalchemy/model-metadata";

// Populate a model selector dropdown
const models = getAllModels();
const modelOptions = models.map(m => ({
  value: m.model_id,
  label: m.model_name,
  contextWindow: m.context_window,
  pricePerMillion: m.cost_per_token,
}));
```

### Look up a single model

```ts
import { getModel } from "@interwebalchemy/model-metadata";

const model = getModel("gpt-4o");
if (model) {
  console.log(model.context_window);   // 128000
  console.log(model.cost_per_token);   // { input: 0.000005, output: 0.000015 }
}
```

### Filter by provider

```ts
import { getModelsByProvider } from "@interwebalchemy/model-metadata";

const anthropicModels = getModelsByProvider("anthropic");
const openrouterModels = getModelsByProvider("openrouter");
```

### Provider routing

```ts
import { getProviderModelId, getProvider } from "@interwebalchemy/model-metadata";

// Get the model ID for a specific provider
const openaiId = getProviderModelId("gpt-4o", "openai");        // "gpt-4o"
const openrouterId = getProviderModelId("gpt-4o", "openrouter"); // "openai/gpt-4o"

// Get provider config (base URL, auth type, etc.)
const provider = getProvider("openai");
console.log(provider.base_url);     // "https://api.openai.com/v1"
console.log(provider.auth_type);    // "api_key"
```

### Tree-shakeable named exports

Import only the models you need — bundlers will exclude the rest.

```ts
import { gpt4o, claudeOpus47 } from "@interwebalchemy/model-metadata";

// gpt4o and claudeOpus47 are fully typed ModelMetadata objects
// The full registry + helpers are excluded from the bundle
```

### TypeScript types

All types are exported for your own data structures:

```ts
import type { ModelMetadata, ProviderMetadata, CostPerToken } from "@interwebalchemy/model-metadata";

function logCost(model: ModelMetadata) {
  if (model.cost_per_token) {
    const cost = model.cost_per_token as CostPerToken;
    console.log(`$${cost.input * 1_000_000} per 1M input tokens`);
  }
}
```

## API

| Function | Returns | Description |
|---|---|---|
| `getModel(id)` | `ModelMetadata \| undefined` | Lookup by model_id |
| `getAllModels()` | `readonly ModelMetadata[]` | All models |
| `getModelsByProvider(providerId)` | `readonly ModelMetadata[]` | Filter by provider |
| `getModelOnProvider(providerId, providerModelId?)` | `ModelMetadata \| undefined` | Find model on a specific provider |
| `getProvider(id)` | `ProviderMetadata \| undefined` | Provider config |
| `getAllProviders()` | `readonly ProviderMetadata[]` | All providers |
| `getProviderModelId(modelId, providerId)` | `string \| undefined` | Provider-specific model ID |

## Data

- Registry compiled from `/models/*.yaml` and `/providers/*.yaml` at build time
- 33 models across 14 providers
- Prices are in USD per token

## Schema

Matches [`model-metadata.schema.json`](../../model-metadata.schema.json) and [`provider.schema.json`](../../provider.schema.json).
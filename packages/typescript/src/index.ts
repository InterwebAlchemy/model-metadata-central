import type { ModelMetadata, ProviderMetadata, ProviderReference } from "./types.js";
import registryJson from "./registry.json" with { type: "json" };
import providersJson from "./providers.json" with { type: "json" };

/** All models as a typed array — registry is lazy-indexed so helpers don't inflate bundles */
const registry = registryJson as unknown as ModelMetadata[];
const providers = providersJson as unknown as ProviderMetadata[];

// Index built only when needed — avoids forcing any helper code into a
// bundle that only imports specific model objects directly.
let index: Map<string, ModelMetadata> | null = null;
let providerIndex: Map<string, ProviderMetadata> | null = null;

function getIndex(): Map<string, ModelMetadata> {
  if (!index) {
    index = new Map(registry.map((m) => [m.model_id, m]));
  }
  return index;
}

function getProviderIndex(): Map<string, ProviderMetadata> {
  if (!providerIndex) {
    providerIndex = new Map(providers.map((p) => [p.provider_id, p]));
  }
  return providerIndex;
}

// --- Public API ---

/** Look up a model by its model_id. Returns undefined if not found. */
export function getModel(modelId: string): ModelMetadata | undefined {
  return getIndex().get(modelId);
}

/** Return all models. */
export function getAllModels(): readonly ModelMetadata[] {
  return registry;
}

/** Filter models by provider. provider_id matches providers/ directory filenames. */
export function getModelsByProvider(providerId: string): readonly ModelMetadata[] {
  return registry.filter((m) =>
    m.providers?.some((p) => p.provider_id === providerId),
  );
}

/** Return all models available on a specific model_id as served by a provider. */
export function getModelOnProvider(
  providerId: string,
  providerModelId?: string,
): ModelMetadata | undefined {
  return registry.find((m) =>
    m.providers?.some(
      (p) =>
        p.provider_id === providerId &&
        (providerModelId
          ? p.model_id_on_provider === providerModelId
          : true),
    ),
  );
}

/** Get a provider definition by provider_id. */
export function getProvider(
  providerId: string,
): ProviderMetadata | undefined {
  return getProviderIndex().get(providerId);
}

/** Return all providers. */
export function getAllProviders(): readonly ProviderMetadata[] {
  return providers;
}

/** Map provider_id -> model_id_on_provider for a given model on a given provider. */
export function getProviderModelId(
  modelId: string,
  providerId: string,
): string | undefined {
  return getModel(modelId)
    ?.providers?.find((p) => p.provider_id === providerId)
    ?.model_id_on_provider;
}

// --- Named re-exports for tree-shaking ---
// Individual model objects — bundlers can dead-code-eliminate unused ones.
// Usage: import { gpt4o } from 'model-metadata';
export const gpt4o = getModel("gpt-4o");
export const gpt4oMini = getModel("gpt-4o-mini");
export const gpt45 = getModel("gpt-4.5");
export const gpt545 = getModel("gpt-5.5");
export const gpt55Pro = getModel("gpt-5.5-pro");
export const gpt35Turbo = getModel("gpt-3.5-turbo");
export const gpt4 = getModel("gpt-4");
export const o3 = getModel("o3");
export const o4Mini = getModel("o4-mini");
export const gpt542Image2 = getModel("gpt-5.4-image-2");

export const claudeOpus47 = getModel("claude-opus-4.7");
export const claudeOpus46Fast = getModel("claude-opus-4.6-fast");
export const claudeSonnet42 = getModel("claude-sonnet-4.2");
export const claudeOpusLatest = getModel("claude-opus-latest");
export const claudeHaiku4 = getModel("claude-haiku-4");

export const gemini25Pro = getModel("gemini-2.5-pro");
export const gemini25Flash = getModel("gemini-2.5-flash");
export const gemini20Flash = getModel("gemini-2.0-flash");
export const gemma431bIt = getModel("gemma-4-31b-it");
export const gemma426bA4bIt = getModel("gemma-4-26b-a4b-it");

export const deepseekV4Pro = getModel("deepseek-v4-pro");
export const deepseekV4Flash = getModel("deepseek-v4-flash");
export const deepseekCoderV4 = getModel("deepseek-coder-v4");

export const grok42 = getModel("grok-4.2");
export const grok42MultiAgent = getModel("grok-4.2-multi-agent");

export const kimiK26 = getModel("kimi-k2.6");
export const kimiV3 = getModel("kimi-v3");

export const qwen36Plus = getModel("qwen3.6-plus");
export const qwen36Flash = getModel("qwen3.6-flash");

export const mistral7bInstruct = getModel("mistral-7b-instruct");

// Re-export types
export type {
  ModelMetadata,
  ProviderMetadata,
  ProviderReference,
  ModelType,
  Tuning,
  TokenEncoding,
  ApiType,
  AuthType,
  RoutingPriority,
  ProviderStatus,
  CostPerToken,
} from "./types.js";
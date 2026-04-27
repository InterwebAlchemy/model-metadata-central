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
// Kept in sync with models/*.yaml. Usage: import { gpt4o } from 'model-metadata-central';
export const claudeHaiku4 = getModel("claude-haiku-4");
export const claudeHaiku45 = getModel("claude-haiku-4-5");
export const claudeOpus46 = getModel("claude-opus-4-6");
export const claudeOpus46Fast = getModel("claude-opus-4-6-fast");
export const claudeOpus47 = getModel("claude-opus-4-7");
export const claudeOpusLatest = getModel("claude-opus-latest");
export const claudeSonnet42 = getModel("claude-sonnet-4-2");
export const claudeSonnet46 = getModel("claude-sonnet-4-6");
export const codestralLatest = getModel("codestral-latest");
export const deepseekCoderV4 = getModel("deepseek-coder-v4");
export const deepseekR1DistillLlama70b = getModel("deepseek-r1-distill-llama-70b");
export const deepseekV4Flash = getModel("deepseek-v4-flash");
export const deepseekV4Pro = getModel("deepseek-v4-pro");
export const gemini20Flash = getModel("gemini-2.0-flash");
export const gemini25Flash = getModel("gemini-2.5-flash");
export const gemini25Pro = getModel("gemini-2.5-pro");
export const gemma426bA4bIt = getModel("gemma-4-26b-a4b-it");
export const gemma431bIt = getModel("gemma-4-31b-it");
export const glm47 = getModel("glm-4.7");
export const glm47Flash = getModel("glm-4.7-flash");
export const glm5 = getModel("glm-5");
export const glm5Turbo = getModel("glm-5-turbo");
export const glm51 = getModel("glm-5.1");
export const glm5vTurbo = getModel("glm-5v-turbo");
export const gpt35Turbo = getModel("gpt-3.5-turbo");
export const gpt35Turbo16k = getModel("gpt-3.5-turbo-16k");
export const gpt35TurboInstruct = getModel("gpt-3.5-turbo-instruct");
export const gpt4 = getModel("gpt-4");
export const gpt432k = getModel("gpt-4-32k");
export const gpt4Turbo = getModel("gpt-4-turbo");
export const gpt41 = getModel("gpt-4.1");
export const gpt41Mini = getModel("gpt-4.1-mini");
export const gpt41Nano = getModel("gpt-4.1-nano");
export const gpt45 = getModel("gpt-4.5");
export const gpt4o = getModel("gpt-4o");
export const gpt4oMini = getModel("gpt-4o-mini");
export const gpt5 = getModel("gpt-5");
export const gpt5Mini = getModel("gpt-5-mini");
export const gpt5Nano = getModel("gpt-5-nano");
export const gpt53Codex = getModel("gpt-5.3-codex");
export const gpt54 = getModel("gpt-5.4");
export const gpt54Image2 = getModel("gpt-5.4-image-2");
export const gpt54Mini = getModel("gpt-5.4-mini");
export const gpt54Nano = getModel("gpt-5.4-nano");
export const gpt54Pro = getModel("gpt-5.4-pro");
export const gpt55 = getModel("gpt-5.5");
export const gpt55Pro = getModel("gpt-5.5-pro");
export const grok42 = getModel("grok-4.2");
export const grok42MultiAgent = getModel("grok-4.2-multi-agent");
export const kimiK26 = getModel("kimi-k2.6");
export const kimiV3 = getModel("kimi-v3");
export const llama318bInstant = getModel("llama-3.1-8b-instant");
export const llama3370bVersatile = getModel("llama-3.3-70b-versatile");
export const minimaxM2 = getModel("minimax-m2");
export const minimaxM21 = getModel("minimax-m2.1");
export const minimaxM21Highspeed = getModel("minimax-m2.1-highspeed");
export const minimaxM25 = getModel("minimax-m2.5");
export const minimaxM25Highspeed = getModel("minimax-m2.5-highspeed");
export const minimaxM27 = getModel("minimax-m2.7");
export const minimaxM27Highspeed = getModel("minimax-m2.7-highspeed");
export const mistral7b = getModel("mistral-7b");
export const mistral7bInstruct = getModel("mistral-7b-instruct");
export const mistralLarge2411 = getModel("mistral-large-2411");
export const mistralLarge2512 = getModel("mistral-large-2512");
export const mistralLargeLatest = getModel("mistral-large-latest");
export const mistralMediumLatest = getModel("mistral-medium-latest");
export const mistralNemo = getModel("mistral-nemo");
export const mistralSmallLatest = getModel("mistral-small-latest");
export const nemotron3Super120bA12b = getModel("nemotron-3-super-120b-a12b");
export const o3 = getModel("o3");
export const o4Mini = getModel("o4-mini");
export const qwen332b = getModel("qwen3-32b");
export const qwen36Flash = getModel("qwen3.6-flash");
export const qwen36Plus = getModel("qwen3.6-plus");

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
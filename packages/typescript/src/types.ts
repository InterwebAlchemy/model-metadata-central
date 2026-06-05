/**
 * TypeScript types matching model-metadata.schema.json and provider.schema.json
 */

export type ModelType = "chat" | "completion" | "embedding";

export type Tuning =
  | "function"
  | "instruction"
  | "code"
  | "multilingual"
  | "multimodal"
  | "structured"
  | "reasoning";

export type Modality = "text" | "image" | "audio" | "video" | "other";

export type TokenEncoding =
  | "cl100k_base"
  | "p50k_base"
  | "p50k_edit"
  | "r50k_base"
  | "llama"
  | "unknown";

export type ApiType = "openai_compatible" | "anthropic" | "openai" | "other";

export type AuthType = "api_key" | "bearer" | "oauth" | "managed";

export type RoutingPriority = "direct" | "aggregator" | "both";

export type ProviderStatus = "active" | "deprecated" | "inactive";

export interface ProviderReference {
  provider_id: string;
  model_id_on_provider?: string;
  model_info?: string;
  cost_per_million_tokens?: TokenCosts;
}

export type TokenCostValue = number | Partial<Record<Modality, number>>;

export interface TokenCosts {
  input?: TokenCostValue;
  cached_input?: TokenCostValue;
  cache_write_input?: TokenCostValue;
  output?: TokenCostValue;
}

export interface ModelMetadata {
  model_id: string;
  model_name?: string;
  model_provider?: string;
  model_description?: string;
  model_info?: string;
  model_version?: string;
  model_type: ModelType;
  context_window: number;
  max_tokens?: number;
  cost_per_million_tokens?: TokenCosts;
  knowledge_cutoff?: string;
  tokenizer?: {
    family: "tiktoken" | "tekken" | "sentencepiece" | "huggingface" | "other" | "unknown";
    name?: string;
  };
  tuning?: Tuning[];
  input_type?: Modality[];
  output_type?: Modality[];
  deprecated?: boolean;
  meta_model?: boolean;
  providers?: ProviderReference[];
}

export interface ProviderMetadata {
  provider_id: string;
  name: string;
  website_url?: string;
  api_type: ApiType;
  base_url?: string;
  auth_type?: AuthType;
  routing_priority: RoutingPriority;
  status?: ProviderStatus;
  notes?: string;
}

export class ModelNotFoundError extends Error {
  constructor(readonly modelId: string) {
    super(`No metadata found for model: ${modelId}`);
    this.name = "ModelNotFoundError";
  }
}

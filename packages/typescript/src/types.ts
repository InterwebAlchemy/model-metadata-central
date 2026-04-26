/**
 * TypeScript types matching model-metadata.schema.json and provider.schema.json
 */

export type ModelType = "chat" | "completion" | "embedding";

export type Tuning = "function" | "instruction" | "code" | "multilingual" | "multimodal";

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
}

export interface CostPerToken {
  input: number;
  output: number;
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
  cost_per_token?: CostPerToken | number;
  knowledge_cutoff?: string;
  token_encoding?: TokenEncoding;
  tuning?: Tuning[];
  deprecated?: boolean;
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
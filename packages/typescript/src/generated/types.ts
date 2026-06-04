/** Generated from JSON Schema — do not edit manually */

// --- Enums ---
export type ModelType = 'chat' | 'completion' | 'embedding';
export type Tuning = 'function' | 'instruction' | 'code' | 'multilingual' | 'multimodal' | 'structured' | 'reasoning';
export type InputType = 'text' | 'image' | 'audio' | 'video' | 'other';
export type OutputType = 'text' | 'image' | 'audio' | 'video' | 'other';
export type ApiType = 'openai_compatible' | 'anthropic' | 'openai' | 'other';
export type AuthType = 'api_key' | 'bearer' | 'oauth' | 'managed' | 'none';
export type RoutingPriority = 'direct' | 'aggregator' | 'both';
export type Status = 'active' | 'deprecated' | 'inactive';
export type Family = 'tiktoken' | 'tekken' | 'sentencepiece' | 'huggingface' | 'other' | 'unknown';

// --- $defs ---
export interface ProviderReference {
  provider_id: string;
  model_id_on_provider?: string;
  model_info?: string;
  cost_per_million_tokens?: TokenCosts;
}

export interface TokenCosts {
  input?: TokenCostValue;
  cached_input?: TokenCostValue;
  cache_write_input?: TokenCostValue;
  output?: TokenCostValue;
}

export type TokenCostValue = number | ModalityCosts;

export interface ModalityCosts {
  text?: number;
  image?: number;
  audio?: number;
  video?: number;
  other?: number;
}

export interface TokenizerConfig {
  family: Family;
  name?: string;
}

// --- Schema types ---
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
  tokenizer?: TokenizerConfig;
  tuning?: Tuning[];
  input_type?: InputType[];
  output_type?: OutputType[];
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
  status?: Status;
  notes?: string;
}

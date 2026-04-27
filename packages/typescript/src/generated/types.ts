/** Generated from JSON Schema — do not edit manually */

// --- Enums ---
export type Model_type = 'chat' | 'completion' | 'embedding';
export type Api_type = 'openai_compatible' | 'anthropic' | 'openai' | 'other';
export type Auth_type = 'api_key' | 'bearer' | 'oauth' | 'managed' | 'none';
export type Routing_priority = 'direct' | 'aggregator' | 'both';
export type Status = 'active' | 'deprecated' | 'inactive';
export type Family = 'tiktoken' | 'tekken' | 'sentencepiece' | 'huggingface' | 'other' | 'unknown';

// --- $defs ---
export interface Provider_reference {
  provider_id: string;
  model_id_on_provider?: string;
}

export interface Tokenizer_config {
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
  model_type: Model_type;
  context_window: number;
  max_tokens?: number;
  cost_per_token?: unknown;
  knowledge_cutoff?: string;
  tokenizer?: Tokenizer_config;
  tuning?: unknown[];
  deprecated?: boolean;
  providers?: unknown[];
}

export interface ProviderMetadata {
  provider_id: string;
  name: string;
  website_url?: string;
  api_type: Api_type;
  base_url?: string;
  auth_type?: Auth_type;
  routing_priority: Routing_priority;
  status?: Status;
  notes?: string;
}

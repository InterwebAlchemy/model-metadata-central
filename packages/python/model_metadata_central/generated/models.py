# Generated from JSON Schema — do not edit manually

from __future__ import annotations

from typing import Any, Literal
from pydantic import BaseModel, Field

class Provider_reference(BaseModel):
    provider_id: str
    model_id_on_provider: str | None = None

class Tokenizer_config(BaseModel):
    family: Literal['tiktoken', 'tekken', 'sentencepiece', 'huggingface', 'other', 'unknown']
    name: str | None = None

class ModelMetadata(BaseModel):
    """Generated from model-metadata.schema.json"""
    model_id: str
    model_name: str | None = None
    model_provider: str | None = None
    model_description: str | None = None
    model_info: str | None = None
    model_version: str | None = None
    model_type: Literal['chat', 'completion', 'embedding']
    context_window: float
    max_tokens: float | None = None
    cost_per_token: Any | None = None
    knowledge_cutoff: str | None = None
    tokenizer: Tokenizer_config | None = None
    tuning: list | None = None
    deprecated: bool | None = None
    providers: list | None = None

class ProviderMetadata(BaseModel):
    """Generated from provider.schema.json"""
    provider_id: str
    name: str
    website_url: str | None = None
    api_type: Literal['openai_compatible', 'anthropic', 'openai', 'other']
    base_url: str | None = None
    auth_type: Literal['api_key', 'bearer', 'oauth', 'managed', 'none'] | None = None
    routing_priority: Literal['direct', 'aggregator', 'both']
    status: Literal['active', 'deprecated', 'inactive'] | None = None
    notes: str | None = None

from model_metadata.lib import (
    get_all_models,
    get_metadata,
    get_model,
    get_model_on_provider,
    get_models,
    get_models_by_provider,
)
from model_metadata.utils.exceptions import ModelMetadataNotFoundError

__all__ = [
    "get_model",
    "get_all_models",
    "get_models",
    "get_models_by_provider",
    "get_model_on_provider",
    "get_metadata",
    "get_provider",
    "get_all_providers",
    "get_provider_model_id",
    "ModelMetadataNotFoundError",
    # Named model constants
    "GPT_4_O",
    "GPT_4_O_MINI",
    "GPT_4_5",
    "GPT_5_5",
    "GPT_5_5_PRO",
    "GPT_3_5_TURBO",
    "GPT_4",
    "O3",
    "O4_MINI",
    "GPT_5_4_IMAGE_2",
    "CLAUDE_OPUS_4_7",
    "CLAUDE_OPUS_4_6_FAST",
    "CLAUDE_SONNET_4_2",
    "CLAUDE_OPUS_LATEST",
    "CLAUDE_HAIKU_4",
    "GEMINI_2_5_PRO",
    "GEMINI_2_5_FLASH",
    "GEMINI_2_0_FLASH",
    "GEMMA_4_31B_IT",
    "GEMMA_4_26B_A4B_IT",
    "DEEPSEEK_V4_PRO",
    "DEEPSEEK_V4_FLASH",
    "DEEPSEEK_CODER_V4",
    "GROK_4_2",
    "GROK_4_2_MULTI_AGENT",
    "KIMI_K2_6",
    "KIMI_V3",
    "QWEN_3_6_PLUS",
    "QWEN_3_6_FLASH",
    "MISTRAL_7B_INSTRUCT",
]

# Named model constants — import only what you need
GPT_4_O = get_model("gpt-4o")
GPT_4_O_MINI = get_model("gpt-4o-mini")
GPT_4_5 = get_model("gpt-4.5")
GPT_5_5 = get_model("gpt-5.5")
GPT_5_5_PRO = get_model("gpt-5.5-pro")
GPT_3_5_TURBO = get_model("gpt-3.5-turbo")
GPT_4 = get_model("gpt-4")
O3 = get_model("o3")
O4_MINI = get_model("o4-mini")
GPT_5_4_IMAGE_2 = get_model("gpt-5.4-image-2")
CLAUDE_OPUS_4_7 = get_model("claude-opus-4.7")
CLAUDE_OPUS_4_6_FAST = get_model("claude-opus-4.6-fast")
CLAUDE_SONNET_4_2 = get_model("claude-sonnet-4.2")
CLAUDE_OPUS_LATEST = get_model("claude-opus-latest")
CLAUDE_HAIKU_4 = get_model("claude-haiku-4")
GEMINI_2_5_PRO = get_model("gemini-2.5-pro")
GEMINI_2_5_FLASH = get_model("gemini-2.5-flash")
GEMINI_2_0_FLASH = get_model("gemini-2.0-flash")
GEMMA_4_31B_IT = get_model("gemma-4-31b-it")
GEMMA_4_26B_A4B_IT = get_model("gemma-4-26b-a4b-it")
DEEPSEEK_V4_PRO = get_model("deepseek-v4-pro")
DEEPSEEK_V4_FLASH = get_model("deepseek-v4-flash")
DEEPSEEK_CODER_V4 = get_model("deepseek-coder-v4")
GROK_4_2 = get_model("grok-4.2")
GROK_4_2_MULTI_AGENT = get_model("grok-4.2-multi-agent")
KIMI_K2_6 = get_model("kimi-k2.6")
KIMI_V3 = get_model("kimi-v3")
QWEN_3_6_PLUS = get_model("qwen3.6-plus")
QWEN_3_6_FLASH = get_model("qwen3.6-flash")
MISTRAL_7B_INSTRUCT = get_model("mistral-7b-instruct")

# Provider helpers
def get_provider(provider_id: str) -> dict:
    """Get provider configuration by provider_id."""
    from model_metadata.utils.load_provider import load_provider
    return load_provider(provider_id)


def get_all_providers() -> list[dict]:
    """Get all providers."""
    from model_metadata.utils.get_provider import get_provider_ids
    return [get_provider(pid) for pid in get_provider_ids()]


def get_provider_model_id(model_id: str, provider_id: str) -> str | None:
    """Get the model_id as used by a specific provider."""
    model = get_model(model_id)
    for p in model.get("providers") or []:
        if p.get("provider_id") == provider_id:
            return p.get("model_id_on_provider")
    return None
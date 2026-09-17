from model_metadata_central.lib import (
    get_all_models,
    get_metadata,
    get_model,
    get_model_on_provider,
    get_models,
    get_models_by_provider,
)
from model_metadata_central.utils.exceptions import ModelMetadataNotFoundError

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
    # Named model constants — kept in sync with models/*.yaml
    "GPT_6_ASTRA",
    "GPT_5_6_SOL",
    "GPT_5_6_TERRA",
    "GPT_5_6_LUNA",
    "GPT_4_O",
    "GPT_4_O_MINI",
    "GPT_4_5",
    "GPT_5_5",
    "GPT_5_5_PRO",
    "GPT_5_4_IMAGE_2",
    "GPT_3_5_TURBO",
    "GPT_3_5_TURBO_INSTRUCT",
    "GPT_4",
    "GPT_4_32K",
    "O3",
    "O4_MINI",
    "CLAUDE_FABLE_5_1",
    "CLAUDE_FABLE_5",
    "CLAUDE_OPUS_5",
    "CLAUDE_SONNET_5",
    "CLAUDE_OPUS_4_8",
    "CLAUDE_OPUS_4_7",
    "CLAUDE_OPUS_4_6_FAST",
    "CLAUDE_OPUS_LATEST",
    "GEMINI_3_8_FLASH",
    "GEMINI_3_7_FLASH",
    "GEMINI_3_5_FLASH_LITE",
    "GEMINI_2_5_PRO",
    "GEMINI_2_5_FLASH",
    "GEMINI_2_0_FLASH",
    "GEMMA_4_31B_IT",
    "GEMMA_4_26B_A4B_IT",
    "DEEPSEEK_V4_1_FLASH",
    "DEEPSEEK_V4_PRO_0813",
    "DEEPSEEK_V4_PRO",
    "DEEPSEEK_V4_FLASH",
    "GROK_4_6",
    "GROK_4_5",
    "GROK_4_3",
    "GROK_4_20",
    "GROK_4_20_MULTI_AGENT",
    "KIMI_K3",
    "KIMI_K2_6",
    "CLAUDINIO_ESSENTIAL",
    "MINIMAX_M3",
    "QWEN_3_8_MAX",
    "QWEN_3_8_FLASH",
    "QWEN_3_8_27B",
    "QWEN_3_8_2_4T_A95B",
    "QWEN_3_7_PLUS",
    "QWEN_3_6_PLUS",
    "QWEN_3_6_FLASH",
    "MISTRAL_MEDIUM_3_5",
    "GLM_5_3",
    "GLM_5_3_FLASH",
    "GLM_5_2",
    "NEMOTRON_3_5_LIGHTNING",
    "NEMOTRON_3_ULTRA_550B_A55B",
    "MISTRAL_7B",
    "MISTRAL_7B_INSTRUCT",
]

# Named model constants — import only what you need
GPT_6_ASTRA = get_model("gpt-6-astra")
GPT_5_6_SOL = get_model("gpt-5.6-sol")
GPT_5_6_TERRA = get_model("gpt-5.6-terra")
GPT_5_6_LUNA = get_model("gpt-5.6-luna")
GPT_4_O = get_model("gpt-4o")
GPT_4_O_MINI = get_model("gpt-4o-mini")
GPT_4_5 = get_model("gpt-4.5")
GPT_5_5 = get_model("gpt-5.5")
GPT_5_5_PRO = get_model("gpt-5.5-pro")
GPT_5_4_IMAGE_2 = get_model("gpt-5.4-image-2")
GPT_3_5_TURBO = get_model("gpt-3.5-turbo")
GPT_3_5_TURBO_INSTRUCT = get_model("gpt-3.5-turbo-instruct")
GPT_4 = get_model("gpt-4")
GPT_4_32K = get_model("gpt-4-32k")
O3 = get_model("o3")
O4_MINI = get_model("o4-mini")
CLAUDE_FABLE_5_1 = get_model("claude-fable-5-1")
CLAUDE_FABLE_5 = get_model("claude-fable-5")
CLAUDE_OPUS_5 = get_model("claude-opus-5")
CLAUDE_SONNET_5 = get_model("claude-sonnet-5")
CLAUDE_OPUS_4_8 = get_model("claude-opus-4-8")
CLAUDE_OPUS_4_7 = get_model("claude-opus-4-7")
CLAUDE_OPUS_4_6_FAST = get_model("claude-opus-4-6-fast")
CLAUDE_OPUS_LATEST = get_model("claude-opus-latest")
GEMINI_3_8_FLASH = get_model("gemini-3.8-flash")
GEMINI_3_7_FLASH = get_model("gemini-3.7-flash")
GEMINI_3_5_FLASH_LITE = get_model("gemini-3.5-flash-lite")
GEMINI_2_5_PRO = get_model("gemini-2.5-pro")
GEMINI_2_5_FLASH = get_model("gemini-2.5-flash")
GEMINI_2_0_FLASH = get_model("gemini-2.0-flash")
GEMMA_4_31B_IT = get_model("gemma-4-31b-it")
GEMMA_4_26B_A4B_IT = get_model("gemma-4-26b-a4b-it")
DEEPSEEK_V4_1_FLASH = get_model("deepseek-v4.1-flash")
DEEPSEEK_V4_PRO_0813 = get_model("deepseek-v4-pro-0813")
DEEPSEEK_V4_PRO = get_model("deepseek-v4-pro")
DEEPSEEK_V4_FLASH = get_model("deepseek-v4-flash")
GROK_4_6 = get_model("grok-4.6")
GROK_4_5 = get_model("grok-4.5")
GROK_4_3 = get_model("grok-4.3")
GROK_4_20 = get_model("grok-4.20")
GROK_4_20_MULTI_AGENT = get_model("grok-4.20-multi-agent")
KIMI_K3 = get_model("kimi-k3")
KIMI_K2_6 = get_model("kimi-k2.6")
CLAUDINIO_ESSENTIAL = get_model("claudinio-essential")
MINIMAX_M3 = get_model("minimax-m3")
QWEN_3_8_MAX = get_model("qwen3.8-max")
QWEN_3_8_FLASH = get_model("qwen3.8-flash")
QWEN_3_8_27B = get_model("qwen3.8-27b")
QWEN_3_8_2_4T_A95B = get_model("qwen3.8-2.4t-a95b")
QWEN_3_7_PLUS = get_model("qwen3.7-plus")
QWEN_3_6_PLUS = get_model("qwen3.6-plus")
QWEN_3_6_FLASH = get_model("qwen3.6-flash")
MISTRAL_MEDIUM_3_5 = get_model("mistral-medium-3-5")
GLM_5_3 = get_model("glm-5.3")
GLM_5_3_FLASH = get_model("glm-5.3-flash")
GLM_5_2 = get_model("glm-5.2")
NEMOTRON_3_5_LIGHTNING = get_model("nemotron-3.5-lightning")
NEMOTRON_3_ULTRA_550B_A55B = get_model("nemotron-3-ultra-550b-a55b")
MISTRAL_7B = get_model("mistral-7b")
MISTRAL_7B_INSTRUCT = get_model("mistral-7b-instruct")


# Provider helpers
def get_provider(provider_id: str) -> dict | None:
    """Get provider configuration by provider_id, or None if not found."""
    from model_metadata_central.utils.load_provider import load_provider
    return load_provider(provider_id)


def get_all_providers() -> list[dict]:
    """Get all providers."""
    from model_metadata_central._registry import PROVIDERS
    return list(PROVIDERS)


def get_provider_model_id(model_id: str, provider_id: str) -> str | None:
    """Get the model_id as used by a specific provider."""
    model = get_model(model_id)
    if model is None:
        return None
    for p in model.get("providers") or []:
        if p.get("provider_id") == provider_id:
            return p.get("model_id_on_provider")
    return None

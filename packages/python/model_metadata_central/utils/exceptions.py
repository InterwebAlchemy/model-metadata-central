class ModelMetadataNotFoundError(Exception):
    """Raised when a model cannot be found in the registry."""

    def __init__(self, model_id: str) -> None:
        self.model_id = model_id
        super().__init__(f"No metadata found for model: {model_id}")
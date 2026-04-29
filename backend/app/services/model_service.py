import os
import json
import numpy as np
from PIL import Image
import io
import tensorflow as tf

# Chemins
MODEL_PATH = os.path.join(os.path.dirname(__file__), '..', '..', 'models', 'best_model.h5')
CLASS_INDICES_PATH = os.path.join(os.path.dirname(__file__), '..', 'data', 'class_indices.json')

# Chargement unique au démarrage
print("⏳ Chargement du modèle MobileNetV2...")
model = tf.keras.models.load_model(MODEL_PATH)

with open(CLASS_INDICES_PATH, 'r') as f:
    idx_to_class = json.load(f)

print(f"✅ Modèle chargé — {len(idx_to_class)} classes détectées")


def predict_disease(image_bytes: bytes) -> str:
    """
    Reçoit une image en bytes, retourne le nom de classe prédit
    ex: 'Tomato___Late_blight'
    """
    # Prétraitement image
    img = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    img = img.resize((224, 224))
    img_array = np.array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)  # (1, 224, 224, 3)

    # Prédiction
    predictions = model.predict(img_array, verbose=0)
    predicted_index = str(np.argmax(predictions[0]))

    # Conversion index → nom de classe
    class_name = idx_to_class.get(predicted_index, "Unknown")

    return class_name

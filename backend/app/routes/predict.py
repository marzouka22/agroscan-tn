from flask import Blueprint, request, jsonify
from app.services.model_service import predict_disease
from app.services.treatment_service import get_treatment

predict_bp = Blueprint('predict', __name__)


@predict_bp.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({"error": "Aucune image envoyée."}), 400

    image_file = request.files['image']

    if image_file.filename == '':
        return jsonify({"error": "Fichier image vide."}), 400

    image_bytes = image_file.read()

    # Prédiction via le modèle (placeholder pour l'instant)
    disease_key = predict_disease(image_bytes)

    # Récupération du traitement correspondant
    result = get_treatment(disease_key)

    return jsonify({
        "disease_key": disease_key,
        "nom": result["nom"],
        "traitement": result["traitement"]
    }), 200

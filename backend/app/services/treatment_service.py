import json
import os

DATA_PATH = os.path.join(os.path.dirname(__file__), '..', 'data', 'treatments.json')


def get_treatment(disease_key: str) -> dict:
    """
    Reçoit le nom de classe prédit par le modèle (ex: 'Tomato___Late_blight')
    et retourne le nom lisible + le traitement recommandé.
    """
    with open(DATA_PATH, 'r', encoding='utf-8') as f:
        treatments = json.load(f)

    if disease_key in treatments:
        return treatments[disease_key]
    else:
        return {
            "nom": "Maladie inconnue",
            "traitement": "Consulter un agronome."
        }

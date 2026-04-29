import pytest
from unittest.mock import MagicMock, patch

@pytest.fixture
def client():
    with patch('app.services.model_service.tf') as mock_tf:
        mock_model = MagicMock()
        mock_tf.keras.models.load_model.return_value = mock_model
        from app import create_app
        app = create_app()
        app.config['TESTING'] = True
        with app.test_client() as client:
            yield client

def test_health(client):
    response = client.get('/health')
    assert response.status_code == 200
    assert response.json['status'] == 'ok'

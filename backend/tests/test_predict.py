import pytest
from app import create_app

@pytest.fixture
def client():
    app = create_app()
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_predict_no_image(client):
    response = client.post('/predict')
    assert response.status_code == 400

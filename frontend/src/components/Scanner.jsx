import { useState, useRef } from 'react';
import { predictDisease } from '../services/api';
import DiseaseCard from './DiseaseCard';

export default function Scanner() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
    setError(null);
  };

  const handleScan = async () => {
    if (!selectedImage) return;

    setLoading(true);
    setError(null);

    try {
      const data = await predictDisease(selectedImage);
      setResult(data);

      // Sauvegarde dans l'historique
      const history = JSON.parse(localStorage.getItem('agroscan_history') || '[]');
      history.unshift({
        id: Date.now(),
        date: new Date().toLocaleString('fr-TN'),
        imageName: selectedImage.name,
        ...data,
      });
      localStorage.setItem('agroscan_history', JSON.stringify(history.slice(0, 20)));
    } catch (err) {
      setError('Erreur de connexion au serveur. Vérifie que le backend Flask tourne.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setPreview(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="scanner-container">
      <div className="scanner-card">
        <h1 className="scanner-title">📸 Scanner une plante</h1>
        <p className="scanner-subtitle">
          Prenez en photo une feuille malade et obtenez un diagnostic en quelques secondes.
        </p>

        {/* Zone upload */}
        <div
          className="upload-zone"
          onClick={() => fileInputRef.current.click()}
        >
          {preview ? (
            <img src={preview} alt="Aperçu" className="image-preview" />
          ) : (
            <div className="upload-placeholder">
              <span className="upload-icon">🖼️</span>
              <p>Cliquez pour choisir une image</p>
              <span className="upload-hint">JPG, PNG — max 10 MB</span>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />

        {/* Boutons */}
        <div className="scanner-actions">
          {selectedImage && (
            <button className="btn btn-secondary" onClick={handleReset}>
              Changer d'image
            </button>
          )}
          <button
            className="btn btn-primary"
            onClick={handleScan}
            disabled={!selectedImage || loading}
          >
            {loading ? '⏳ Analyse en cours...' : '🔍 Analyser'}
          </button>
        </div>

        {/* Erreur */}
        {error && <div className="error-box">{error}</div>}
      </div>

      {/* Résultat */}
      {result && <DiseaseCard result={result} />}
    </div>
  );
}

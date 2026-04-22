export default function DiseaseCard({ result }) {
  const isHealthy = result.nom.toLowerCase().includes('sain');

  return (
    <div className={`disease-card ${isHealthy ? 'healthy' : 'infected'}`}>
      <div className="disease-card-header">
        <span className="disease-icon">{isHealthy ? '✅' : '⚠️'}</span>
        <h2 className="disease-title">{result.nom}</h2>
      </div>

      <div className="disease-card-body">
        <div className="disease-section">
          <span className="section-label">🔬 Classe détectée</span>
          <span className="section-value disease-key">{result.disease_key}</span>
        </div>

        <div className="disease-section">
          <span className="section-label">💊 Traitement recommandé</span>
          <p className="section-value treatment-text">{result.traitement}</p>
        </div>
      </div>
    </div>
  );
}

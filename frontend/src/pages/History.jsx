import { useState } from 'react';

export default function History() {
  const [history, setHistory] = useState(() => {
    return JSON.parse(localStorage.getItem('agroscan_history') || '[]');
  });

  const handleClear = () => {
    localStorage.removeItem('agroscan_history');
    setHistory([]);
  };

  const isHealthy = (nom) => nom?.toLowerCase().includes('sain');

  return (
    <main className="main-content">
      <div className="history-container">
        <div className="history-header">
          <h1 className="scanner-title">📋 Historique des scans</h1>
          {history.length > 0 && (
            <button className="btn btn-danger" onClick={handleClear}>
              Effacer tout
            </button>
          )}
        </div>
        {history.length === 0 ? (
          <div className="empty-history">
            <span className="empty-icon">🌿</span>
            <p>Aucun scan effectué pour l'instant.</p>
          </div>
        ) : (
          <div className="history-list">
            {history.map((item) => (
              <div
                key={item.id}
                className={`history-item ${isHealthy(item.nom) ? 'healthy' : 'infected'}`}
              >
                <div className="history-item-left">
                  <span className="history-icon">{isHealthy(item.nom) ? '✅' : '⚠️'}</span>
                  <div>
                    <p className="history-nom">{item.nom}</p>
                    <p className="history-fichier">📁 {item.imageName}</p>
                  </div>
                </div>
                <div className="history-item-right">
                  <span className="history-date">{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

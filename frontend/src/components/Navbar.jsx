import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-logo">🌱</span>
        <span className="navbar-title">AgroScan TN</span>
      </div>
      <div className="navbar-links">
        <Link
          to="/"
          className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
        >
          Scanner
        </Link>
        <Link
          to="/history"
          className={`nav-link ${location.pathname === '/history' ? 'active' : ''}`}
        >
          Historique
        </Link>
      </div>
    </nav>
  );
}

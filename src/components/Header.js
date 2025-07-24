import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDoggeCard } from "../context/DoggeCardContext";
import { FileText, Save, Home } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const { state } = useDoggeCard();

  const isActive = (path) => location.pathname === path;
  const hasSavedCards = state.savedCards && state.savedCards.length > 0;

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <Link to="/builder" className="text-decoration-none">
            <h1 className="d-flex align-items-center gap-2 mb-0">
              <span className="fs-4">🐕</span>
              <span className="fw-bold text-primary">Dogge Card</span>
            </h1>
          </Link>
        </div>

        <nav className="header-actions">
          <Link
            to="/builder"
            className={`nav-link d-flex align-items-center gap-2 px-3 py-2 rounded-3 text-decoration-none transition-all ${
              isActive("/builder") ? "active" : ""
            }`}
          >
            <FileText size={18} />
            <span className="fw-medium">Builder</span>
          </Link>

          {hasSavedCards && (
            <Link
              to="/saved"
              className={`nav-link d-flex align-items-center gap-2 px-3 py-2 rounded-3 text-decoration-none transition-all ${
                isActive("/saved") ? "active" : ""
              }`}
            >
              <Save size={18} />
              <span className="fw-medium">
                Saved ({state.savedCards.length})
              </span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

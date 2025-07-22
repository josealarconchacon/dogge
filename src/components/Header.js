import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDoggeCard } from "../context/DoggeCardContext";
import { FileText, Save } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const { state } = useDoggeCard();

  const isActive = (path) => location.pathname === path;
  const hasSavedCards = state.savedCards && state.savedCards.length > 0;

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <Link to="/builder">
            <h1>🐕 Dogge Card</h1>
          </Link>
        </div>

        <div className="header-actions">
          <Link
            to="/builder"
            className={`nav-link ${isActive("/builder") ? "active" : ""}`}
          >
            <FileText size={16} />
            <span>Builder</span>
          </Link>

          {hasSavedCards && (
            <Link
              to="/saved"
              className={`nav-link ${isActive("/saved") ? "active" : ""}`}
            >
              <Save size={16} />
              <span>Saved ({state.savedCards.length})</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FileText } from "lucide-react";

const Header = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

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
        </div>
      </div>
    </header>
  );
};

export default Header;

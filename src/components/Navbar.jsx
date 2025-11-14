import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ theme, onToggleTheme }) => {
  return (
    <nav className="navbar navbar-dark bg-dark px-3 navbar-blur">
      <div className="d-flex align-items-center gap-2">
        <span className="navbar-brand fw-bold text-light m-0">
          📘 Lista de Contactos 
        </span>
        <span className="badge bg-gradient-mariana ms-2">
          by Mariana David
        </span>
      </div>

      <div className="d-flex align-items-center gap-2">
        <button
          type="button"
          className="btn btn-sm btn-outline-light"
          onClick={onToggleTheme}
        >
          {theme === "dark" ? "☀ Light" : "🌙 Dark"}
        </button>

        <Link to="/add" className="btn btn-dark-primary btn-sm">
          + Añadir Contacto
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

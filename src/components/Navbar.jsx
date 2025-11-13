import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-dark bg-dark px-4 mb-4">
      <span
        className="navbar-brand mb-0 h1"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        📒 Contact List App
      </span>

      <button className="btn btn-success" onClick={() => navigate("/add")}>
        + Agregar Contacto
      </button>
    </nav>
  );
};

export default Navbar;

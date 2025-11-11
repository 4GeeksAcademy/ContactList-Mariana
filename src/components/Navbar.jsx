import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="navbar navbar-light bg-light mb-3">
    <div className="container">
      <Link to="/" className="navbar-brand">
        📒 Contact Manager
      </Link>
      <Link to="/add" className="btn btn-success">Add Contact</Link>
    </div>
  </nav>
);

export default Navbar;

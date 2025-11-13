// src/pages/Contacts.jsx
import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.jsx";
import { useNavigate } from "react-router-dom";
import ContactCard from "../components/ContactCard.jsx";

const Contacts = () => {
  const { store } = useContext(Context);
  const { contacts } = store;
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filtered = contacts?.filter((c) =>
    [c.name, c.email, c.phone].some((field) =>
      field?.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="container py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold text-light">📒 Agenda de Contactos</h1>

        <button
          className="btn btn-primary shadow-sm px-4"
          onClick={() => navigate("/add")}
        >
          + Nuevo Contacto
        </button>
      </div>

      <input
        type="text"
        className="form-control mb-4 bg-dark text-light border-secondary"
        placeholder="🔍 Buscar contacto..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "12px", fontSize: "1.1rem" }}
      />

      {filtered?.length === 0 ? (
        <p className="text-muted text-center">No hay contactos.</p>
      ) : (
        filtered.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))
      )}
    </div>
  );
};

export default Contacts;

import React, { useContext, useState } from "react";
import { Context } from "../store.jsx";
import { useNavigate } from "react-router-dom";
import ContactCard from "../components/ContactCard.jsx";

const Contacts = () => {
  const { contacts } = useContext(Context);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredContacts = contacts.filter((c) =>
    [c.name, c.email, c.phone].some((field) =>
      field?.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold">Mi Agenda</h2>
        <button className="btn btn-success" onClick={() => navigate("/add")}>
          + Agregar
        </button>
      </div>

      <input
        type="text"
        className="form-control mb-4"
        placeholder="🔍 Buscar contacto..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredContacts.length === 0 ? (
        <p className="text-muted">No hay contactos que coincidan.</p>
      ) : (
        filteredContacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))
      )}
    </div>
  );
};

export default Contacts;

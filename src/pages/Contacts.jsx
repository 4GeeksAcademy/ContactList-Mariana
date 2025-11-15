import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.jsx";
import { useNavigate } from "react-router-dom";
import ContactCard from "../components/ContactCard.jsx";

const Contacts = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // 👉 SOLO CARGA CONTACTOS UNA VEZ
  useEffect(() => {
    actions.loadContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = store.contacts.filter(c =>
    [c.name, c.email, c.phone].some(field =>
      field?.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="container py-4">
      <h1 className="fw-bold text-center mb-4">📒 Lista de Contactos</h1>

      <div className="d-flex justify-content-between mb-4">
        <input
          type="text"
          className="form-control me-3"
          placeholder="Buscar..."
          onChange={e => setSearch(e.target.value)}
        />

        <button
          className="btn btn-dark-primary"
          onClick={() => navigate("/add")}
        >
          + Añadir
        </button>
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted text-center">No hay contactos.</p>
      ) : (
        filtered.map(c => <ContactCard key={c.id} contact={c} />)
      )}
    </div>
  );
};

export default Contacts;

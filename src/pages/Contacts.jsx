import React, { useContext } from "react";
import { Context } from "../store.jsx";
import { useNavigate } from "react-router-dom";
import ContactCard from "../components/ContactCard.jsx";

const Contacts = () => {
  const { contacts } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold">Mi Agenda</h2>
        <button
          className="btn btn-success"
          onClick={() => navigate("/add")}
        >
          + Agregar Contacto
        </button>
      </div>

      {contacts.length === 0 ? (
        <p className="text-muted">No hay contactos aún. Agrega uno nuevo.</p>
      ) : (
        contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))
      )}
    </div>
  );
};

export default Contacts;

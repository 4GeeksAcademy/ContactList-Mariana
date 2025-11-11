import React, { useContext } from "react";
import { Context } from "../store.jsx";
import { useNavigate } from "react-router-dom";

const ContactCard = ({ contact }) => {
  const { confirmDelete } = useContext(Context);
  const navigate = useNavigate();

  // Imagen fija realista
  const defaultImage =
    contact.image || "https://randomuser.me/api/portraits/women/68.jpg";

  const handleEdit = () => {
    console.log("Editar → id:", contact?.id);
    if (!contact?.id) return alert("Este contacto no tiene id.");
    navigate(`/edit/${contact.id}`);
  };

  const handleDelete = () => {
    console.log("Eliminar → id:", contact?.id);
    if (!contact?.id) return alert("Este contacto no tiene id.");
    if (typeof confirmDelete !== "function") {
      return alert("confirmDelete no está disponible en el Context.");
    }
    confirmDelete(contact.id);
  };

  return (
    <div className="card contact-card shadow-sm mb-3 p-3 d-flex flex-row align-items-center border-0 rounded-3">
      <img
        src={defaultImage}
        alt={contact?.name || "Contacto"}
        className="rounded-circle me-3 border"
        width="90"
        height="90"
      />

      <div className="flex-grow-1">
        <h5 className="fw-semibold mb-1">{contact?.name || "(Sin nombre)"}</h5>
        <p className="mb-1 text-muted">
          <i className="fa fa-map-marker-alt me-2 text-danger"></i>
          {contact?.address || "—"}
        </p>
        <p className="mb-1 text-muted">
          <i className="fa fa-phone me-2 text-success"></i>
          {contact?.phone || "—"}
        </p>
        <p className="mb-0 text-muted">
          <i className="fa fa-envelope me-2 text-primary"></i>
          {contact?.email || "—"}
        </p>
      </div>

      <div className="ms-auto d-flex flex-column gap-2">
        <button
          type="button"
          className="btn btn-primary btn-sm fw-semibold d-flex align-items-center justify-content-center gap-2"
          onClick={handleEdit}
        >
          <i className="fa fa-pen"></i> Editar
        </button>

        <button
          type="button"
          className="btn btn-danger btn-sm fw-semibold d-flex align-items-center justify-content-center gap-2"
          onClick={handleDelete}
        >
          <i className="fa fa-trash"></i> Eliminar
        </button>
      </div>
    </div>
  );
};

export default ContactCard;

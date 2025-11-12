import React, { useContext } from "react";
import { Context } from "../store.jsx";
import { useNavigate } from "react-router-dom";

const ContactCard = ({ contact }) => {
  const { confirmDelete } = useContext(Context);
  const navigate = useNavigate();

  const onEdit = (e) => {
    e.preventDefault();
    console.log("🧭 Edit click | id =", contact?.id, contact);
    if (!contact?.id && contact?.id !== 0) {
      alert("Este contacto no tiene ID válido (no se puede editar). Revisa la consola.");
      return;
    }
    navigate(`/edit/${contact.id}`);
  };

  const onDelete = (e) => {
    e.preventDefault();
    console.log("🧺 Delete click | id =", contact?.id, contact);
    if (!contact?.id && contact?.id !== 0) {
      alert("Este contacto no tiene ID válido (no se puede eliminar). Revisa la consola.");
      return;
    }
    confirmDelete(contact.id);
  };

  return (
    <div className="card mb-3 shadow-sm" style={{ maxWidth: "700px" }}>
      <div className="card-body d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Contacto"
            className="rounded-circle me-3"
            style={{ width: "70px", height: "70px", objectFit: "cover" }}
          />
          <div>
            <div className="small text-muted">ID: {String(contact?.id ?? "—")}</div>
            <h5 className="mb-1">{contact.name}</h5>
            <p className="mb-0"><i className="fas fa-envelope me-2" />{contact.email}</p>
            <p className="mb-0"><i className="fas fa-phone me-2" />{contact.phone}</p>
            <p className="mb-0"><i className="fas fa-map-marker-alt me-2" />{contact.address}</p>
          </div>
        </div>

        <div className="d-flex flex-column align-items-end">
          <button
            type="button"
            className="btn btn-outline-primary btn-sm mb-2"
            onClick={onEdit}
          >
            ✏️ Editar
          </button>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={onDelete}
          >
            🗑️ Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;

import React, { useContext } from "react";
import { Context } from "../store/appContext.jsx";
import { useNavigate } from "react-router-dom";

const ContactCard = ({ contact }) => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div className="dark-card mb-4">
      <div className="d-flex align-items-center justify-content-between">

        <div className="d-flex align-items-center gap-3">
          <img
            src={`https://randomuser.me/api/portraits/lego/${contact.id % 10}.jpg`}
            className="avatar-lg"
            alt="avatar"
          />

          <div>
            <h5 className="fw-bold">{contact.name}</h5>
            <p className="icon"><i className="fas fa-envelope me-2"></i>{contact.email}</p>
            <p className="icon"><i className="fas fa-phone me-2"></i>{contact.phone}</p>
            <p className="icon"><i className="fas fa-map-marker-alt me-2"></i>{contact.address}</p>
          </div>
        </div>

        <div className="d-flex flex-column gap-2">
          <button className="btn btn-outline-info btn-sm" onClick={() => navigate(`/edit/${contact.id}`)}>
            ✏️ Editar
          </button>

          <button className="btn btn-outline-danger btn-sm" onClick={() => actions.deleteContact(contact.id)}>
            🗑️ Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;

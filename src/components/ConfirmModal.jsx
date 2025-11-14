import React from "react";
import "../index.css";

const ConfirmModal = ({ show, title, message, onConfirm, onCancel }) => {
  if (!show) return null;

  return (
    <div className="modal-backdrop-custom">
      <div className="modal-custom">
        <h4 className="mb-3">{title}</h4>
        <p className="mb-4">{message}</p>

        <div className="d-flex justify-content-end gap-3">
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancelar
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

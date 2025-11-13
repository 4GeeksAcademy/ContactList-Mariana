// src/pages/AddContact.jsx
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext.jsx";
import { useNavigate, useParams } from "react-router-dom";

const AddContact = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const { id } = useParams();
  const editing = !!id;

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (editing && store.contacts.length > 0) {
      const found = store.contacts.find((c) => c.id === parseInt(id));
      if (found) setContact(found);
    }
  }, [id, store.contacts]);

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editing) {
      actions.updateContact(id, contact);
    } else {
      actions.addContact(contact);
    }

    navigate("/");
  };

  return (
    <div className="container py-4 text-light">

      <h2 className="text-center mb-4">
        {editing ? "✏️ Editar Contacto" : "➕ Añadir Contacto"}
      </h2>

      <form
        className="mx-auto p-4 rounded shadow-lg bg-dark"
        style={{ maxWidth: "600px" }}
        onSubmit={handleSubmit}
      >
        {["name", "email", "phone", "address"].map((field) => (
          <div className="mb-3" key={field}>
            <label className="form-label text-capitalize text-secondary">
              {field}
            </label>

            <input
              type="text"
              name={field}
              className="form-control bg-secondary text-light border-0"
              value={contact[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <div className="d-flex justify-content-between mt-3">
          <button type="submit" className="btn btn-primary px-4">
            {editing ? "Guardar Cambios" : "Crear Contacto"}
          </button>

          <button
            type="button"
            className="btn btn-outline-light px-4"
            onClick={() => navigate("/")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddContact;

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
    address: ""
  });

  useEffect(() => {
    if (editing && store.contacts.length > 0) {
      const found = store.contacts.find(c => c.id === parseInt(id));
      if (found) setContact(found);
    }
  }, [editing, id, store.contacts]);

  const handleChange = e => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (editing) {
      await actions.editContact(id, contact);
    } else {
      await actions.addContact(contact);
    }

    // navegamos cuando ya terminó la petición
    navigate("/");
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">
        {editing ? "Editar Contacto" : "Nuevo Contacto"}
      </h2>

      <form
        className="dark-card mx-auto"
        style={{ maxWidth: "600px" }}
        onSubmit={handleSubmit}
      >
        {["name", "email", "phone", "address"].map(field => (
          <div className="mb-3" key={field}>
            <label className="form-label text-capitalize">{field}</label>
            <input
              type="text"
              name={field}
              className="form-control"
              value={contact[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <div className="d-flex justify-content-between mt-3">
          <button className="btn btn-dark-primary" type="submit">
            {editing ? "Guardar Cambios" : "Crear Contacto"}
          </button>

          <button
            className="btn btn-secondary"
            type="button"
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

import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store.jsx";
import { useNavigate, useParams } from "react-router-dom";

const AddContact = () => {
  const { addContact, updateContact, contacts } = useContext(Context);
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
    if (editing) {
      const found = contacts.find((c) => c.id === parseInt(id));
      if (found) setContact(found);
    }
  }, [id, contacts]);

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9\-+()\s]{7,20}$/;

    if (!emailRegex.test(contact.email)) {
      alert("Por favor, ingresa un correo válido.");
      return;
    }
    if (!phoneRegex.test(contact.phone)) {
      alert("Por favor, ingresa un número de teléfono válido.");
      return;
    }

    if (editing) await updateContact(id, contact);
    else await addContact(contact);
    navigate("/");
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">{editing ? "Editar Contacto" : "Añadir Contacto"}</h2>
      <form
        className="mx-auto"
        style={{ maxWidth: "600px" }}
        onSubmit={handleSubmit}
      >
        {["name", "email", "phone", "address"].map((field) => (
          <div className="mb-3" key={field}>
            <label className="form-label text-capitalize">{field}</label>
            <input
              type={field === "email" ? "email" : "text"}
              name={field}
              className="form-control"
              value={contact[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-success">
            {editing ? "Guardar Cambios" : "Añadir Contacto"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
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

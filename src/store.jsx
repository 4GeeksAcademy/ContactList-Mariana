import React, { createContext, useState, useEffect } from "react";

export const Context = createContext();

export const AppContext = ({ children }) => {
  const baseUrl = "https://playground.4geeks.com/contact";
  const agendaSlug = "marianadavid";
  const [contacts, setContacts] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 2500);
  };

  const createAgenda = async () => {
    try {
      const resp = await fetch(`${baseUrl}/agendas/${agendaSlug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (resp.status === 201) console.log("✅ Agenda creada");
      else console.log("📘 Agenda ya existente");
    } catch (error) {
      console.error("❌ Error al crear agenda:", error);
    }
  };

  const getContacts = async () => {
    try {
      const resp = await fetch(`${baseUrl}/agendas/${agendaSlug}`);
      if (!resp.ok) throw new Error("Error al obtener contactos");
      const data = await resp.json();
      setContacts(data.contacts || []);
    } catch (error) {
      console.error("❌ Error al obtener contactos:", error);
    }
  };

  const addContact = async (contact) => {
    try {
      const resp = await fetch(`${baseUrl}/agendas/${agendaSlug}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          address: contact.address,
        }),
      });

      if (resp.ok) {
        showToast("✅ Contacto creado correctamente");
        await getContacts();
      } else {
        const err = await resp.text();
        console.error("❌ Error al crear contacto:", err);
        showToast("❌ Error al crear contacto", "danger");
      }
    } catch (error) {
      console.error("❌ Error de conexión al crear contacto:", error);
      showToast("❌ Error de conexión al crear contacto", "danger");
    }
  };

  const updateContact = async (id, contact) => {
    try {
      const resp = await fetch(`${baseUrl}/agendas/${agendaSlug}/contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          address: contact.address,
        }),
      });

      if (resp.ok) {
        showToast("✏️ Contacto actualizado correctamente");
        await getContacts();
      } else {
        const err = await resp.text();
        console.error("❌ Error al actualizar contacto:", err);
        showToast("❌ Error al actualizar contacto", "danger");
      }
    } catch (error) {
      console.error("❌ Error al actualizar contacto:", error);
      showToast("❌ Error al actualizar contacto", "danger");
    }
  };

  const deleteContact = async (id) => {
    try {
      const resp = await fetch(`${baseUrl}/agendas/${agendaSlug}/contacts/${id}`, {
        method: "DELETE",
      });

      if (resp.ok) {
        showToast("🗑️ Contacto eliminado correctamente");
        await getContacts();
      } else {
        const err = await resp.text();
        console.error("❌ Error al eliminar contacto:", err);
        showToast("❌ Error al eliminar contacto", "danger");
      }
    } catch (error) {
      console.error("❌ Error al eliminar contacto:", error);
      showToast("❌ Error al eliminar contacto", "danger");
    }
  };

  const confirmDelete = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este contacto?")) {
      deleteContact(id);
    }
  };

  useEffect(() => {
    createAgenda().then(getContacts);
  }, []);

  return (
    <Context.Provider
      value={{
        contacts,
        addContact,
        updateContact,
        deleteContact,
        confirmDelete,
      }}
    >
      {children}

      {toast.show && (
        <div
          className={`toast align-items-center text-bg-${toast.type} border-0 position-fixed bottom-0 end-0 m-3 show`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          style={{ zIndex: 2000 }}
        >
          <div className="d-flex">
            <div className="toast-body">{toast.message}</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              onClick={() => setToast({ show: false, message: "", type: "success" })}
            ></button>
          </div>
        </div>
      )}
    </Context.Provider>
  );
};

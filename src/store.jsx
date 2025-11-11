import React, { createContext, useState, useEffect } from "react";

export const Context = createContext();

export const AppContext = ({ children }) => {
  const baseUrl = "https://playground.4geeks.com/contact";
  const agendaSlug = "marianadavid";
  const [contacts, setContacts] = useState([]);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  // ✅ Mostrar notificaciones (toast)
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 2500);
  };

  // ✅ Obtener contactos
  const getContacts = async () => {
    try {
      const resp = await fetch(`${baseUrl}/agendas/${agendaSlug}`);
      if (!resp.ok) throw new Error("No se pudieron obtener los contactos");
      const data = await resp.json();
      setContacts(data.contacts || []);
    } catch (error) {
      console.error("❌ Error al obtener contactos:", error);
    }
  };

  // ✅ Crear agenda si no existe
  const createAgenda = async () => {
    try {
      const resp = await fetch(`${baseUrl}/agendas/${agendaSlug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (resp.ok) console.log("📘 Agenda creada o ya existente");
    } catch (error) {
      console.error("❌ Error al crear la agenda:", error);
    }
  };

  // ✅ Crear contacto
  const addContact = async (contact) => {
    try {
      const response = await fetch(`${baseUrl}/agendas/${agendaSlug}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });

      if (response.ok) {
        showToast("✅ Contacto creado correctamente");
        getContacts();
      } else {
        const errorData = await response.json();
        console.error("❌ Error al crear contacto:", errorData);
        showToast("❌ Error al crear el contacto", "danger");
      }
    } catch (error) {
      console.error("❌ Error de conexión al crear contacto:", error);
      showToast("❌ Error de conexión al crear contacto", "danger");
    }
  };

  // ✅ Editar contacto (corregido)
  const updateContact = async (id, contact) => {
    try {
      const fullContact = {
        name: contact.name || "",
        email: contact.email || "",
        phone: contact.phone || "",
        address: contact.address || "",
        agenda_slug: agendaSlug, // 🔥 obligatorio
      };

      const response = await fetch(`${baseUrl}/contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fullContact),
      });

      if (response.ok) {
        showToast("✅ Contacto actualizado correctamente");
        getContacts();
      } else {
        const errorData = await response.json();
        console.error("❌ Error al actualizar contacto:", errorData);
        showToast("❌ No se pudo actualizar el contacto", "danger");
      }
    } catch (error) {
      console.error("❌ Error de conexión al actualizar contacto:", error);
      showToast("❌ Error de conexión al actualizar contacto", "danger");
    }
  };

  // ✅ Eliminar contacto
  const deleteContact = async (id) => {
    try {
      const response = await fetch(`${baseUrl}/contacts/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        showToast("🗑️ Contacto eliminado correctamente");
        getContacts();
      } else {
        const errorData = await response.json();
        console.error("❌ Error al eliminar contacto:", errorData);
        showToast("❌ Error al eliminar contacto", "danger");
      }
    } catch (error) {
      console.error("❌ Error de conexión al eliminar contacto:", error);
      showToast("❌ Error de conexión al eliminar contacto", "danger");
    }
  };

  // ✅ Confirmación antes de eliminar (abre modal)
  const confirmDelete = (id) => {
    setContactToDelete(id);
    const modalElement = document.getElementById("deleteModal");
    if (window.bootstrap && modalElement) {
      const modal = new window.bootstrap.Modal(modalElement);
      modal.show();
    } else {
      if (window.confirm("¿Seguro que deseas eliminar este contacto?")) {
        deleteContact(id);
      }
    }
  };

  // ✅ Confirmar borrado
  const handleConfirmDelete = () => {
    if (contactToDelete) deleteContact(contactToDelete);
    const modalElement = document.getElementById("deleteModal");
    if (window.bootstrap && modalElement) {
      const modal = window.bootstrap.Modal.getInstance(modalElement);
      modal.hide();
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
        handleConfirmDelete,
      }}
    >
      {children}

      {/* ✅ Modal de confirmación */}
      <div
        className="modal fade"
        id="deleteModal"
        tabIndex="-1"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-danger text-white">
              <h5 className="modal-title" id="deleteModalLabel">
                Confirmar Eliminación
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Cerrar"
              ></button>
            </div>
            <div className="modal-body">
              ¿Estás segura de que deseas eliminar este contacto?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleConfirmDelete}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Toast de notificaciones */}
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
              onClick={() => setToast({ show: false, message: "", type: "" })}
            ></button>
          </div>
        </div>
      )}
    </Context.Provider>
  );
};

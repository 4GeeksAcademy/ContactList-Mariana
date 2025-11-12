import React, { createContext, useState, useEffect } from "react";

export const Context = createContext();

export const AppContext = ({ children }) => {
  const baseUrl = "https://playground.4geeks.com/contact";
  const agendaSlug = "marianadavid";
  const [contacts, setContacts] = useState([]);

  const createAgenda = async () => {
    try {
      const resp = await fetch(`${baseUrl}/agendas/${agendaSlug}`, { method: "POST", headers: { "Content-Type": "application/json" } });
      console.log(resp.status === 201 ? "✅ Agenda creada" : "📘 Agenda ya existía");
    } catch (error) {
      console.error("❌ Error al crear agenda:", error);
    }
  };

  const getContacts = async () => {
    try {
      const resp = await fetch(`${baseUrl}/agendas/${agendaSlug}`);
      if (!resp.ok) throw new Error(`GET contactos fallo: ${resp.status}`);
      const data = await resp.json();
      console.log("📋 Contactos obtenidos:", data.contacts);
      setContacts(Array.isArray(data.contacts) ? data.contacts : []);
    } catch (error) {
      console.error("❌ Error al obtener contactos:", error);
    }
  };

  const addContact = async (contact) => {
    try {
      console.log("➕ addContact | payload =", contact);
      const resp = await fetch(`${baseUrl}/agendas/${agendaSlug}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          address: contact.address,
          agenda_slug: agendaSlug,
        }),
      });
      if (resp.ok) {
        console.log("✅ Contacto creado");
        await getContacts();
      } else {
        const err = await resp.json().catch(() => ({}));
        console.error("❌ Error al crear contacto:", resp.status, err);
        alert("No se pudo crear el contacto. Revisa consola.");
      }
    } catch (error) {
      console.error("❌ Error de conexión al crear contacto:", error);
      alert("Error de red al crear contacto.");
    }
  };

  const updateContact = async (id, contact) => {
    try {
      console.log("✏️ updateContact | id =", id, "| payload =", contact);
      const resp = await fetch(`${baseUrl}/contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          address: contact.address,
          agenda_slug: agendaSlug,
        }),
      });
      if (resp.ok) {
        console.log("✅ Contacto actualizado");
        await getContacts();
      } else {
        const err = await resp.json().catch(() => ({}));
        console.error("❌ Error al actualizar:", resp.status, err);
        alert("No se pudo actualizar el contacto. Revisa consola.");
      }
    } catch (error) {
      console.error("❌ Error de conexión al actualizar:", error);
      alert("Error de red al actualizar.");
    }
  };

  const deleteContact = async (id) => {
    console.log("🗑️ deleteContact | id =", id);
    try {
      const resp = await fetch(`${baseUrl}/contacts/${id}`, { method: "DELETE" });
      if (resp.ok) {
        console.log("✅ Contacto eliminado");
        await getContacts();
      } else {
        const err = await resp.json().catch(() => ({}));
        console.error("❌ Error al eliminar:", resp.status, err);
        alert("No se pudo eliminar el contacto. Revisa consola.");
      }
    } catch (error) {
      console.error("❌ Error de conexión al eliminar:", error);
      alert("Error de red al eliminar.");
    }
  };

  const confirmDelete = (id) => {
    if (!id && id !== 0) {
      alert("Este contacto no tiene un ID válido.");
      return;
    }
    if (window.confirm("¿Seguro que deseas eliminar este contacto?")) {
      deleteContact(id);
    }
  };

  useEffect(() => {
    (async () => {
      await createAgenda();
      await getContacts();
    })();
  }, []);

  return (
    <Context.Provider value={{ contacts, addContact, updateContact, deleteContact, confirmDelete }}>
      {children}
    </Context.Provider>
  );
};

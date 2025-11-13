const BASE_URL = "https://playground.4geeks.com/contact";
const AGENDA = "marianadavid";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      contacts: []
    },

    actions: {
      loadContacts: async () => {
        try {
          const resp = await fetch(`${BASE_URL}/agendas/${AGENDA}`);
          const data = await resp.json();
          setStore({ contacts: data.contacts || [] });
        } catch (err) {
          console.error("Error loading contacts:", err);
        }
      },

      addContact: async (contact) => {
        try {
          const resp = await fetch(`${BASE_URL}/agendas/${AGENDA}/contacts`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(contact)
          });

          if (!resp.ok) throw new Error("Error creating contact");
          getActions().loadContacts();
        } catch (err) {
          console.error(err);
        }
      },

      editContact: async (id, contact) => {
        try {
          const resp = await fetch(`${BASE_URL}/agendas/${AGENDA}/contacts/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(contact)
          });

          if (!resp.ok) throw new Error("Error updating contact");
          getActions().loadContacts();
        } catch (err) {
          console.error(err);
        }
      },

      deleteContact: async (id) => {
        try {
          const resp = await fetch(`${BASE_URL}/agendas/${AGENDA}/contacts/${id}`, {
            method: "DELETE"
          });

          if (!resp.ok) throw new Error("Error deleting contact");
          getActions().loadContacts();
        } catch (err) {
          console.error(err);
        }
      }
    }
  };
};

export default getState;

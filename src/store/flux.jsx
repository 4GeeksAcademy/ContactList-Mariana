const BASE_URL = "https://playground.4geeks.com/contact";
const AGENDA = "agendaMariana";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      contacts: [],

      toast: { show: false, message: "", type: "success" },

      modal: {
        show: false,
        title: "",
        message: "",
        onConfirm: null
      }
    },

    actions: {
      // ==========================
      // TOAST
      // ==========================
      showToast: (message, type = "success") => {
        setStore({
          ...getStore(),
          toast: { show: true, message, type }
        });

        setTimeout(() => {
          setStore({
            ...getStore(),
            toast: { show: false, message: "", type: "success" }
          });
        }, 2000);
      },

      // ==========================
      // MODAL
      // ==========================
      openModal: (title, message, onConfirm) => {
        setStore({
          ...getStore(),
          modal: { show: true, title, message, onConfirm }
        });
      },

      closeModal: () => {
        setStore({
          ...getStore(),
          modal: { show: false, title: "", message: "", onConfirm: null }
        });
      },

      // ==========================
      // CONTACTOS
      // ==========================
      loadContacts: async () => {
        try {
          const resp = await fetch(`${BASE_URL}/agendas/${AGENDA}`);
          const data = await resp.json();
          setStore({ contacts: data.contacts || [] });
        } catch (err) {
          console.error("Error loading contacts:", err);
        }
      },

      addContact: async contact => {
        try {
          const resp = await fetch(`${BASE_URL}/agendas/${AGENDA}/contacts`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(contact)
          });

          if (!resp.ok) throw new Error("Error adding contact");

          getActions().loadContacts();
          getActions().showToast("Contacto agregado", "success");
        } catch (err) {
          console.error(err);
        }
      },

      editContact: async (id, contact) => {
        try {
          const resp = await fetch(
            `${BASE_URL}/agendas/${AGENDA}/contacts/${id}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(contact)
            }
          );

          if (!resp.ok) throw new Error("Error editing contact");

          getActions().loadContacts();
          getActions().showToast("Contacto actualizado", "info");
        } catch (err) {
          console.error(err);
        }
      },

      deleteContact: id => {
        getActions().openModal(
          "Eliminar contacto",
          "¿Estás segura que deseas eliminar este contacto?",
          async () => {
            try {
              const resp = await fetch(
                `${BASE_URL}/agendas/${AGENDA}/contacts/${id}`,
                { method: "DELETE" }
              );

              if (!resp.ok) throw new Error("Error deleting");

              getActions().loadContacts();
              getActions().showToast("Contacto eliminado", "danger");
            } catch (err) {
              console.error(err);
            }

            getActions().closeModal();
          }
        );
      }
    }
  };
};

export default getState;

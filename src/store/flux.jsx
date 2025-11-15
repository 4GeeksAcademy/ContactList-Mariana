const BASE_URL = "https://playground.4geeks.com/contact";
const AGENDA = "agendaMariana";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      contacts: [],

      toast: {
        show: false,
        message: "",
        type: "success",
      },

      modal: {
        show: false,
        title: "",
        message: "",
        onConfirm: null,
      },
    },

    actions: {
      // ==========================================
      // TOAST
      // ==========================================
      showToast: (message, type = "success") => {
        const store = getStore();

        setStore({
          ...store,
          toast: { show: true, message, type },
        });

        setTimeout(() => {
          const storeNow = getStore();
          setStore({
            ...storeNow,
            toast: { show: false, message: "", type: "success" },
          });
        }, 3000);
      },

      // ==========================================
      // MODAL
      // ==========================================
      openModal: (title, message, onConfirm) => {
        const store = getStore();

        setStore({
          ...store,
          modal: { show: true, title, message, onConfirm },
        });
      },

      closeModal: () => {
        const store = getStore();

        setStore({
          ...store,
          modal: { show: false, title: "", message: "", onConfirm: null },
        });
      },

      // ==========================================
      // CARGAR CONTACTOS
      // ==========================================
      loadContacts: async () => {
        try {
          const resp = await fetch(`${BASE_URL}/agendas/${AGENDA}`);
          const data = await resp.json();

          setStore({
            ...getStore(),
            contacts: data.contacts || [],
          });
        } catch (err) {
          console.error("Error loading contacts:", err);
        }
      },

      // ==========================================
      // AGREGAR
      // ==========================================
      addContact: async (contact) => {
        try {
          const resp = await fetch(
            `${BASE_URL}/agendas/${AGENDA}/contacts`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(contact),
            }
          );

          if (!resp.ok) throw new Error("Error adding");

          await getActions().loadContacts();
          getActions().showToast("Contacto agregado", "success");
        } catch (err) {
          console.error(err);
        }
      },

      // ==========================================
      // EDITAR
      // ==========================================
      editContact: async (id, contact) => {
        try {
          const resp = await fetch(
            `${BASE_URL}/agendas/${AGENDA}/contacts/${id}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(contact),
            }
          );

          if (!resp.ok) throw new Error("Error editing");

          await getActions().loadContacts();
          getActions().showToast("Contacto actualizado", "info");
        } catch (err) {
          console.error(err);
        }
      },

      // ==========================================
      // ELIMINAR CONTACTO FINAL
      // ==========================================
      deleteContact: (id) => {
        const actions = getActions();

        actions.openModal(
          "Eliminar Contacto",
          "¿Estás segura que deseas eliminar este contacto?",
          async () => {
            actions.closeModal();

            await new Promise((r) => setTimeout(r, 200));

            try {
              const resp = await fetch(
                `${BASE_URL}/agendas/${AGENDA}/contacts/${id}`,
                { method: "DELETE" }
              );

              if (!resp.ok) throw new Error("Error deleting");

              await actions.loadContacts();
              actions.showToast("Contacto eliminado", "danger");
            } catch (err) {
              console.error(err);
              actions.showToast("Error al eliminar", "danger");
            }
          }
        );
      },
    },
  };
};

export default getState;

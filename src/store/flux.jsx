const BASE_URL = "https://playground.4geeks.com/contact";
const AGENDA = "agendaMarianaFinal"; // Agenda limpia y funcional

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
    
      showToast: (message, type = "success") => {
        const store = getStore();
        setStore({ ...store, toast: { show: true, message, type } });
        setTimeout(() => {
          const storeNow = getStore();
          setStore({ ...storeNow, toast: { show: false, message: "", type: "success" } });
        }, 3000);
      },

      openModal: (title, message, onConfirm) => {
        const store = getStore();
        setStore({ ...store, modal: { show: true, title, message, onConfirm } });
      },

      closeModal: () => {
        const store = getStore();
        setStore({ ...store, modal: { show: false, title: "", message: "", onConfirm: null } });
      },

     
      loadContacts: async () => {
        try {
          const resp = await fetch(`${BASE_URL}/agendas/${AGENDA}/contacts`);
          const data = await resp.json();

          setStore({
            ...getStore(),
            contacts: data.contacts || [],
          });
        } catch (err) {
          console.error("Error loading contacts:", err);
        }
      },

    
      addContact: async (contact) => {
        const actions = getActions();
        try {
        
          const contactToSend = {
              name: contact.full_name, 
              email: contact.email,
              phone: contact.phone,
              address: contact.address,
              agenda_slug: AGENDA 
          };
            
          const resp = await fetch(
            `${BASE_URL}/agendas/${AGENDA}/contacts`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(contactToSend),
            }
          );

          if (!resp.ok) {
            const errorData = await resp.json();
            console.error("Error del servidor al agregar:", errorData);
            throw new Error(`Error adding contact. ${errorData.message || 'Verifica que todos los campos estén llenos.'}`);
          }

          
          await actions.loadContacts(); 
          
        
          actions.showToast("Contacto agregado", "success");

          
          await new Promise(r => setTimeout(r, 1500)); 
          
        } catch (err) {
          console.error("Error al agregar contacto:", err);
          actions.showToast("Error al crear contacto", "danger");
        }
      },

     
      editContact: async (id, contact) => {
        try {
          const contactToSend = {
              name: contact.full_name, 
              email: contact.email,
              phone: contact.phone,
              address: contact.address
          };

          const resp = await fetch(
            `${BASE_URL}/agendas/${AGENDA}/contacts/${id}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(contactToSend),
            }
          );

          if (!resp.ok) throw new Error("Error editing contact. Status: " + resp.status);

          await getActions().loadContacts();
          getActions().showToast("Contacto actualizado", "info");
        } catch (err) {
          console.error(err);
          getActions().showToast("Error al editar contacto", "danger");
        }
      },

     
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

              if (!resp.ok) {
                const errorText = await resp.text();
                console.error("Error del servidor al intentar eliminar:", errorText);
                throw new Error(`Error deleting contact. Status: ${resp.status}`);
              }

             
              actions.showToast("Contacto eliminado", "danger");
              
              
              await new Promise(r => setTimeout(r, 500)); 

              await actions.loadContacts();
              
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
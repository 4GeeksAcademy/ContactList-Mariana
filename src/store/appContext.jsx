// 📁 src/store/appContext.jsx
import React, { useState } from "react";
import getState from "./flux.jsx";

// ⬅️ ESTE ES EL CONTEXTO QUE ESTÁS IMPORTANDO EN TODOS LADOS
export const Context = React.createContext(null);

const AppContext = ({ children }) => {
  // ⚙️ Inicializamos el state global usando flux.jsx
  const [state, setState] = useState(
    getState({
      getStore: () => state.store,
      getActions: () => state.actions,
      setStore: updatedStore =>
        setState(prev => ({
          store: { ...prev.store, ...updatedStore },
          actions: { ...prev.actions }
        }))
    })
  );

  const { store, actions } = state;

  return (
    <Context.Provider value={{ store, actions }}>
      {children}

      {/* ==========================
          🔥 MODAL GLOBAL
      =========================== */}
      {store.modal.show && (
        <div className="modal-backdrop-custom">
          <div className="modal-custom">
            <h4 className="mb-3">{store.modal.title}</h4>
            <p className="mb-4">{store.modal.message}</p>

            <div className="d-flex justify-content-end gap-3">
              <button
                className="btn btn-secondary"
                onClick={actions.closeModal}
              >
                Cancelar
              </button>

              <button
                className="btn btn-danger"
                onClick={store.modal.onConfirm}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================
          🔥 TOAST GLOBAL
      =========================== */}
      {store.toast.show && (
        <div className={`toast-modern toast-${store.toast.type}`}>
          {store.toast.message}
        </div>
      )}
    </Context.Provider>
  );
};

export default AppContext;

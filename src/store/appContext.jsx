import React, { useState } from "react";
import getState from "./flux.jsx";

export const Context = React.createContext(null);

const AppContext = ({ children }) => {
  const [state, setState] = useState(
    getState({
      getStore: () => state.store,
      getActions: () => state.actions,
      setStore: updatedStore =>
        setState({
          store: { ...state.store, ...updatedStore },
          actions: { ...state.actions }
        })
    })
  );

  return (
    <Context.Provider value={state}>
      {children}

      {/* MODAL */}
      {state.store.modal.show && (
        <div className="modal-backdrop-custom">
          <div className="modal-custom">
            <h4 className="mb-3">{state.store.modal.title}</h4>
            <p className="mb-4">{state.store.modal.message}</p>

            <div className="d-flex justify-content-end gap-3">
              <button
                className="btn btn-secondary"
                onClick={state.actions.closeModal}
              >
                Cancelar
              </button>

              <button
                className="btn btn-danger"
                onClick={state.store.modal.onConfirm}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {state.store.toast.show && (
        <div className={`toast-modern toast-${state.store.toast.type}`}>
          {state.store.toast.message}
        </div>
      )}
    </Context.Provider>
  );
};

export default AppContext;

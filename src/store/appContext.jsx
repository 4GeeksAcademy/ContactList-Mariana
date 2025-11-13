import React, { useState, useEffect } from "react";
import getState from "./flux.jsx";

export const Context = React.createContext(null);

const AppContext = (PassedComponent) => {
  const StoreWrapper = (props) => {
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

    useEffect(() => {
      state.actions.loadContacts();
    }, []);

    return (
      <Context.Provider value={state}>
        <PassedComponent {...props} />
      </Context.Provider>
    );
  };

  return StoreWrapper;
};

export default AppContext;

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppContext } from "./store.jsx";
import Contacts from "./pages/Contacts.jsx";
import AddContact from "./pages/AddContact.jsx";

const RoutesComponent = () => {
  return (
    <BrowserRouter>
      <AppContext>
        <Routes>
          <Route path="/" element={<Contacts />} />
          <Route path="/add" element={<AddContact />} />
          <Route path="/edit/:id" element={<AddContact />} />
        </Routes>
      </AppContext>
    </BrowserRouter>
  );
};

export default RoutesComponent;

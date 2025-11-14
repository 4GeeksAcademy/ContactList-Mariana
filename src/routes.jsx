import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contacts from "./pages/Contacts.jsx";
import AddContact from "./pages/AddContact.jsx";

const Layout = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Contacts />} />
        <Route path="/add" element={<AddContact />} />
        <Route path="/edit/:id" element={<AddContact />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Layout;

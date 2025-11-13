import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contacts from "./pages/Contacts.jsx";
import AddContact from "./pages/AddContact.jsx";
import Navbar from "./components/Navbar.jsx";

const Layout = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Contacts />} />
          <Route path="/add" element={<AddContact />} />
          <Route path="/edit/:id" element={<AddContact />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Layout;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout.jsx";
import Contacts from "./pages/Contacts.jsx";
import AddContact from "./pages/AddContact.jsx";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Contacts />} />
          <Route path="/add" element={<AddContact />} />
          <Route path="/edit/:id" element={<AddContact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

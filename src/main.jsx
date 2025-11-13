import React from "react";
import { createRoot } from "react-dom/client";
import AppContext from "./store/appContext.jsx";
import Layout from "./routes.jsx";
import "./index.css";

const App = AppContext(Layout);

createRoot(document.getElementById("root")).render(<App />);

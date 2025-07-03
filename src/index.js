import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./components/App";
import { AuthContextProvider } from "./context/authContext";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render( //  means whatever we are going to chnge will only will display in the components not the whole page will reloaded
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider >
  </React.StrictMode>
);

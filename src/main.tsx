import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { App } from "./app/App";
import { ExportPage } from "./features/result/ui/ExportPage";
import "./app/styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/export" element={<ExportPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

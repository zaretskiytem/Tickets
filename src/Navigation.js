import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import AdminProvider from "./contexts/AdminProvider";
import AdminAddPage from "./pages/AdminAddPage";
import AdminEditPage from "./pages/AdminEditPage";
import BasketPage from "./pages/BasketPage";
import ClientProvider from "./contexts/ClientProvider";

function Navigation() {
  return (
    <ClientProvider>
      <AdminProvider>
        <BrowserRouter>
          <div className="container">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/admin/add" element={<AdminAddPage />} />
              <Route path="/admin/edit/:id" element={<AdminEditPage />} />
              <Route path="/basket" element={<BasketPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AdminProvider>
    </ClientProvider>
  );
}

export default Navigation;


import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";

import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-book"
        element={
          <ProtectedRoute>
            <AddBook />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-book/:id"
        element={
          <ProtectedRoute>
            <EditBook />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './inicio/inicio';
import Login from './login/login';
import Register from './register/register';
import Dashboard from './admin/Dashboard';
import Donaciones from './admin/stadisticas/Donaciones';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import CreateCausa from './Causas/CreateCausa';
import VerCausas from './Causas/VerCausas';
import ProtectedRoute from './ProtectedRoute'; // Asegúrate de que la ruta sea correcta

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    setIsLoggedIn(!!token);
    setUserRole(role ? parseInt(role) : null);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to={userRole === 1 ? '/dashboard' : '/'} replace />
            ) : (
              <Login setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />
        <Route
          path="/register"
          element={
            isLoggedIn ? (
              <Navigate to={userRole === 1 ? '/dashboard' : '/'} replace />
            ) : (
              <Register />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn && userRole === 1}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/donaciones"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Donaciones />
            </ProtectedRoute>
          }
        />
        <Route
          path="/crearcausa"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn && userRole === 1}>
              <CreateCausa />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vercausas"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn && userRole !== null}>
              <VerCausas />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

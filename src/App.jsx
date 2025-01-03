import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './inicio/inicio';
import Login from './login/login';
import Register from './register/register';
import Dashboard from './admin/Dashboard';
import Donaciones from './admin/stadisticas/Donaciones';
import Pagos from './admin/stadisticas/Pagos';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import CreateCausa from './Causas/CreateCausa';
import VerCausas from './Causas/VerCausas';
import Usuario from './Usuario/Usuario';
import Informe from './Usuario/Informe';
import MisCausas from './Usuario/MisCausas';
import ViewCausa from './Usuario/ViewCausa';
import DonarPage from './Donar/DonarPage';

import ProtectedRoute from './ProtectedRoute';
import NavigationBar from './navbar/navbar';
import GestionarCausas from './admin/stadisticas/GestionarCausas';
import Acercade from './inicio/Acercade';
import Categorias from './Categorias/Categorias';
import Causasfiltro from './Categorias/Causasfiltro';
import CausaDetalle from './Causas/CausaDetalle';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    setIsLoggedIn(!!token);
    setUserRole(role ? parseInt(role) : null);
    setIsLoading(false);
  }, []);

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUserRole(null);
  };

  if (isLoading) {
    // Muestra un indicador de carga mientras los valores inicializan
    return <div>Cargando...</div>;
  }

  return (
    <Router>
      {/* Renderizar NavigationBar solo si el usuario no es admin (rol 1) */}
      {!(isLoggedIn && userRole === 1) && (
        <NavigationBar isLoggedIn={isLoggedIn} userRole={userRole} onLogout={handleLogout} />
      )}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to={userRole === 1 ? '/dashboard' : '/'} replace />
            ) : (
              <Login setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />
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
          path="/pagos"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Pagos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gestionarcausas"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <GestionarCausas />
            </ProtectedRoute>
          }
        />
       <Route path="/crearcausa" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <CreateCausa />
          </ProtectedRoute>
        }
        />
        <Route path="/vercausas" element={<VerCausas />} />
        <Route path="/detallecausa/:id" element={<CausaDetalle />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/vercausacategoria" element={<Causasfiltro />} />
        <Route path="/acercade" element={<Acercade />} />
        <Route
          path="/perfil"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Usuario />
            </ProtectedRoute>
          }
        />
        <Route
          path="/informe"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Informe />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vermiscausas"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <MisCausas />
            </ProtectedRoute>
          }
        />
        <Route
          path="/viewcausa"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <ViewCausa />
            </ProtectedRoute>
          }
        />
        <Route
          path="/paginadonar/:idCausa"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <DonarPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

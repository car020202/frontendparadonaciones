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

import ProtectedRoute from './ProtectedRoute'; // Asegúrate de que la ruta sea correcta
import GestionarCausas from './admin/stadisticas/GestionarCausas';
import Acercade from './inicio/Acercade';


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
        <Route
          path="/crearcausa"
          element={
            /* quite la ruta protegida por que no me dejaba ver el componente */

            <CreateCausa />

          }
        />
        <Route
          path="/vercausas"
          element={
            /* esta no debe estar protegida por que es para todo publico */

            <VerCausas />

          }
        />
        <Route
          path="/acercade"
          element={
            /* esta no debe estar protegida por que es para todo publico */

            <Acercade />

          }
        />


        <Route
          path="/perfil"
          element={
            /* esta si la pude proteger no da error */
            <ProtectedRoute isLoggedIn={isLoggedIn}>

              <Usuario />
            </ProtectedRoute>
          }
        />
        <Route
          path="/informe"
          element={
            /* esta si la pude proteger no da error */
            <ProtectedRoute isLoggedIn={isLoggedIn}>

              <Informe />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vermiscausas"
          element={
            
            //ver mi lista de cusas 
            <MisCausas />

          }
        />
        <Route
          path="/viewcausa"
          element={
            
            //ver la causa cuando ya este finalizada
            <ViewCausa />

          }
        />

        <Route
          path="/paginadonar"
          element={
            /* esta al igual que crear causa debe estar protegida pero no me cargaba cuando la protegi asi que la deje tal cual */
            <DonarPage />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

 
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        {/* Página de inicio, accesible para todos */}
        <Route path="/" element={<Home />} />
        
        {/* Ruta de login */}
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/" replace /> 
            ) : (
              <Login setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />
        
        {/* Ruta de registro */}
        <Route
          path="/register"
          element={
            isLoggedIn ? (
              <Navigate to="/" replace /> 
            ) : (
              <Register />
            )
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
        
        <Route path="/donaciones" element={<Donaciones />}/>

        <Route path="/crearcausa" element={<CreateCausa />}/>

        <Route path="/vercausas" element={<VerCausas />}/>

      </Routes>
    </Router>
  );
}

export default App;

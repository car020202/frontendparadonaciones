import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavigationBar from './navbar/navbar';
import Home from './inicio/inicio';
import Login from './login/login';
import Register from './register/register';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

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
      <NavigationBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
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
      </Routes>
    </Router>
  );
}

export default App;

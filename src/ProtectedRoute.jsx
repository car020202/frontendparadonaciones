// src/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    // Si el usuario no está logueado, redirige a la página de login
    return <Navigate to="/login" replace />;
  }

  // Si está logueado, renderiza el componente hijo (ruta protegida)
  return children;
};

export default ProtectedRoute;

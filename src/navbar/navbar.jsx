import React from 'react';
import './navbar.css';
import logo from '../assets/logo.webp';

const Navbar = ({ isLoggedIn, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <ul className="navbar-links">
        <li><a href="#inicio">Inicio</a></li>
        <li><a href="#organizaciones">Organizaciones</a></li>
        <li><a href="#campanas">Campañas</a></li>
        <li><a href="#sobrenosotros">Sobre nosotros</a></li>
        {/* Condicional: si está logueado, mostramos "Cerrar sesión"; si no, mostramos "Login" */}
        {isLoggedIn ? (
          <li><a href="#logout" onClick={onLogout}>Cerrar sesión</a></li>
        ) : (
          <li><a href="#login">Login</a></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

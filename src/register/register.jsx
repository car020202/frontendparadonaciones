import React from 'react';
import './registercss/register.css';
import logo from '../assets/logo.webp'; 
import Navbar from '../navbar/navbar';

const Register = () => {
  return (
    <>
    <Navbar/>
    <div className="register">
      <div className="register-container">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <form className="register-form">
          <h2>Registrarse</h2>
          <input type="text" placeholder="Nombre completo" className="register-input" />
          <input type="email" placeholder="Correo Electrónico" className="register-input" />
          <input type="password" placeholder="Contraseña" className="register-input" />
          <input type="password" placeholder="Confirmar Contraseña" className="register-input" />
          <button type="submit" className="register-button">Registrarse</button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Register;

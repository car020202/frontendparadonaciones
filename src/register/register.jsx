import React, { useState } from 'react';
import './registercss/register.css';
import logo from '../assets/logo.webp';
import Navbar from '../navbar/navbar';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
     
      <div className="register">
        <div className="register-container">
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo" />
          </div>
          <form className="register-form">
            <h2>Registrarse</h2>
            <div className="input-row">
              <input
                type="text"
                placeholder="Nombre completo"
                className="register-input"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
              />
              <input
                type="email"
                placeholder="Correo Electrónico"
                className="register-input"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="input-row">
              <input
                type="password"
                placeholder="Contraseña"
                className="register-input"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="Confirmar Contraseña"
                className="register-input"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="register-button">Registrarse</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;

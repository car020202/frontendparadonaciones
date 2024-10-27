import React from 'react';
import './logincss/login.css';
import logo from '../assets/logo.webp'; 
import backgroundImage from '../assets/background.jpg'; // Importa la imagen de fondo (aunque no la uses aquí)
import Navbar from '../navbar/navbar';

const Login = () => {
  return (
    <>
    <Navbar/>
    <div className="login">
      <div className="login-container">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <form className="login-form">
          <h2>Login</h2>
          <input type="email" placeholder="Correo Electrónico" className="login-input" />
          <input type="password" placeholder="Contraseña" className="login-input" />
          <button type="submit" className="login-button">Iniciar</button>
          <button type="submit" className="registerL-button">Registrarse</button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Login;

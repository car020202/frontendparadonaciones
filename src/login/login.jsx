import React, { useState } from 'react';
import axios from 'axios';
import './logincss/login.css';
import logo from '../assets/logo.webp'; 
import Navbar from '../navbar/navbar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/users/login', { email, password });
      localStorage.setItem('token', response.data.token); 
      alert('Inicio de sesión exitoso');
    } catch (err) {
      setError('Credenciales inválidas');
    }
  };

  return (
    <>
      <Navbar />
      <div className="login">
        <div className="login-container">
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo" />
          </div>
          <form className="login-form" onSubmit={handleLogin}>
            <h2>Login</h2>
            <input 
              type="email" 
              placeholder="Correo Electrónico" 
              className="login-input" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
              type="password" 
              placeholder="Contraseña" 
              className="login-input" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
            <button type="submit" className="login-button">Iniciar</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

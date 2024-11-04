import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './logincss/login.css';
import logo from '../assets/logo.webp';
import Navbar from '../navbar/navbar';

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/users/login', { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', user.roles);
      setIsLoggedIn(true);

      alert('Inicio de sesión exitoso');

      if (user.roles === 1) {
        navigate('/dashboard');
      } else if (user.roles === 2) {
        navigate('/');
      }
      window.location.reload();
    } catch (err) {
      setError('Credenciales inválidas');
    }
  };

  // Define la función handleRegisterRedirect
  const handleRegisterRedirect = () => {
    navigate('/register');
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
            <div className="button-container">
              <button type="submit" className="login-button">Iniciar</button>
              <button type="button" className="registerL-button" onClick={handleRegisterRedirect}>Registrar</button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

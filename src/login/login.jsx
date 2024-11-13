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
  const [successMessage, setSuccessMessage] = useState(''); // Estado para el mensaje de éxito
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/users/login', { email, password });
      const { token, user } = response.data;
      
      // Guardar solo el token sin el prefijo "Bearer "
      const cleanToken = token.replace("Bearer ", "");
      localStorage.setItem('token', cleanToken);
      localStorage.setItem('role', user.roles);
      setIsLoggedIn(true);

      // Mostrar mensaje de éxito en lugar de alert
      setSuccessMessage('Inicio de sesión exitoso');
      setError('');
      
      // Redirigir después de un breve retardo
      setTimeout(() => {
        if (user.roles === 1) {
          navigate('/dashboard');
        } else if (user.roles === 2) {
          navigate('/');
        }
      }, 1000); // Redirigir después de 1 segundo
    } catch (err) {
      setError('Credenciales inválidas');
      setSuccessMessage('');
    }
  };

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
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

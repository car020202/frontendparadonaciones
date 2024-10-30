import React, { useState } from 'react';
import axios from 'axios';
import './registercss/register.css';
import logo from '../assets/logo.webp';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/api/users/register', {
        nombre,
        email,
        password,
      }, { timeout: 5000 });

      setSuccess('Registro exitoso. Por favor, verifica tu correo electrónico.');
      setNombre('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else if (err.code === 'ECONNABORTED') {
        setError('El tiempo de espera de la solicitud ha expirado. Intente nuevamente.');
      } else {
        setError('Hubo un problema con el registro. Por favor, inténtelo más tarde.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register">
      <div className="register-container">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <form className="register-form" onSubmit={handleRegister}>
          <h2>Registrarse</h2>
          <div className="input-row">
            <input 
              type="text" 
              placeholder="Nombre completo" 
              className="register-input register-input-half" 
              value={nombre} 
              onChange={(e) => setNombre(e.target.value)} 
              required
            />
            <input 
              type="email" 
              placeholder="Correo Electrónico" 
              className="register-input register-input-half" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
          </div>
          <div className="input-row">
            <input 
              type="password" 
              placeholder="Contraseña" 
              className="register-input register-input-half" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
            <input 
              type="password" 
              placeholder="Confirmar Contraseña" 
              className="register-input register-input-half" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required
            />
          </div>
          <button type="submit" className="register-button" disabled={loading}>
            {loading ? "Registrando..." : "Registrarse"}
          </button>
          {error && <p className="message error-message">{error}</p>}
          {success && <p className="message success-message">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;

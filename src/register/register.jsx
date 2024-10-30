import React, { useState } from 'react';
import axios from 'axios';
import './registercss/register.css';
import logo from '../assets/logo.webp'; 
import Navbar from '../navbar/navbar';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/users/register', {
        nombre,
        email,
        password,
      });
      setSuccess('Registro exitoso. Por favor, verifica tu correo electrónico.');
    } catch (err) {
      setError('Hubo un problema con el registro');
    }
  };

  return (
    <>
      <Navbar />
      <div className="register">
        <div className="register-container">
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo" />
          </div>
          <form className="register-form" onSubmit={handleRegister}>
            <h2>Registrarse</h2>
            <input 
              type="text" 
              placeholder="Nombre completo" 
              className="register-input" 
              value={nombre} 
              onChange={(e) => setNombre(e.target.value)} 
            />
            <input 
              type="email" 
              placeholder="Correo Electrónico" 
              className="register-input" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
              type="password" 
              placeholder="Contraseña" 
              className="register-input" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
            <input 
              type="password" 
              placeholder="Confirmar Contraseña" 
              className="register-input" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
            />
            <button type="submit" className="register-button">Registrarse</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;

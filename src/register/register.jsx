import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importamos SweetAlert2
import './registercss/register.css';
import logo from '../assets/logo.webp';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      Swal.fire({
        title: 'Error',
        text: 'Las contraseñas no coinciden.',
        icon: 'error',
        confirmButtonText: 'Cerrar',
      });
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        'http://localhost:3000/api/users/register',
        {
          nombre,
          email,
          password,
        },
        { timeout: 5000 }
      );

      // Alerta de éxito
      Swal.fire({
        title: 'Registro exitoso',
        text: 'Por favor, verifica tu correo electrónico para activar tu cuenta.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        customClass: {
          confirmButton: 'custom-swal-button',
        },
        didOpen: () => {
          const confirmButton = Swal.getConfirmButton();
          confirmButton.style.backgroundColor = '#007B8A'; // Color del botón
          confirmButton.style.color = '#fff';
          confirmButton.style.border = 'none';
          confirmButton.style.borderRadius = '5px';
          confirmButton.style.padding = '10px 20px';
          confirmButton.style.cursor = 'pointer';
        },
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/login'; // Redirigir al inicio
        }
      });

      // Limpiar el formulario
      setNombre('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      let errorMessage = 'Hubo un problema con el registro. Por favor, inténtelo más tarde.';
      if (err.response && err.response.data && err.response.data.error) {
        errorMessage = err.response.data.error;
      } else if (err.code === 'ECONNABORTED') {
        errorMessage = 'El tiempo de espera de la solicitud ha expirado. Intente nuevamente.';
      }

      // Alerta de error
      Swal.fire({
        title: 'Error',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Cerrar',
        customClass: {
          confirmButton: 'custom-swal-button',
        },
        didOpen: () => {
          const confirmButton = Swal.getConfirmButton();
          confirmButton.style.backgroundColor = '#dc3545'; // Rojo para el error
          confirmButton.style.color = '#fff';
          confirmButton.style.border = 'none';
          confirmButton.style.borderRadius = '5px';
          confirmButton.style.padding = '10px 20px';
          confirmButton.style.cursor = 'pointer';
        },
      });
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
        </form>
      </div>
    </div>
  );
};

export default Register;

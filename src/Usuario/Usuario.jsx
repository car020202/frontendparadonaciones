import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import Navbar from '../navbar/navbar';
import Footer from '../Footer/Footer';
import './usuario.css';
import logo from '../assets/logo.webp';

const Usuario = () => {
  const [username, setUsername] = useState('calo');
  const [email, setEmail] = useState('calo@gmail.com');
  const [password, setPassword] = useState('1234');

  useEffect(() => {
    // Obtener los datos del usuario desde el almacenamiento local
    const storedUsername = localStorage.getItem('username');
    const storedEmail = localStorage.getItem('email');
    if (storedUsername) setUsername(storedUsername);
    if (storedEmail) setEmail(storedEmail);
  }, []);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSaveChanges = () => {
    // Guardar los cambios realizados por el usuario
    localStorage.setItem('username', username);
    // Aquí podrías agregar lógica adicional para actualizar el perfil en el backend
    alert('Perfil actualizado correctamente');
  };

  const handleDeleteAccount = () => {
    // Eliminar la cuenta del usuario
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    // Aquí podrías agregar lógica adicional para eliminar la cuenta en el backend
    alert('Cuenta eliminada correctamente');
    window.location.reload();
  };

  return (
    <>
    <Navbar/>
    <div className="user-profile-background">
      <Container className="user-profile-container">
        
        <div className="profile-image-container">
          <img src={logo} alt="Usuario" className="profile-image" />
        </div>
        <h2 className="profile-title">Perfil de Usuario</h2>
        <Card className="user-profile-card">
          <Card.Body>
            <Form>
              
              <Form.Group controlId="formUsername" className="mb-3">
                <Form.Label><strong>Nombre:</strong></Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder="Ingresa tu nuevo Nombre"
                />
              </Form.Group>

              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label><strong>Correo Electrónico:</strong></Form.Label>
                <Form.Control type="email" value={email} readOnly />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label><strong>Contraseña:</strong></Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Ingresa una nueva contraseña"
                />
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
        <Button variant="primary" onClick={handleSaveChanges} className="save-button">
          Guardar Cambios
        </Button>
        <Button variant="danger" onClick={handleDeleteAccount} className="delete-button">
          Eliminar Cuenta
        </Button>
      </Container>
    </div>
    <Footer/>
    </>
  );
};

export default Usuario;
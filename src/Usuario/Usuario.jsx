import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { FaHandHoldingHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../navbar/navbar';
import Footer from '../Footer/Footer';
import './Usuario.css';
import logo from '../assets/logo.webp';

const Usuario = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('****'); // Contraseña oculta por defecto
  const [donations, setDonations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        // Obtener perfil del usuario
        const userResponse = await axios.get('http://localhost:3000/api/users/profile', { headers });
        const userData = userResponse.data;
        setUsername(userData.nombre);
        setEmail(userData.email);

        // Obtener las donaciones del usuario
        const donationsResponse = await axios.get('http://localhost:3000/api/donaciones/usuario', { headers });
        setDonations(donationsResponse.data);
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
        alert('Hubo un problema al cargar el perfil y las donaciones.');
      }
    };

    fetchUserData();
  }, []);

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSaveChanges = () => {
    localStorage.setItem('username', username);
    alert('Perfil actualizado correctamente');
  };

  const handleDeleteAccount = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    alert('Cuenta eliminada correctamente');
    window.location.reload();
  };

  const handleViewMisCausas = () => navigate('/vermiscausas');

  return (
    <>
      <div className="user-profile-background">
        <Container className="user-profile-container d-flex">
          <div style={{ flex: 1 }}>
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
            <Button variant="primary" onClick={handleViewMisCausas} className="view-causas-button">
              Ver Mis Causas
            </Button>
          </div>

          <div style={{ flex: 1, marginLeft: '10px', textAlign: 'center' }}>
            <FaHandHoldingHeart className="mb-2" size={160} />
            <h2 className="donations-title">Tus Donaciones</h2>
            <div style={{ maxHeight: '332px', overflowY: 'auto', padding: '10px' }}>
              {donations.map((donation) => (
                <div
                  key={donation.id}
                  style={{
                    backgroundColor: '#ffffff',
                    width: '100%',
                    padding: '15px',
                    borderRadius: '10px',
                    border: '2px solid #007B8A', // Borde del mismo color
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    marginBottom: '10px',
                    display: 'flex', // Ajustar a lo largo
                    gap: '20px',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ flex: '1' }}>
                    <h5>Tipo de Donación:</h5>
                    <p>{donation.tipoDonacion}</p>
                  </div>
                  <div style={{ flex: '1' }}>
                    <h5>Descripción:</h5>
                    <p>{donation.descripcion || 'Sin descripción'}</p>
                  </div>
                  <div style={{ flex: '1' }}>
                    <h5>Causa:</h5>
                    <p>{donation.causaNombre || 'Causa no especificada'}</p>
                  </div>
                  {donation.monto && (
                    <div style={{ flex: '1' }}>
                      <h5>Monto:</h5>
                      <p>${donation.monto}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Usuario;

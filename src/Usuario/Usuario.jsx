import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, ProgressBar, ListGroup } from 'react-bootstrap';
import { FaHandHoldingHeart } from 'react-icons/fa';
import Navbar from '../navbar/navbar';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';
import './usuario.css';
import logo from '../assets/logo.webp';

const Usuario = () => {
  const [username, setUsername] = useState('calo');
  const [email, setEmail] = useState('calo@gmail.com');
  const [password, setPassword] = useState('1234');
  const [donations, setDonations] = useState([
    { id: 1, name: 'Donación A', status: 'En curso', progress: 60 },
    { id: 2, name: 'Donación B', status: 'Finalizada', progress: 100 },
    { id: 3, name: 'Donación C', status: 'En curso', progress: 45 }
  ]);

  const navigate = useNavigate();

  useEffect(() => {
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

  const handleViewMisCausas = () => {
    navigate('/vermiscausas');
  };

  return (
    <>
      <Navbar />
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
            <Button variant="primary" onClick={handleSaveChanges} className="save-button">
              Guardar Cambios
            </Button>
            <Button variant="danger" onClick={handleDeleteAccount} className="delete-button">
              Eliminar Cuenta
            </Button>
            <Button variant="primary" onClick={handleViewMisCausas} className="view-causas-button">
              Ver Mis Causas
            </Button>
          </div>

          <div style={{ flex: 1, marginLeft: '10px', textAlign: 'center' }}>
            <FaHandHoldingHeart className="mb-2" size={160} />
            <h2 className="donations-title">Tus Donaciones</h2>
            <ListGroup>
              {donations.map(donation => (
                <ListGroup.Item key={donation.id} className="donation-item">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5>{donation.name}</h5>
                      <p>{donation.status === 'Finalizada' ? 'Finalizado' : 'En curso'}</p>
                    </div>
                    {donation.status === 'En curso' && (
                      <div style={{ height: '8px', width: '75%', backgroundColor: '#e0e0e0', borderRadius: '5px', margin: '10px 0' }}>
                        <div style={{ width: `${donation.progress}%`, height: '100%', backgroundColor: '#00c853', borderRadius: '5px' }}></div>
                      </div>
                    )}
                    {donation.status === 'Finalizada' && (
                      <Button variant="info" className="report-button" onClick={() => navigate('/informe')}>Ver Informe</Button>
                    )}
                  </div>
                  
                </ListGroup.Item>
              ))}
            </ListGroup>

            
          </div>
          

        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Usuario;

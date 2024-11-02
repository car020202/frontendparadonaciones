import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.webp';
import './navbar.css';

const NavigationBar = ({ onLogout }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Verificar el estado de autenticación al cargar el componente
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Actualiza el estado basado en la existencia del token
  }, []);

  const handleLogoutClick = () => {
    localStorage.removeItem('token'); // Elimina el token del almacenamiento local
    setIsLoggedIn(false);
    onLogout();
    
    // Recargar la página automáticamente para limpiar el estado y redirigir al login
    window.location.reload();
  };

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-logo">
          <img
            src={logo}
            width="50"
            height="50"
            className="d-inline-block align-top rounded-circle"
            alt="Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-toggle" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto navbar-links">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/organizaciones">Organizaciones</Nav.Link>
            <Nav.Link as={Link} to="/campanas">Campañas</Nav.Link>
            <Nav.Link as={Link} to="/sobrenosotros">Sobre Nosotros</Nav.Link>
            {isLoggedIn ? (
              <Nav.Link as={Link} onClick={handleLogoutClick} className="logout-link">Cerrar sesión</Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/login" className="login-link">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
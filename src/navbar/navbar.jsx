import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.webp';
import './navbar.css';

const NavigationBar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate('/login'); // Redirige al usuario a la página de login
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
              <Nav.Link as="button" onClick={handleLogoutClick}>Cerrar sesión</Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;

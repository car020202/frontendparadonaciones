import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import logo from '../assets/logo.webp';
import './navbar.css';

const NavigationBar = ({ isLoggedIn, onLogout }) => {
  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand href="#home" className="navbar-logo">
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
            <Nav.Link href="#inicio">Inicio</Nav.Link>
            <Nav.Link href="#organizaciones">Organizaciones</Nav.Link>
            <Nav.Link href="#campanas">Campañas</Nav.Link>
            <Nav.Link href="#sobrenosotros">Sobre Nosotros</Nav.Link>
            {isLoggedIn ? (
              <Nav.Link href="#logout" onClick={onLogout}>Cerrar sesión</Nav.Link>
            ) : (
              <Nav.Link href="#login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;

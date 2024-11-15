import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import logo from '../assets/logo.webp';
import './navbar.css';

const NavigationBar = ({ isLoggedIn, userRole, onLogout }) => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  // Verificar el nombre de usuario al cargar el componente
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, [isLoggedIn]);

  const handleLogoutClick = () => {
    localStorage.removeItem('token'); // Elimina el token del almacenamiento local
    localStorage.removeItem('username'); // Elimina el nombre de usuario del almacenamiento local
    localStorage.removeItem('role'); // Elimina el rol de usuario del almacenamiento local
    onLogout();
    
    // Redirigir al login después de cerrar sesión
    navigate('/login');
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
            <NavDropdown title="Donar" id="donar-dropdown" className="donar-dropdown">
              <NavDropdown.Item as={Link} to="/categorias">Categorias</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/vercausas">Ver Causas</Nav.Link>
            <Nav.Link as={Link} to="/acercade">Sobre Nosotros</Nav.Link>
            {isLoggedIn ? (
              <>
                {userRole === 1 && (
                  <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                )}
                <Nav.Link as={Link} onClick={handleLogoutClick} className="logout-link">Cerrar sesión</Nav.Link>
                <Nav.Link as={Link} to="/perfil" className="user-info-link">
                  <FaUserCircle size={24} className="user-icon" /> {username}
                </Nav.Link>
              </>
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

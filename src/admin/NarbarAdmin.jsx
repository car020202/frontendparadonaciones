import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.webp'; 

const SidebarContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 250px;
  background-color: #007B8A;
  color: #fff;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  z-index: 1000; /* Asegura que el sidebar esté por encima de otros elementos */
  transform: translateX(0); /* Siempre visible en modo PC */
  transition: transform 0.3s ease-in-out;

  @media (max-width: 768px) {
    width: 200px;
    transform: translateX(${props => (props.isOpen ? '0' : '-100%')});
  }
`;

const LogoContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
  position: relative;

  img {
    max-width: 100%;
    height: auto;
  }
`;

const SidebarLink = styled(Nav.Link)`
  color: #fff;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  font-family: 'Arial', sans-serif; /* Aplica el tipo de letra */
  font-weight: bold;
  text-transform: uppercase;
  transition: color 0.3s ease;

  &:hover {
    color: #FFD700; /* Cambia a amarillo al hacer hover */
  }

  i {
    margin-right: 10px;
  }
`;

const ToggleButton = styled.button`
  position: fixed;
  top: 10px;
  left: 10px; /* Mueve el botón hacia un lugar que no interfiera con el logo */
  background-color: #007B8A;
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 1100;

  @media (min-width: 769px) {
    display: none; /* Oculta el botón en modo PC */
  }
`;

const ContentContainer = styled.div`
  margin-left: 250px; /* Ajusta el margen para que el contenido no se superponga con la barra lateral */
  padding: 20px;
  transition: margin-left 0.3s ease-in-out;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const RightSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Elimina el token o cualquier dato de autenticación
    localStorage.removeItem('token');
    navigate('/login'); // Redirige al usuario a la página de login
  };

  return (
    <>
      <ToggleButton onClick={toggleSidebar}>
        {isOpen ? 'Cerrar' : 'Menú'}
      </ToggleButton>
      <SidebarContainer isOpen={isOpen}>
        <LogoContainer>
          <img src={logo} alt="Logo" />
        </LogoContainer>
        <Nav className="flex-column">
          <Nav.Item>
            <SidebarLink href="#donaciones">
              <i className="fas fa-chart-bar"></i> Donaciones
            </SidebarLink>
          </Nav.Item>
          <Nav.Item>
            <SidebarLink href="#usuarios-activos">
              <i className="fas fa-users"></i> Usuarios Activos
            </SidebarLink>
          </Nav.Item>
          <Nav.Item>
            <SidebarLink href="#organizaciones-activas">
              <i className="fas fa-building"></i> Organizaciones Activas
            </SidebarLink>
          </Nav.Item>
          <Nav.Item>
            <SidebarLink href="#pagos-realizados">
              <i className="fas fa-wallet"></i> Pagos Realizados
            </SidebarLink>
          </Nav.Item>
          <hr />
          <Nav.Item>
            <SidebarLink href="#gestionar-usuarios">
              <i className="fas fa-user-cog"></i> Gestionar Usuarios
            </SidebarLink>
          </Nav.Item>
          <Nav.Item>
            <SidebarLink href="#gestionar-organizaciones">
              <i className="fas fa-building"></i> Gestionar Organizaciones
            </SidebarLink>
          </Nav.Item>
          <Nav.Item>
            <SidebarLink href="#gestionar-roles">
              <i className="fas fa-user-shield"></i> Gestionar Roles
            </SidebarLink>
          </Nav.Item>
          <Nav.Item>
            <SidebarLink href="#gestionar-causas">
              <i className="fas fa-hand-holding-heart"></i> Gestionar Causas
            </SidebarLink>
          </Nav.Item>
          <Nav.Item>
            <SidebarLink onClick={handleLogout} href="#">
              <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
            </SidebarLink>
          </Nav.Item>
        </Nav>
      </SidebarContainer>
    </>
  );
};

export default RightSidebar;

export { ContentContainer };

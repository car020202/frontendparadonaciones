import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
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
  z-index: 1000;
  transform: translateX(0);
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

const SidebarLink = styled(Link)`
  color: #fff !important;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  text-transform: uppercase;
  transition: color 0.3s ease;
  text-decoration: none;

  &:hover {
    color: #FFD700 !important;
  }

  i {
    margin-right: 10px;
  }
`;

const ToggleButton = styled.button`
  position: fixed;
  top: 10px;
  left: 10px;
  background-color: #007B8A;
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 1100;

  @media (min-width: 769px) {
    display: none;
  }
`;

const RightSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    window.location.reload();
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
            <SidebarLink to="/dashboard">
              <i className="fas fa-chart-bar"></i> Menu
            </SidebarLink>
          </Nav.Item>
          <Nav.Item>
            <SidebarLink to="/donaciones">
              <i className="fas fa-chart-bar"></i> Donaciones
            </SidebarLink>
          </Nav.Item>
          <Nav.Item>
            <SidebarLink to="/pagos">
              <i className="fas fa-wallet"></i> Pagos Realizados
            </SidebarLink>
          </Nav.Item>
          <hr />
          <Nav.Item>
            <SidebarLink to="/gestionarcausas">
              <i className="fas fa-hand-holding-heart"></i> Gestionar Causas
            </SidebarLink>
          </Nav.Item>
          <Nav.Item>
            <SidebarLink onClick={handleLogout} to="#">
              <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
            </SidebarLink>
          </Nav.Item>
        </Nav>
      </SidebarContainer>
    </>
  );
};

export default RightSidebar;



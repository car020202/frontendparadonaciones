import React from 'react';
import './Dashboard.css'; 
import { FaUsers, FaChartBar, FaBuilding, FaHandHoldingHeart, FaWallet, FaCogs, FaUserShield, FaTasks, FaHandsHelping } from 'react-icons/fa';
import Footer from '../Footer/Footer';
import NavbarAdmin from './NarbarAdmin';

const AdminPanel = () => {
  return (
    <>
    <NavbarAdmin/>
    <div className="admin-panel">
      <h1 className="panel-title">Panel de Administración</h1>
      
      {/* Dashboard con estadísticas */}
      <section className="dashboard">
        <div className="stat-card">
          <FaChartBar className="stat-icon" />
          <div className="stat-info">
            <h2>Donaciones</h2>
            <p>500</p>
          </div>
        </div>
        <div className="stat-card">
          <FaUsers className="stat-icon" />
          <div className="stat-info">
            <h2>Usuarios Activos</h2>
            <p>120</p>
          </div>
        </div>
        <div className="stat-card">
          <FaBuilding className="stat-icon" />
          <div className="stat-info">
            <h2>Organizaciones Activas</h2>
            <p>35</p>
          </div>
        </div>
        <div className="stat-card">
          <FaWallet className="stat-icon" />
          <div className="stat-info">
            <h2>Pagos Realizados</h2>
            <p>300</p>
          </div>
        </div>
      </section>
      
      {/* Opciones de gestión */}
      <section className="management-section">
        <h2 className="management-title">Gestión de Recursos</h2>
        <div className="management-options grid-two-columns">
          <div className="stat-card">
            <FaCogs className="stat-icon" />
            <div className="stat-info">
              <h2>Gestionar Usuarios</h2>
              <p>Configura y administra usuarios</p>
            </div>
          </div>
          <div className="stat-card">
            <FaUserShield className="stat-icon" />
            <div className="stat-info">
              <h2>Gestionar Roles</h2>
              <p>Administra los roles de acceso</p>
            </div>
          </div>
          <div className="stat-card">
            <FaBuilding className="stat-icon" />
            <div className="stat-info">
              <h2>Gestionar Organizaciones</h2>
              <p>Supervisa las organizaciones</p>
            </div>
          </div>
          <div className="stat-card">
            <FaHandsHelping className="stat-icon" />
            <div className="stat-info">
              <h2>Gestionar Causas</h2>
              <p>Gestiona las causas activas</p>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  
    </>
  );
};

export default AdminPanel;
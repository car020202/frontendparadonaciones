import React from 'react';
import './Dashboard.css';
import { FaUsers, FaChartBar, FaBuilding, FaHandHoldingHeart, FaWallet, FaCogs, FaUserShield, FaTasks, FaHandsHelping } from 'react-icons/fa';
import Footer from '../Footer/Footer';
import NavbarAdmin from './NarbarAdmin';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  return (
    <>
      <NavbarAdmin />
      <div className="admin-panel">
        <h1 className="panel-title">Panel de Administración</h1>

        {/* Dashboard con estadísticas */}
        <section className="dashboard">
          <Link to="/donaciones" className="stat-card">
            <FaChartBar className="stat-icon" />
            <div className="stat-info">
              <h2>Donaciones</h2>
              <p>500</p>
            </div>
          </Link>

          <Link to="/pagos" className="stat-card">
            <FaWallet className="stat-icon" />
            <div className="stat-info">
              <h2>Pagos Realizados</h2>
              <p>300</p>
            </div>
          </Link>
        </section>

        {/* Opciones de gestión */}
        <section className="management-section">
          <h2 className="management-title">Gestión de Recursos</h2>
          <div className="management-options grid-two-columns">
            <Link to="/gestionarcausas" className="stat-card">
              <FaHandsHelping className="stat-icon" />
              <div className="stat-info">
                <h2>Gestionar Causas</h2>
                <p>Gestiona las causas activas</p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default AdminPanel;

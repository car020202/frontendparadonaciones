import React, { useState, useEffect } from 'react';
import './Causascss/GestionarCausas.css'; 
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { FaHandHoldingHeart, FaChartPie, FaListAlt } from 'react-icons/fa';
import Navbar from '../NarbarAdmin';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const CausesStatistics = () => {
  const [causeStats, setCauseStats] = useState({
    activeCauses: 10,
    highImpactCauses: 5,
  });

  const [selectedDate, setSelectedDate] = useState('');
  const [filter, setFilter] = useState('all');
  const [causeList, setCauseList] = useState([
    { id: 1, name: 'Cause 1', type: 'active' },
    { id: 2, name: 'Cause 2', type: 'highImpact' },
    { id: 3, name: 'Cause 3', type: 'active' },
    { id: 4, name: 'Cause 4', type: 'highImpact' },
    { id: 5, name: 'Cause 5', type: 'active' },
  ]);

  useEffect(() => {
    if (selectedDate) {
      // Simulación de actualización de datos basados en la fecha seleccionada
      const updatedStats = {
        activeCauses: Math.floor(Math.random() * 20) + 1, // Simulación de datos dinámicos
        highImpactCauses: Math.floor(Math.random() * 10) + 1,
      };
      setCauseStats(updatedStats);
    }
  }, [selectedDate]);

  const filteredCauses = filter === 'all' 
    ? causeList 
    : causeList.filter(cause => (filter === 'active' ? cause.type === 'active' : cause.type === 'highImpact'));

  const countActiveCauses = causeList.filter(cause => cause.type === 'active').length;
  const countHighImpactCauses = causeList.filter(cause => cause.type === 'highImpact').length;

  const chartData = {
    labels: ['Causas Activas', 'Causas de Mayor Impacto'],
    datasets: [
      {
        label: 'Estadísticas de Causas',
        data: [countActiveCauses, countHighImpactCauses],
        backgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleFilterChange = (type) => {
    setFilter(type);
  };

  return (
    <>
      <Navbar />
      <div className='bodyadmin'>
        <div className="causes-statistics">
          <h1 className="title">Estadísticas de Causas</h1>
          <input 
            type="date" 
            className="date-picker" 
            value={selectedDate} 
            onChange={handleDateChange} 
          />
          <div style={{ width: '700px', margin: '0 auto' }}>
            <Bar data={chartData} options={{ indexAxis: 'y' }} />
          </div>
        </div>

        <div className="cause-list">
          <h2 className="title">Lista de Causas</h2>
          <ul>
            {filteredCauses.map(cause => (
              <li key={cause.id} className="cause-item">
                {cause.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="cards-container">
          <div className="stat-cardD" onClick={() => handleFilterChange('active')}>
            <FaHandHoldingHeart className="card-icon" />
            <div className="card-info">
              <h2 className="card-title">Causas Activas</h2>
              <p className="card-value">{countActiveCauses}</p>
            </div>
          </div>
          <div className="stat-cardD" onClick={() => handleFilterChange('highImpact')}>
            <FaChartPie className="card-icon" />
            <div className="card-info">
              <h2 className="card-title">Causas de Mayor Impacto</h2>
              <p className="card-value">{countHighImpactCauses}</p>
            </div>
          </div>
          <div className="stat-cardD" onClick={() => handleFilterChange('all')}>
            <FaListAlt className="card-icon" />
            <div className="card-info">
              <h2 className="card-title">Mostrar Todos</h2>
              <p className="card-value">{causeList.length}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CausesStatistics;
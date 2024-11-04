import React, { useState, useEffect } from 'react';
import './Donacionescss/Donaciones.css'; 
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { FaHandHoldingHeart, FaChartPie } from 'react-icons/fa';
import Navbar from '../NarbarAdmin';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const CausesStatistics = () => {
  const [causeStats, setCauseStats] = useState({
    activeCauses: 10,
    highImpactCauses: 5,
  });

  const [selectedDate, setSelectedDate] = useState('');

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

  const chartData = {
    labels: ['Causas Activas', 'Causas de Mayor Impacto'],
    datasets: [
      {
        label: 'Estadísticas de Causas',
        data: [causeStats.activeCauses, causeStats.highImpactCauses],
        backgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <>
      <Navbar />
      <div>
        <div className="causes-statistics">
        
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

        <div className="cards-container">
          <div className="stat-cardD">
            <FaHandHoldingHeart className="card-icon" />
            <div className="card-info">
              <h2 className="card-title">Causas Activas</h2>
              <p className="card-value">{causeStats.activeCauses}</p>
            </div>
          </div>
          <div className="stat-cardD">
            <FaChartPie className="card-icon" />
            <div className="card-info">
              <h2 className="card-title">Causas de Mayor Impacto</h2>
              <p className="card-value">{causeStats.highImpactCauses}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CausesStatistics;

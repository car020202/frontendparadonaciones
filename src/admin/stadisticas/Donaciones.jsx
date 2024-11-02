import React, { useState, useEffect } from 'react';
import './Donacionescss/Donaciones.css'; 
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { FaChartBar, FaUsers, FaDollarSign } from 'react-icons/fa';
import Footer from '../../Footer/Footer';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const DonationsStatistics = () => {
  const [donationStats, setDonationStats] = useState({
    totalDonations: 1000,
    numberOfDonors: 50,
    averageDonation: 20,
  });

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    if (selectedDate) {
      // Simulación de actualización de datos basados en la fecha seleccionada
      const updatedStats = {
        totalDonations: Math.floor(Math.random() * 2000), // Simulación de datos dinámicos
        numberOfDonors: Math.floor(Math.random() * 100),
        averageDonation: Math.floor(Math.random() * 50),
      };
      setDonationStats(updatedStats);
    }
  }, [selectedDate]);

  const originalLabels = ['Total Donado', 'Número de Donantes', 'Donación Promedio'];
  const originalData = [
    donationStats.totalDonations,
    donationStats.numberOfDonors,
    donationStats.averageDonation,
  ];
  const originalColors = ['#FF6384', '#36A2EB', '#FFCE56'];

  // Reordena los datos y colores en base a la selección
  const reorderedData = selectedIndex !== null
    ? [
        originalData[selectedIndex],
        ...originalData.filter((_, index) => index !== selectedIndex)
      ]
    : originalData;

  const reorderedLabels = selectedIndex !== null
    ? [
        originalLabels[selectedIndex],
        ...originalLabels.filter((_, index) => index !== selectedIndex)
      ]
    : originalLabels;

  const reorderedColors = selectedIndex !== null
    ? [
        '#007b8a',
        ...originalColors.filter((_, index) => index !== selectedIndex)
      ]
    : originalColors;

  const chartData = {
    labels: reorderedLabels,
    datasets: [
      {
        label: 'Estadísticas de Donaciones',
        data: reorderedData,
        backgroundColor: reorderedColors,
      },
    ],
  };

  const handleCardClick = (index) => {
    setSelectedIndex(index);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div>
      <div className="donations-statistics">
        <h1 className="title">Estadísticas de Donaciones</h1>
        <input 
          type="date" 
          className="date-picker" 
          value={selectedDate} 
          onChange={handleDateChange} 
        />
        <Bar data={chartData} />
      </div>

      {/* Cards con información adicional */}
      <div className="cards-container">
        <div className="stat-cardD" onClick={() => handleCardClick(0)}>
          <FaDollarSign className="card-icon" />
          <div className="card-info">
            <h2 className="card-title">Total Donado</h2>
            <p className="card-value">${donationStats.totalDonations}</p>
          </div>
        </div>
        <div className="stat-cardD" onClick={() => handleCardClick(1)}>
          <FaUsers className="card-icon" />
          <div className="card-info">
            <h2 className="card-title">Número de Donantes</h2>
            <p className="card-value">{donationStats.numberOfDonors}</p>
          </div>
        </div>
        <div className="stat-cardD" onClick={() => handleCardClick(2)}>
          <FaChartBar className="card-icon" />
          <div className="card-info">
            <h2 className="card-title">Donación Promedio</h2>
            <p className="card-value">${donationStats.averageDonation}</p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default DonationsStatistics;

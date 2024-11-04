import React, { useState, useEffect } from 'react';
import './Pagoscss/Pagos.css'; 
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { FaChartLine, FaReceipt, FaDollarSign } from 'react-icons/fa';
import Navbar from '../NarbarAdmin';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const PaymentsStatistics = () => {
  const [paymentStats, setPaymentStats] = useState({
    totalPayments: 5000,
    numberOfPayments: 150,
    averagePayment: 33,
  });

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    if (selectedDate) {
      // Simulación de actualización de datos basados en la fecha seleccionada
      const updatedStats = {
        totalPayments: Math.floor(Math.random() * 10000), // Simulación de datos dinámicos
        numberOfPayments: Math.floor(Math.random() * 300),
        averagePayment: Math.floor(Math.random() * 100),
      };
      setPaymentStats(updatedStats);
    }
  }, [selectedDate]);

  const originalLabels = ['Total Pagado', 'Número de Pagos', 'Pago Promedio'];
  const originalData = [
    paymentStats.totalPayments,
    paymentStats.numberOfPayments,
    paymentStats.averagePayment,
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
        label: 'Estadísticas de Pagos',
        data: reorderedData,
        backgroundColor: reorderedColors,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const handleCardClick = (index) => {
    setSelectedIndex(index);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <>
    <Navbar/>
    <div className='bodyadmin'>
      <div className="payments-statistics">
        <h1 className="title">Estadísticas de Pagos</h1>
        <input 
          type="date" 
          className="date-picker" 
          value={selectedDate} 
          onChange={handleDateChange} 
        />
        <div style={{ height: '400px', width: '1000px', margin: '0 auto' }}>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      <div className="cards-container">
        <div className="stat-cardP" onClick={() => handleCardClick(0)} style={{ backgroundColor: '#007b8a', color: '#FFFFFF', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <FaDollarSign className="card-icon" />
          <div className="card-info">
            <h2 className="card-title">Total Pagado</h2>
            <p className="card-value">${paymentStats.totalPayments}</p>
          </div>
        </div>
        <div className="stat-cardP" onClick={() => handleCardClick(1)} style={{ backgroundColor: '#007b8a', color: '#FFFFFF', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <FaReceipt className="card-icon" />
          <div className="card-info">
            <h2 className="card-title">Número de Pagos</h2>
            <p className="card-value">{paymentStats.numberOfPayments}</p>
          </div>
        </div>
        <div className="stat-cardP" onClick={() => handleCardClick(2)} style={{ backgroundColor: '#007b8a', color: '#FFFFFF', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <FaChartLine className="card-icon" />
          <div className="card-info">
            <h2 className="card-title">Pago Promedio</h2>
            <p className="card-value">${paymentStats.averagePayment}</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default PaymentsStatistics;
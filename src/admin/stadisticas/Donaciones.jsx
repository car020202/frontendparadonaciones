import React, { useState, useEffect } from 'react';
import './Donacionescss/Donaciones.css'; 
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { FaChartBar, FaUsers, FaDollarSign } from 'react-icons/fa';
import Navbar from '../NarbarAdmin';
import axios from 'axios';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const DonationsStatistics = () => {
  const [allDonations, setAllDonations] = useState([]); // Almacena todas las donaciones
  const [totalDonations, setTotalDonations] = useState(0);
  const [numberOfDonors, setNumberOfDonors] = useState(0);
  const [averageDonation, setAverageDonation] = useState(0);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const fetchDonationsStats = async () => {
      try {
        setLoading(true);
        setErrorMessage('');
        const endpoint = `http://localhost:3000/api/donaciones/estadisticas`;

        console.log('Solicitando datos del endpoint:', endpoint); // Depuración
        const response = await axios.get(endpoint);
        console.log('Respuesta de la API:', response.data);

        setAllDonations(response.data); // Guardar todas las donaciones
        processDonations(response.data, selectedDate); // Filtrar por fecha si aplica
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener estadísticas de donaciones:', error);
        setErrorMessage('No se pudieron cargar las estadísticas de donaciones.');
        setLoading(false);
      }
    };

    fetchDonationsStats();
  }, []);

  useEffect(() => {
    // Filtrar las donaciones cada vez que cambia la fecha seleccionada
    processDonations(allDonations, selectedDate);
  }, [selectedDate, allDonations]);

  const processDonations = (donations, date) => {
    const filteredDonations = date
      ? donations.filter(
          (donacion) =>
            new Date(donacion.fechaDonacion).toISOString().split('T')[0] === date
        )
      : donations;

    console.log('Donaciones filtradas:', filteredDonations);

    const total = filteredDonations.reduce((sum, donacion) => sum + donacion.monto, 0); // Sumar todos los montos
    const uniqueDonors = new Set(filteredDonations.map((donacion) => donacion.idUsuario)); // Usuarios únicos
    const promedio = filteredDonations.length > 0 ? total / filteredDonations.length : 0; // Promedio del monto donado

    // Actualizar los estados
    setTotalDonations(total);
    setNumberOfDonors(uniqueDonors.size);
    setAverageDonation(promedio.toFixed(2));
  };

  const handleDateChange = (event) => {
    const date = event.target.value;
    console.log('Fecha seleccionada:', date); // Depuración
    setSelectedDate(date);
  };

  const chartData = {
    labels: ['Total Donado', 'Número de Donantes', 'Donación Promedio'],
    datasets: [
      {
        label: 'Estadísticas de Donaciones',
        data: [totalDonations, numberOfDonors, averageDonation],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Navbar />
      <div className="bodyadmin">
        <div className="donations-statistics">
          <h1 className="title">Estadísticas de Donaciones</h1>
          <input
            type="date"
            className="date-picker"
            value={selectedDate}
            onChange={handleDateChange}
          />
          {loading ? (
            <p style={{ textAlign: 'center', fontSize: '18px' }}>Cargando estadísticas...</p>
          ) : errorMessage ? (
            <p style={{ textAlign: 'center', color: 'red', fontSize: '18px' }}>{errorMessage}</p>
          ) : (
            <>
              <div className="chart-container" style={{ width: '600px', margin: '0 auto' }}>
                <Bar data={chartData} />
              </div>
              <div className="cards-container" style={{ marginTop: '20px' }}>
                <div className="stat-cardD">
                  <FaDollarSign className="card-icon" />
                  <div className="card-info">
                    <h2 className="card-title">Total Donado</h2>
                    <p className="card-value">${totalDonations}</p>
                  </div>
                </div>
                <div className="stat-cardD">
                  <FaUsers className="card-icon" />
                  <div className="card-info">
                    <h2 className="card-title">Número de Donantes</h2>
                    <p className="card-value">{numberOfDonors}</p>
                  </div>
                </div>
                <div className="stat-cardD">
                  <FaChartBar className="card-icon" />
                  <div className="card-info">
                    <h2 className="card-title">Donación Promedio</h2>
                    <p className="card-value">${averageDonation}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DonationsStatistics;

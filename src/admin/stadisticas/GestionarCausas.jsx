import React, { useState, useEffect } from 'react';
import './Causascss/GestionarCausas.css';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Navbar from '../NarbarAdmin';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

const CausesStatistics = () => {
  const [causeList, setCauseList] = useState([]); // Lista de causas desde el backend
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Causas por Categoría',
        data: [],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        borderWidth: 1,
      },
    ],
  });

  // Función para obtener las causas desde el backend
  const fetchCausas = async () => {
    try {
      const response = await axios.get('/api/causas'); // Endpoint para obtener las causas
      console.log('Causas obtenidas:', response.data);

      // Verificar si la respuesta es un array o necesita procesamiento
      const causas = Array.isArray(response.data) ? response.data : response.data.causas || [];
      if (!Array.isArray(causas)) {
        throw new Error('El formato de los datos no es válido.');
      }

      setCauseList(causas);

      // Procesar datos para la gráfica
      const categoryCount = {};
      causas.forEach((cause) => {
        const categoryName = cause.Categoria?.nombre || 'Sin Categoría'; // Validar que la causa tenga categoría
        categoryCount[categoryName] = (categoryCount[categoryName] || 0) + 1;
      });

      // Preparar datos para la gráfica
      const labels = Object.keys(categoryCount);
      const data = Object.values(categoryCount);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Causas por Categoría',
            data: data,
            backgroundColor: [
              '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
              '#FF9F40', '#4BC0C0', '#9966FF', '#FF6384', '#36A2EB',
            ],
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error('Error al obtener causas:', error);
      alert('Error al cargar las causas. Verifica que el backend funcione correctamente.');
    }
  };

  // Llamar a la API al montar el componente
  useEffect(() => {
    fetchCausas();
  }, []);

  return (
    <>
      <Navbar />
      <div className="bodyadmin">
        <div className="causes-statistics">
          <h1 className="title">Estadísticas de Causas</h1>
          <div style={{ width: '700px', margin: '0 auto' }}>
            {chartData.labels.length === 0 ? (
              <p>Cargando datos de la gráfica...</p>
            ) : (
              <Pie data={chartData} />
            )}
          </div>
        </div>

        <div className="cause-list">
          <h2 className="title">Lista de Causas</h2>
          {causeList.length === 0 ? (
            <p>Cargando causas o no hay causas disponibles.</p>
          ) : (
            <ul>
              {causeList.map((cause) => (
                <li key={cause.id} className="cause-item">
                  {cause.nombreCausa} - {cause.Categoria?.nombre || 'Sin Categoría'}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default CausesStatistics;

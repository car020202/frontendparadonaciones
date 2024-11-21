import React, { useState, useEffect } from 'react';
import './Causascss/GestionarCausas.css'; 
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Navbar from '../NarbarAdmin';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

const CausesStatistics = () => {
  const [categories, setCategories] = useState([]); // Lista de categorías desde la API
  const [causeList, setCauseList] = useState([]); // Lista de causas desde la API
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

  // Obtener todas las categorías desde el backend
  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categorias');
      console.log('Categorías obtenidas:', response.data);

      if (Array.isArray(response.data)) {
        setCategories(response.data);

        // Preparar datos para la gráfica
        const categoryNames = response.data.map((cat) => cat.nombre);
        const categoryCounts = await Promise.all(
          categoryNames.map(async (nombre) => {
            try {
              const causasResponse = await axios.get(`/api/causas/categoria/${nombre}`);
              return Array.isArray(causasResponse.data) ? causasResponse.data.length : 0; // Validar que la respuesta sea un arreglo
            } catch (error) {
              console.error(`Error al obtener causas para la categoría ${nombre}:`, error);
              return 0; // Asumir 0 causas si ocurre un error
            }
          })
        );

        // Actualizar datos de la gráfica
        setChartData({
          labels: categoryNames,
          datasets: [
            {
              label: 'Causas por Categoría',
              data: categoryCounts,
              backgroundColor: [
                '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
                '#FF9F40', '#4BC0C0', '#9966FF', '#FF6384', '#36A2EB',
              ],
              borderWidth: 1,
            },
          ],
        });
      } else {
        throw new Error('La respuesta de /api/categorias no es un arreglo.');
      }
    } catch (error) {
      console.error('Error al obtener categorías:', error);
      alert('Error al cargar las categorías. Verifica que el backend funcione correctamente.');
    }
  };

  // Obtener todas las causas desde el backend
  const fetchCausas = async () => {
    try {
      const response = await axios.get('/api/causas');
      console.log('Causas obtenidas:', response.data);

      if (Array.isArray(response.data)) {
        setCauseList(response.data);
      } else {
        throw new Error('La respuesta de /api/causas no es un arreglo.');
      }
    } catch (error) {
      console.error('Error al obtener causas:', error);
      alert('Error al cargar las causas. Verifica que el backend funcione correctamente.');
      setCauseList([]); // Asegurar que causeList sea un arreglo vacío en caso de error
    }
  };

  // Llamar a las APIs al montar el componente
  useEffect(() => {
    fetchCategories();
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

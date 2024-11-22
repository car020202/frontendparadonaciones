import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Navbar from '../NarbarAdmin';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

const CausesStatistics = () => {
  const [categorias, setCategorias] = useState([]);
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/categorias/estadisticas');
        setCategorias(response.data);

        // Construir los datos para la gráfica
        const labels = response.data.map((categoria) => categoria.nombre);
        const data = response.data.map((categoria) => categoria.count);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Causas por Categoría',
              data: data,
              backgroundColor: [
                '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
                '#FF9F40', '#4BC0C0', '#9966FF', '#FF6384', '#36A2EB',
                '#FFCE56', '#FF9F40', '#4BC0C0', '#9966FF', '#FF6384',
              ],
              borderWidth: 1,
            },
          ],
        });

        setLoading(false);
      } catch (error) {
        console.error('Error al obtener las estadísticas de categorías:', error);
        setErrorMessage('Ocurrió un error al cargar las estadísticas.');
        setLoading(false);
      }
    };

    fetchCategorias();
  }, []);

  return (
    <>
      <Navbar />
      <div
        style={{
          marginLeft: '220px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '20px',
          backgroundColor: '#f9f9f9',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '1300px',
            backgroundColor: '#ffffff',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            marginBottom: '20px',
          }}
        >
          <h1
            style={{
              textAlign: 'center',
              marginBottom: '20px',
              color: '#007B8A',
            }}
          >
            Estadísticas de Causas
          </h1>

          {loading ? (
            <p style={{ textAlign: 'center', fontSize: '18px' }}>Cargando estadísticas...</p>
          ) : errorMessage ? (
            <p style={{ textAlign: 'center', color: 'red', fontSize: '18px' }}>{errorMessage}</p>
          ) : (
            <div style={{ width: '700px', margin: '0 auto' }}>
              <Pie data={chartData} />
            </div>
          )}
        </div>

        <div
          style={{
            width: '100%',
            maxWidth: '1300px',
            backgroundColor: '#ffffff',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h2
            style={{
              textAlign: 'center',
              marginBottom: '20px',
              color: '#007B8A',
            }}
          >
            Lista de Causas por Categoría
          </h2>
          <ul
            style={{
              listStyleType: 'none',
              padding: 0,
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '20px',
            }}
          >
            {categorias.map((categoria) => (
              <li
                key={categoria.id}
                style={{
                  backgroundColor: '#ffffff',
                  border: '2px solid #007B8A',
                  borderRadius: '10px',
                  padding: '15px',
                  minWidth: '200px',
                  textAlign: 'center',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  fontSize: '16px',
                  color: '#333',
                }}
              >
                <strong>{categoria.nombre}</strong> <br /> {categoria.count} causas
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default CausesStatistics;

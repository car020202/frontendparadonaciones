import React, { useState, useEffect } from 'react';
import './Causascss/GestionarCausas.css';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Navbar from '../NarbarAdmin';

ChartJS.register(ArcElement, Tooltip, Legend);

// Categorías estáticas con valores de ejemplo
const categorias = [
  { id: 1, nombre: 'Salud', count: 50 },
  { id: 2, nombre: 'Conmemoraciones', count: 30 },
  { id: 3, nombre: 'Emergencias', count: 20 },
  { id: 4, nombre: 'Gastos educativos', count: 25 },
  { id: 5, nombre: 'Animales', count: 15 },
  { id: 6, nombre: 'Medioambiente', count: 10 },
  { id: 7, nombre: 'Negocios', count: 5 },
  { id: 8, nombre: 'Comunidad', count: 12 },
  { id: 9, nombre: 'Competencias', count: 8 },
  { id: 10, nombre: 'Artes creativas', count: 18 },
  { id: 11, nombre: 'Eventos', count: 14 },
  { id: 12, nombre: 'Deportes', count: 9 },
  { id: 13, nombre: 'Causas religiosas', count: 6 },
  { id: 14, nombre: 'Gastos familiares', count: 7 },
  { id: 15, nombre: 'Viajes', count: 4 },
  { id: 16, nombre: 'Voluntariado', count: 3 },
  { id: 17, nombre: 'Deseos', count: 2 },
  { id: 18, nombre: 'Tecnología', count: 1 },
];

// Generar datos para la gráfica de pastel
const chartData = {
  labels: categorias.map((categoria) => categoria.nombre),
  datasets: [
    {
      label: 'Causas por Categoría',
      data: categorias.map((categoria) => categoria.count),
      backgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
        '#FF9F40', '#4BC0C0', '#9966FF', '#FF6384', '#36A2EB',
        '#FFCE56', '#FF9F40', '#4BC0C0', '#9966FF', '#FF6384',
        '#36A2EB', '#FFCE56', '#FF9F40',
      ],
      borderWidth: 1,
    },
  ],
};

const CausesStatistics = () => {
  return (
    <>
      <Navbar />
      <div className="bodyadmin">
        <div className="causes-statistics">
          <h1 className="title">Estadísticas de Causas</h1>
          <div style={{ width: '700px', margin: '0 auto' }}>
            <Pie data={chartData} />
          </div>
        </div>

        <div className="cause-list">
          <h2 className="title">Lista de Causas</h2>
          <ul>
            {categorias.map((categoria) => (
              <li key={categoria.id} className="cause-item">
                {categoria.nombre} - {categoria.count} causas
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default CausesStatistics;

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../navbar/navbar';
import Footer from '../Footer/Footer';

const CausaDetalle = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Datos ficticios de prueba
  const defaultData = {
    title: 'Causa de Prueba',
    description: 'Esta es una descripción detallada de la causa de prueba. Aquí puedes ver los detalles completos sobre esta causa específica.',
    images: [
      'https://via.placeholder.com/500'
    ],
    needs: ['Ropa', 'Alimentos', 'Medicamentos', 'Voluntarios'],
    raisedAmount: 3760,
    goalAmount: 8000,
  };

  // Recibimos los datos de la causa desde el estado de la navegación o usamos los datos de prueba
  const { title, description, images, needs, raisedAmount, goalAmount } = location.state || defaultData;

  // Calcula el porcentaje de recaudación
  const raisedPercentage = Math.round((raisedAmount / goalAmount) * 100);

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: '1500px', margin: '50px auto', padding: '20px' }}>
        <button className="back-button" onClick={() => navigate(-1)} style={{ backgroundColor: '#007c8c', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', marginBottom: '20px', fontSize: '20px' }}>
          Volver
        </button>

        <div style={{ display: 'flex', gap: '20px' }}>
          {/* Columna izquierda - Contenido principal */}
          <div style={{ flex: 2, backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <h1 style={{ color: '#007c8c', textAlign: 'center', marginBottom: '20px' }}>{title}</h1>
            
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
              <img src={images[0]} alt={`Imagen de ${title}`} style={{ width: '400px', height: '400px', borderRadius: '10px', objectFit: 'cover' }} />
            </div>

            <p style={{ fontSize: '18px', color: '#333', marginBottom: '20px' }}>{description}</p>

            <h3 style={{ fontSize: '20px', color: '#007c8c', marginBottom: '10px' }}>Especificaciones para donaciones:</h3>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: '#555', marginBottom: '20px' }}>
              {needs.map((need, index) => (
                <li key={index} style={{ fontSize: '18px' }}>{need}</li>
              ))}
            </ul>
          </div>

          {/* Columna derecha - Panel de donaciones */}
          <div style={{ flex: 1, backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', height: 'fit-content' }}>
            <h2 style={{ color: '#333', fontSize: '24px', textAlign: 'center' }}>{raisedAmount} € recaudados</h2>
            <p style={{ color: '#555', fontSize: '16px', textAlign: 'center' }}>Objetivo de {goalAmount} €</p>
            
            {/* Barra de progreso */}
            <div style={{ width: '100%', height: '10px', backgroundColor: '#e0e0e0', borderRadius: '10px', overflow: 'hidden', marginBottom: '10px' }}>
              <div style={{ width: `${raisedPercentage}%`, height: '100%', backgroundColor: '#007c8c' }}></div>
            </div>
            <p style={{ color: '#333', fontSize: '16px', textAlign: 'center' }}>{raisedPercentage}% alcanzado</p>

            <button
              onClick={() => window.location.href = `/paginadonar`}
              style={{ backgroundColor: '#007c8c', color: 'white', border: 'none', padding: '15px 30px', borderRadius: '5px', cursor: 'pointer', fontSize: '18px', width: '100%', marginBottom: '10px' }}
            >
              Donar ahora
            </button>
            
           
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CausaDetalle;

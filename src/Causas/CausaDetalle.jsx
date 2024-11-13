import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../navbar/navbar';
import Footer from '../Footer/Footer';
//import './CausaDetalle.css';

const CausaDetalle = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Datos ficticios de prueba
  const defaultData = {
    title: 'Causa de Prueba',
    description: 'Esta es una descripción detallada de la causa de prueba. Aquí puedes ver los detalles completos sobre esta causa específica.',
    images: [
      'https://via.placeholder.com/400'
    ],
    needs: ['Ropa', 'Alimentos', 'Medicamentos', 'Voluntarios'],
  };

  // Recibimos los datos de la causa desde el estado de la navegación o usamos los datos de prueba
  const { title, description, images, needs } = location.state || defaultData;

  return (
    <>
      <Navbar />
      <div className="causa-detalle-container" style={{ maxWidth: '1400px', margin: '50px auto', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
        <button className="back-button" onClick={() => navigate(-1)} style={{ backgroundColor: '#007c8c', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', marginBottom: '20px' , fontSize: '20px', }}>
          Volver
        </button>

        <h1 className="causa-title" style={{ color: '#007c8c', textAlign: 'center', marginBottom: '20px' }}>{title}</h1>

        <div className="causa-content" style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', marginBottom: '20px' }}>
          <div className="causa-image-container" style={{ flexShrink: 0 }}>
            <img src={images[0]} alt={`Imagen de ${title}`} style={{ width: '400px', height: 'auto', borderRadius: '10px', objectFit: 'cover' }} />
          </div>
          <div className="causa-text" style={{ flex: 1 }}>
            <p className="causa-description" style={{ fontSize: '20px', color: '#333', marginBottom: '20px' }}>{description}</p>

            <h3 style={{ fontSize: '20px', color: '#007c8c', marginBottom: '10px' }}>Especificaciones para donaciones:</h3>
            <ul className="causa-needs" style={{ listStyleType: 'disc', paddingLeft: '20px', color: '#555', marginBottom: '20px' }}>
              {needs.map((need, index) => (
                <li key={index} style={{ fontSize: '20px' }}>{need}</li>
              ))}
            </ul>
          </div>
        </div>

        <button
          className="donate-button"
          onClick={() => window.location.href = `/paginadonar`}
          style={{ backgroundColor: '#007c8c', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontSize: '20px', display: 'block', margin: '0 auto' }}
        >
          Donar ahora
        </button>
      </div>
      <Footer />
    </>
  );
};

export default CausaDetalle;

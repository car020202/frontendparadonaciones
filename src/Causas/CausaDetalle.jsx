import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../navbar/navbar';
import Footer from '../Footer/Footer';
import axios from 'axios';

const CausaDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [causa, setCausa] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchCausa = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/causas/${id}`);
        setCausa(response.data);
      } catch (error) {
        console.error('Error al obtener los detalles de la causa:', error);
        setErrorMessage('No se pudieron cargar los detalles de la causa');
      }
    };

    fetchCausa();
  }, [id]);

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  if (!causa) {
    return <div>Cargando detalles de la causa...</div>;
  }

  const progressPercentage = Math.min((causa.recaudado / causa.meta) * 100, 100).toFixed(2);

  return (
    <>
      
      <div style={{ maxWidth: '1500px', margin: '50px auto', padding: '20px' }}>
        <button
          className="back-button"
          onClick={() => navigate(-1)}
          style={{
            backgroundColor: '#007c8c',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            marginBottom: '20px',
            fontSize: '20px',
          }}
        >
          Volver
        </button>

        <div style={{ display: 'flex', gap: '20px' }}>
          {/* Columna izquierda - Detalles de la causa */}
          <div
            style={{
              flex: 2,
              backgroundColor: '#f9f9f9',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h1 style={{ color: '#007c8c', textAlign: 'center', marginBottom: '20px' }}>
              {causa.nombreCausa}
            </h1>
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
              <img
                src={`http://localhost:3000${causa.portada}`}
                alt={`Imagen de ${causa.nombreCausa}`}
                style={{
                  width: '700px',
                  height: '400px',
                  borderRadius: '10px',
                  objectFit: 'cover',
                }}
              />
            </div>
            <h3 style={{ fontSize: '20px', color: '#007c8c', marginBottom: '10px' }}>
              Causa creada por:
            </h3>
            <h3 style={{ fontSize: '20px', color: '#333', marginBottom: '20px' }}>
              {causa.usuarioNombre || 'Desconocido'}
            </h3>
            <h3 style={{ fontSize: '20px', color: '#007c8c', marginBottom: '10px' }}>
              Descripción:
            </h3>
            <p style={{ fontSize: '20px', color: '#333', marginBottom: '20px' }}>
              {causa.descripcion}
            </p>
            <h3 style={{ fontSize: '20px', color: '#007c8c', marginBottom: '10px' }}>
              Especificaciones para donaciones:
            </h3>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: '#555', marginBottom: '20px' }}>
              {causa.tipoDonacion.split(',').map((tipo, index) => (
                <li key={index} style={{ fontSize: '20px' }}>{tipo.trim()}</li>
              ))}
            </ul>
          </div>

          {/* Columna derecha - Panel de donaciones */}
          <div
            style={{
              flex: 1,
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '15px',
              height: 'fit-content',
            }}
          >
            <h2 style={{ color: '#333', fontSize: '24px', textAlign: 'center' }}>
              ${causa.recaudado || 0} recaudados
            </h2>
            <p style={{ color: '#555', fontSize: '16px', textAlign: 'center' }}>
              Objetivo ${causa.meta || 0}
            </p>
            <div
              style={{
                width: '100%',
                height: '10px',
                backgroundColor: '#e0e0e0',
                borderRadius: '10px',
                overflow: 'hidden',
                marginBottom: '10px',
              }}
            >
              <div
                style={{
                  width: `${progressPercentage}%`,
                  height: '100%',
                  backgroundColor: '#007c8c',
                }}
              ></div>
            </div>
            <p style={{ color: '#333', fontSize: '16px', textAlign: 'center' }}>
              {progressPercentage}% alcanzado
            </p>
            <button
              onClick={() => navigate(`/paginadonar/${id}`)}
              style={{
                backgroundColor: '#007c8c',
                color: 'white',
                border: 'none',
                padding: '15px 30px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '18px',
                width: '100%',
                marginBottom: '10px',
              }}
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

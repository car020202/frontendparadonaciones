import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Footer from '../Footer/Footer';

const Causasfiltro = () => {
  const location = useLocation();
  const nombreCategoria = location.state?.nombreCategoria || 'Todas las Causas';
  const [causas, setCausas] = useState([]);
  const [noDataMessage, setNoDataMessage] = useState(null);

  useEffect(() => {
    const fetchCausas = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/causas/categoria/${nombreCategoria}`);
        if (response.status === 200 && response.data.length > 0) {
          setCausas(response.data);
          setNoDataMessage(null);
        } else {
          setCausas([]);
          setNoDataMessage('No hay causas para mostrar');
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setCausas([]);
          setNoDataMessage('No hay causas para mostrar');
        } else {
          console.error('Error al obtener las causas:', error);
          setNoDataMessage('Error al obtener las causas');
        }
      }
    };

    fetchCausas();
  }, [nombreCategoria]);

  return (
    <>
      <div className="button-container" style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px 50px' }}>
        <button
          className="create-causa-button"
          onClick={() => window.location.href = '/crearcausa'}
          style={{
            backgroundColor: '#007B8A',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '20px',
          }}
        >
          Crear Causa
        </button>
      </div>

      <div className="view-causas-container" style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '10px 0',
        minHeight: '700px',
      }}>
        <div className="causas-list-container" style={{
          backgroundColor: '#f3f3f3',
          borderRadius: '10px',
          padding: '20px',
          maxWidth: '1600px',
          minHeight: '400px',
          margin: '0 auto',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        }}>
          <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#007c8c' }}>
            {nombreCategoria}
          </h1>

          {noDataMessage ? (
            <p style={{ color: '#007c8c', fontSize: '24px', textAlign: 'center', fontWeight: 'bold' }}>
              {noDataMessage}
            </p>
          ) : (
            <div className="causas-cards" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '20px',
              justifyContent: 'center',
            }}>
              {causas.map((causa) => {
                const progressPercentage = Math.min((causa.recaudado / causa.meta) * 100, 100).toFixed(2);

                return (
                  <div key={causa.id} className="causa-card" style={{
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    padding: '20px',
                    width: '450px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                    textAlign: 'left',
                    position: 'relative',
                    margin: '15px',
                  }}>
                    <img
                      src={`http://localhost:3000${causa.portada}`}
                      alt={`Causa ${causa.nombreCausa}`}
                      style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px', marginBottom: '10px' }}
                    />
                    <div style={{ padding: '10px' }}>
                      <div style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        color: 'white',
                        padding: '5px 10px',
                        borderRadius: '5px',
                        fontSize: '14px',
                      }}>
                        ${causa.recaudado || 0} recaudado de ${causa.meta || 0}
                      </div>
                      <h3 style={{ marginTop: '10px', fontSize: '20px' }}>{causa.nombreCausa}</h3>
                      <p style={{ fontSize: '18px', color: '#4a4a4a' }}>{causa.descripcion}</p>

                      <div style={{ position: 'relative', marginBottom: '10px' }}>
                        <span style={{
                          position: 'absolute',
                          top: '-20px',
                          left: '0',
                          color: '#555',
                          fontSize: '12px',
                          fontWeight: 'bold',
                        }}>
                          ${causa.recaudado || 0}
                        </span>
                        <span style={{
                          position: 'absolute',
                          top: '-20px',
                          right: '0',
                          color: '#555',
                          fontSize: '12px',
                          fontWeight: 'bold',
                        }}>
                          ${causa.meta || 0}
                        </span>
                        <div style={{
                          height: '8px',
                          width: '100%',
                          backgroundColor: '#e0e0e0',
                          borderRadius: '5px',
                        }}>
                          <div style={{
                            width: `${progressPercentage}%`,
                            height: '100%',
                            backgroundColor: '#00c853',
                            borderRadius: '5px',
                          }}></div>
                        </div>
                      </div>

                      <button
                        className="donate-button"
                        onClick={() => window.location.href = `/detallecausa/${causa.id}`}
                        style={{
                          backgroundColor: '#007B8A',
                          color: 'white',
                          border: 'none',
                          padding: '10px 20px',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          marginTop: '10px',
                        }}
                      >
                        Ver
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Causasfiltro;
import React from 'react';
import Navbar from '../navbar/navbar';
import Footer from '../Footer/Footer';
import backgroundImage from '../assets/background.jpg';
import styled from "styled-components";

const causasData = [
  {
    id: 1,
    title: 'Causa A',
    description: 'Descripción de la causa A',
    images: ['https://via.placeholder.com/150'],
  },
  {
    id: 2,
    title: 'Causa B',
    description: 'Descripción de la causa B',
    images: ['https://via.placeholder.com/150'],
  },
  {
    id: 3,
    title: 'Causa C',
    description: 'Descripción de la causa C',
    images: ['https://via.placeholder.com/150'],
  },
];

const ViewCausas = () => {
  return (
    <>
      <Navbar />
      <div className="button-container" style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px 50px' }}>
        <button className="create-causa-button" onClick={() => window.location.href = '/crearcausa'} style={{ backgroundColor: '#007B8A',
           color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontSize: '20px' }}>
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
          backgroundColor: '#007B8A',
          borderRadius: '10px',
          padding: '20px',
          maxWidth: '1600px',
          minHeight: '400px',
          margin: '0 auto',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px', color: 'white' }}>Listado de Causas</h2>
          <div className="causas-cards" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
            {causasData.map((causa) => (
              <div key={causa.id} className="causa-card" style={{
                backgroundColor: 'white',
                borderRadius: '10px',
                padding: '20px',
                width: '450px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                textAlign: 'left',
                position: 'relative',
                margin: '15px'
              }}>
                <img src={causa.images[0]} alt={`Causa ${causa.id}`} style={{ width: '400px', height: '250px', objectFit: 'cover', borderRadius: '10px', marginBottom: '10px' }} />
                <div style={{ padding: '10px' }}>
                  <div style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: 'rgba(0, 0, 0, 0.6)', color: 'white', padding: '5px 10px', borderRadius: '5px', fontSize: '14px' }}>
                    {causa.donations}
                  </div>
                  <h3 style={{ marginTop: '10px', fontSize: '20px' }}>{causa.title}</h3>
                  <p style={{ fontSize: '18px', color: '#4a4a4a' }}>{causa.description}</p>
                  
                  <div style={{ height: '8px', width: '100%', backgroundColor: '#e0e0e0', borderRadius: '5px', margin: '10px 0' }}>
                    <div style={{ width: '50%', height: '100%', backgroundColor: '#00c853', borderRadius: '5px' }}></div>
                  </div>
                  <button
                          className="donate-button"
                          onClick={() => window.location.href = `/paginadonar`}
                        >
                          Donar ahora
                        </button>
                </div>
              </div>
              
              
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ViewCausas;

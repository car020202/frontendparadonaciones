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
      <div className="view-causas-container" style={{
        
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '100px 0',
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
                textAlign: 'center'
              }}>
                <h3>{causa.title}</h3>
                <p>{causa.description}</p>
                <div className="causa-images" style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '10px' }}>
                  {causa.images.map((image, index) => (
                    <img key={index} src={image} alt={`Causa ${causa.id} - ${index}`} style={{ width: '100px', borderRadius: '5px' }} />
                  ))}
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

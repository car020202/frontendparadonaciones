import React from 'react';
import './inicio.css'; // Asegúrate de tener los estilos aquí
import Navbar from '../navbar/navbar';

const Home = () => {
  return (
    <>
    <Navbar/>
    <div>
      {/* Sección del Banner */}
      <section className="banner-section">
        <div className="banner-content">
          <h1>Tu lugar para ayudar</h1>
          <p>La plataforma líder en crowdfunding</p>
          <button className="cta-button">Iniciar una recaudación</button>
        </div>
      </section>

      {/* Sección del carrusel */}
      <section className="carousel-section">
        <h2>Causas destacadas</h2>
        <div className="carousel-container">
          <div className="carousel-card">
            <img src="https://via.placeholder.com/300" alt="Card 1" />
            <h3>Card 1</h3>
            <p>Descripción de la tarjeta 1.</p>
          </div>
          <div className="carousel-card">
            <img src="https://via.placeholder.com/300" alt="Card 2" />
            <h3>Card 2</h3>
            <p>Descripción de la tarjeta 2.</p>
          </div>
          <div className="carousel-card">
            <img src="https://via.placeholder.com/300" alt="Card 3" />
            <h3>Card 3</h3>
            <p>Descripción de la tarjeta 3.</p>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default Home;

import React from 'react';
import Navbar from '../navbar/navbar';
import Footer from '../Footer/Footer';
import './Acercade.css';

const Acercade = () => {
  return (
    <>
      <Navbar />
      <section className="how-it-works">
        <h2>¿Cómo Funciona?</h2>
        <div className="steps">
          <div className="step">
            <h3>Paso 1: Inicia una campaña</h3>
            <p>Establece tu objetivo, cuenta tu historia y añade una imagen o video.</p>
          </div>
          <div className="step">
            <h3>Paso 2: Comparte tu campaña</h3>
            <p>Envíala a tus amigos por correo o redes sociales para obtener más alcance.</p>
          </div>
          <div className="step">
            <h3>Paso 3: Administra donativos</h3>
            <p>Recibe donaciones y agradece a tus contribuyentes.</p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Acercade;

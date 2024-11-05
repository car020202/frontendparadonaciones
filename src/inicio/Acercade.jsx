import React from 'react';
import Navbar from '../navbar/navbar';
import Footer from '../Footer/Footer';
import './Acercade.css';
import donate from '../assets/donate.avif'; // Asegúrate de colocar la imagen en la carpeta de assets
import missionBackground from '../assets/background.jpg'; // Asegúrate de colocar la imagen en la carpeta de assets
import missionImage from '../assets/Mision.webp'; // Asegúrate de colocar la imagen en la carpeta de assets
const Acercade = () => {
  return (
    <>
      <Navbar />
      <section className="about-us">
        <div className="about-us-content">
          <div className="about-us-text">
            <h2>Acerca de Nosotros</h2>
            <p>
              Nuestra plataforma de donaciones permite a los usuarios iniciar y apoyar causas significativas. Ya sea que necesites apoyo
              para un proyecto personal, una causa social, o una emergencia, aquí puedes crear tu propia campaña y recaudar fondos con el
              apoyo de la comunidad.
            </p>
          </div>
          <img src={donate} alt="Ilustración sobre cómo funciona la plataforma de donaciones" className="about-us-image" />
        </div>
      </section>

      <section className="how-it-works" style={{ backgroundImage: `url(${missionBackground})` }}>
        <h1>¿Cómo Funciona?</h1>
        <div className="steps">
          <div className="step">
            <div className="step-icon">
              <i className="fas fa-user-plus"></i>
            </div>
            <h3>Paso 1: Crea una Cuenta</h3>
            <p>
              Regístrate para comenzar tu viaje en nuestra plataforma. Tanto los creadores de campañas como los donantes necesitan
              una cuenta para participar.
            </p>
          </div>
          <div className="step">
            <div className="step-icon">
              <i className="fas fa-bullhorn"></i>
            </div>
            <h3>Paso 2: Inicia una Campaña</h3>
            <p>
              Define tus objetivos, cuenta tu historia y añade imágenes o videos. Personaliza tu campaña para atraer a posibles
              donantes y crear conciencia.
            </p>
          </div>
          <div className="step">
            <div className="step-icon">
              <i className="fas fa-hand-holding-heart"></i>
            </div>
            <h3>Paso 3: Dona a Otras Causas</h3>
            <p>
              Explora campañas de otros usuarios, contribuye con donaciones y ayuda a marcar la diferencia en la vida de otras
              personas.
            </p>
          </div>
          <div className="step">
            <div className="step-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <h3>Paso 4: Administra y Actualiza</h3>
            <p>
              Gestiona las donaciones recibidas y mantén informados a tus donantes. Al finalizar una campaña, puedes enviar un
              informe detallado de cómo se utilizó su contribución.
            </p>
          </div>
        </div>
      </section>

      <section className="our-mission">
        <div className="our-mission-content">
          <img src={missionImage} alt="Nuestra Misión" className="mission-image" />
          <div className="mission-text">
            <h2>Nuestra Misión</h2>
            <p>
              Fomentamos una comunidad de apoyo mutuo donde cada usuario puede hacer la diferencia. Creemos que cada donación cuenta y
              que todos tienen el poder de transformar vidas a través de la solidaridad y el compromiso.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Acercade;

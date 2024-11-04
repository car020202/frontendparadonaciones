import React from "react";
import "./inicio.css"; 
import Navbar from "../navbar/navbar";
import Footer from "../Footer/Footer";
import { Carousel } from "react-bootstrap"; 

const Home = () => {
  return (
    <>
     <Navbar/>
      <div>
        {/* Sección del Banner */}
        <section className="banner-section">
          <div className="banner-content">
            <h1>Tu lugar para ayudar</h1>
            <p>La plataforma líder en crowdfunding para causas importantes</p>
            <button className="cta-button">Iniciar una recaudación</button>
          </div>
        </section>

        {/* Carrusel de causas destacadas */}
        <section className="carousel-section">
          <h2>Causas que necesitan tu ayuda</h2>
          <Carousel controls={true} indicators={false} interval={3000} pause={false}>
            <Carousel.Item>
              <div className="card-container">
                <div className="carousel-card">
                  <img src="./src/assets/causa1.jpeg" alt="Card 1" className="carousel-image" />
                  <h3>Ayuda por desastres naturales</h3>
                  <p>Las recientes inundaciones han dejado cientos de personas sin hogar. Tu donación puede proporcionar refugio y comida.</p>
                  <button className="donate-button">Donar ahora</button>
                </div>
                <div className="carousel-card">
                  <img src="./src/assets/causa2.jpeg" alt="Card 2" className="carousel-image" />
                  <h3>Educación para niños sin recursos</h3>
                  <p>Ayuda a financiar la educación de niños en comunidades rurales que carecen de los recursos básicos para estudiar.</p>
                  <button className="donate-button">Donar ahora</button>
                </div>
                <div className="carousel-card">
                  <img src="./src/assets/causa3.jpeg" alt="Card 3" className="carousel-image" />
                  <h3>Apoyo a la salud mental</h3>
                  <p>Contribuye a programas de apoyo para la salud mental en comunidades vulnerables. Tu ayuda es crucial para salvar vidas.</p>
                  <button className="donate-button">Donar ahora</button>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="card-container">
                <div className="carousel-card">
                  <img src="./src/assets/causa4.jpg" alt="Card 4" className="carousel-image" />
                  <h3>Reforestación y medio ambiente</h3>
                  <p>Apoya los esfuerzos de reforestación para combatir el cambio climático y preservar nuestros ecosistemas.</p>
                  <button className="donate-button">Donar ahora</button>
                </div>
                <div className="carousel-card">
                  <img src="./src/assets/causa5.jpeg" alt="Card 5" className="carousel-image" />
                  <h3>Alimentos para familias en pobreza</h3>
                  <p>Miles de familias en situación de pobreza dependen de donaciones para alimentarse. Ayuda a cambiar sus vidas con una donación.</p>
                  <button className="donate-button">Donar ahora</button>
                </div>
                <div className="carousel-card">
                  <img src="./src/assets/causa6.jpg" alt="Card 6" className="carousel-image" />
                  <h3>Protección de animales en peligro</h3>
                  <p>Los animales en peligro de extinción necesitan de tu ayuda para ser protegidos. Cada donación cuenta.</p>
                  <button className="donate-button">Donar ahora</button>
                </div>
              </div>
            </Carousel.Item>
          </Carousel>
        </section>

        {/* Nueva Sección Informativa */}
        <section className="info-section">
          <div className="info-content">
            <h2>Recaudar fondos en nuestra plataforma es un proceso fácil, eficaz y confiable.</h2>
            <p>
              Encuentra lo que necesitas para ayudar a que tu recaudación de fondos tenga éxito,
              ya sea que estés juntando dinero para ti, para amigos, para un familiar o para
              una organización benéfica. No exigimos ningún pago inicial, desde emergencias médicas hasta proyectos sin fines
              de lucro. Si necesitas ayuda, ¡puedes pedirla aquí!
            </p>
           
          </div>
        </section>
      </div>
      <Footer/>
    </>
  );
};

export default Home;

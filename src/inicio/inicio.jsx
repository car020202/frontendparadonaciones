import React from "react";
import "./inicio.css";
import Navbar from "../navbar/navbar";
import Footer from "../Footer/Footer";
import { Carousel } from "react-bootstrap";

const causasData = [
  {
    id: 1,
    title: 'Ayuda por desastres naturales',
    description: 'Las recientes inundaciones han dejado cientos de personas sin hogar. Tu donación puede proporcionar refugio y comida.',
    donations: '2.7 mil. donaciones',
    progress: 50,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    title: 'Educación para niños sin recursos',
    description: 'Ayuda a financiar la educación de niños en comunidades rurales que carecen de los recursos básicos para estudiar.',
    donations: '1.5 mil. donaciones',
    progress: 40,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    title: 'Apoyo a la salud mental',
    description: 'Contribuye a programas de apoyo para la salud mental en comunidades vulnerables. Tu ayuda es crucial para salvar vidas.',
    donations: '3 mil. donaciones',
    progress: 60,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 4,
    title: 'Reforestación y medio ambiente',
    description: 'Apoya los esfuerzos de reforestación para combatir el cambio climático y preservar nuestros ecosistemas.',
    donations: '2 mil. donaciones',
    progress: 70,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 5,
    title: 'Alimentos para familias en pobreza',
    description: 'Miles de familias en situación de pobreza dependen de donaciones para alimentarse. Ayuda a cambiar sus vidas con una donación.',
    donations: '1.8 mil. donaciones',
    progress: 80,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 6,
    title: 'Protección de animales en peligro',
    description: 'Los animales en peligro de extinción necesitan de tu ayuda para ser protegidos. Cada donación cuenta.',
    donations: '1 mil. donaciones',
    progress: 30,
    image: 'https://via.placeholder.com/150',
  },
];

const Home = () => {
  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const causasChunks = chunkArray(causasData, 3);

  return (
    <>
      <Navbar />
      <div>
        {/* Sección del Banner */}
        <section className="banner-section">
          <div className="banner-content">
            <h1>Tu lugar para ayudar</h1>
            <p>La plataforma líder en crowdfunding para causas importantes</p>
            <button className="cta-button" onClick={() => window.location.href = '/crearcausa'}>Iniciar una recaudación</button>
          </div>
        </section>

        {/* Carrusel de causas destacadas */}
        <section className="carousel-section">
          <div className="cqnta">
            <h2>Causas que necesitan tu ayuda</h2>
          </div>
          <Carousel controls={true} indicators={false} interval={5000} pause={false}>
            {causasChunks.map((chunk, index) => (
              <Carousel.Item key={index}>
                <div className="card-container" style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                  {chunk.map((causa) => (
                    <div key={causa.id} className="carousel-card" style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      backgroundColor: 'white',
                      borderRadius: '10px',
                      padding: '20px',
                      width: '400px',
                      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                      textAlign: 'left',
                      position: 'relative',
                      marginLeft: '50px',
                      marginBottom: '50px'
                    }}>
                      <img src={causa.image} alt={`Causa ${causa.id}`} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '10px 10px 0 0' }} />
                      <div style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: 'rgba(0, 0, 0, 0.6)', color: 'white', padding: '5px 10px', borderRadius: '5px', fontSize: '14px' }}>
                        {causa.donations}
                      </div>
                      <h3 style={{ marginTop: '30px' }}>{causa.title}</h3>
                      <p>{causa.description}</p>
                      <div style={{ marginTop: 'auto' }}>
                        <div style={{ height: '8px', width: '100%', backgroundColor: '#e0e0e0', borderRadius: '5px', margin: '10px 0' }}>
                          <div style={{ width: `${causa.progress}%`, height: '100%', backgroundColor: '#00c853', borderRadius: '5px' }}></div>
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
              </Carousel.Item>
            ))}
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
          <a href="/crearcausa" className="btn-crearcausa" style={{ display: 'block', margin: '20px auto', textAlign: 'center' }}>
            Crear Causa
          </a>

        </section>

        {/* Nueva Sección con Video */}
        <section className="video-section" style={{ backgroundColor: 'white', padding: '50px 0' }}>
          <div className="video-content" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2>Conoce más sobre nuestro trabajo</h2>
            <p>Descubre cómo tu apoyo marca la diferencia. Mira nuestro video para conocer más sobre nuestras causas y cómo puedes ayudar.</p>
            <div className="video-wrapper" style={{ position: 'relative', paddingBottom: '56.25%', height: 0, marginTop: '20px' }}>
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Video sobre nuestra misión"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
};

export default Home;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./inicio.css";
import Navbar from "../navbar/navbar";
import Footer from "../Footer/Footer";
import { Carousel } from "react-bootstrap";

const Home = () => {
  const [causas, setCausas] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCausas = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/causas/ultimas');
        setCausas(response.data);
      } catch (error) {
        console.error('Error al obtener las causas:', error);
        setErrorMessage('No se pudieron cargar las causas');
      }
    };

    fetchCausas();
  }, []);

  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const causasChunks = chunkArray(causas, 3);

  return (
    <>
   
      <div>
        {/* Sección del Banner */}
        <section className="banner-section">
          <div className="banner-content">
            <h1>Tu lugar para ayudar</h1>
            <p>La plataforma líder en crowdfunding para causas importantes</p>
            <button
              className="cta-button"
              onClick={() => navigate('/crearcausa')}
            >
              Iniciar una recaudación
            </button>
          </div>
        </section>

         {/* Carrusel de causas destacadas */}
        <section className="carousel-section">
          <div className="cqnta">
            <h2>Causas que necesitan tu ayuda</h2>
          </div>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
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
                      <img
                        src={`http://localhost:3000${causa.portada}`}
                        alt={`Causa ${causa.id}`}
                        style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '10px 10px 0 0' }}
                      />
                      <div style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: 'rgba(0, 0, 0, 0.6)', color: 'white', padding: '5px 10px', borderRadius: '5px', fontSize: '14px' }}>
                        {causa.meta} recaudado
                      </div>
                      <h3 style={{ marginTop: '30px' }}>{causa.nombreCausa}</h3>
                      <p>{causa.descripcion}</p>
                      <div style={{ marginTop: 'auto', position: 'relative' }}>
                        {/* Span para el monto recaudado, ahora encima de la barra */}
                        <span style={{
                          position: 'absolute',
                          top: '-9px',
                          left: '0',
                          color: '#555',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}>
                          ${causa.recaudado || 0}
                        </span>
                        <div style={{ height: '8px', width: '100%', backgroundColor: '#e0e0e0', borderRadius: '5px', margin: '10px 0', position: 'relative' }}>
                          <div style={{ width: `${causa.progreso || 50}%`, height: '100%', backgroundColor: '#00c853', borderRadius: '5px' }}></div>
                          {/* Span para el monto total de la meta al final de la barra */}
                          <span style={{
                            position: 'absolute',
                            right: '5px',
                            top: '-18px',
                            color: '#555',
                            fontSize: '12px',
                            fontWeight: 'bold'
                          }}>
                            ${causa.meta || 0}
                          </span>
                        </div>
                        <button
                          className="donate-button"
                          onClick={() => navigate(`/detallecausa/${causa.id}`)}
                        >
                          Ver
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </section>

        {/* Sección Informativa */}
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

        {/* Sección con Video */}
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

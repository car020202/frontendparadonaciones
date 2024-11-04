import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/navbar';
import Footer from '../Footer/Footer';
import './InformeDonaciones.css';
import { Button, ListGroup, Carousel, Form } from 'react-bootstrap';

const InformeDonacion = () => {
  const [donacion, setDonacion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [donantes, setDonantes] = useState([]);
  const [imagenes, setImagenes] = useState([]);
  const [description, setDescription] = useState('Gracias a todas las personas que contribuyeron, hemos logrado un impacto significativo en la comunidad. Su apoyo ha sido fundamental para mejorar la calidad de vida de muchas personas. ¡Gracias por ser parte del cambio!');

  useEffect(() => {
    setLoading(true);
    // Datos simulados para la donación
    const donacionSimulada = {
      monto: 10000,
      impacto: 'Esta causa ha permitido alimentar a 100 familias durante un mes.',
      donantes: [
        { nombre: 'Juan Pérez', monto: 5000 },
        { nombre: 'Ana López', monto: 3000 },
        { nombre: 'Carlos Gómez', monto: 2000 },
      ],
      imagenes: [
        'https://via.placeholder.com/400x300?text=Imagen+1',
        'https://via.placeholder.com/400x300?text=Imagen+2',
        'https://via.placeholder.com/400x300?text=Imagen+3',
      ],
    };

    setDonacion(donacionSimulada);
    setDonantes(donacionSimulada.donantes);
    setImagenes(donacionSimulada.imagenes);
    setLoading(false);
  }, []);

  if (loading) return <div className="loading">Cargando informe de donación...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <>
      <Navbar />
      <div className="informe-donaciones">
        {donacion ? (
          <div className="donacion-item">
            <h3 className="donacion-causa">Informe de la Causa</h3>
            <div className="donacion-detalle">
              <p><strong>Total Recaudado:</strong> <span className="donacion-monto">${donacion.monto.toLocaleString()}</span></p>
              <p><strong>Impacto Generado:</strong> <span className="donacion-impacto">{donacion.impacto}</span></p>
              <Form.Group controlId="formDescription" className="mb-3">
                <Form.Label><strong>Descripción:</strong></Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={description}
                  readOnly
                />
              </Form.Group>
              
            </div>
            
            <h4 className="donantes-titulo">Donantes</h4>
            <ListGroup className="donantes-lista">
              {donantes.map((donante, index) => (
                <ListGroup.Item key={index} className="donante-item">
                  <strong>{donante.nombre}</strong>: ${donante.monto.toLocaleString()}
                </ListGroup.Item>
              ))}
            </ListGroup>
            {imagenes.length > 0 && (
              <>
                <h4 className="imagenes-titulo">Imágenes Relacionadas</h4>
                <Carousel className="imagenes-carousel">
                  {imagenes.map((imagen, index) => (
                    <Carousel.Item key={index}>
                      <img
                        className="d-block w-100"
                        src={imagen}
                        alt={`Imagen ${index + 1}`}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </>
            )}
          </div>
        ) : (
          <p>No hay información disponible para esta donación.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default InformeDonacion;
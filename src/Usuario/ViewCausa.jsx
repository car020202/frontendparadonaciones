import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Form } from 'react-bootstrap';
import Navbar from '../navbar/navbar';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './view.css';

const ViewCausa = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [description, setDescription] = useState('Gracias a todas las personas que contribuyeron, hemos logrado un impacto significativo en la comunidad. Su apoyo ha sido fundamental para mejorar la calidad de vida de muchas personas. ¡Gracias por ser parte del cambio!');
  const [impact, setImpact] = useState(''); // Estado para el impacto generado
  const [totalRecaudado, setTotalRecaudado] = useState(0); // Estado para el total recaudado
  const navigate = useNavigate();

  // Simulación de la llamada a la API para obtener el total recaudado
  useEffect(() => {
    const fetchTotalRecaudado = async () => {
      try {
        // Simulamos una solicitud con axios
        const response = await axios.get('https://api.simulada.com/causas/1/total-recaudado');
        // Supongamos que la API devuelve un objeto { total: 10000 }
        setTotalRecaudado(response.data.total);
      } catch (error) {
        console.error('Error al obtener el total recaudado:', error);
        setTotalRecaudado(10000); // Valor por defecto si hay un error
      }
    };

    fetchTotalRecaudado();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImpactChange = (e) => {
    setImpact(e.target.value);
  };

  return (
    <>
      
      <div className="view-causa-background">
        <Container className="view-causa-container">
          <Card className="view-causa-card">
            <Card.Body>
              <h2 className="view-causa-title">Detalles de la Causa</h2>
              <Card.Text>
                <strong>Total Recaudado:</strong> ${totalRecaudado.toLocaleString()}
              </Card.Text>
              
              
              <Form.Group controlId="formDescription" className="mb-3">
                <Form.Label><strong>Agradecimiento:</strong></Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </Form.Group>
              <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label><strong>Subir Foto Relacionadas:</strong></Form.Label>
                <Form.Control type="file" multiple onChange={handleFileChange} />
              </Form.Group>
              <Button variant="info" className="report-button" onClick={() => navigate('/informe')}>Enviar Informe</Button>
            </Card.Body>
          </Card>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default ViewCausa;

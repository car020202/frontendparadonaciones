import React, { useState } from 'react';
import { Container, Card, Button, Form } from 'react-bootstrap';
import Navbar from '../navbar/navbar';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';
import './view.css';

const ViewCausa = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [description, setDescription] = useState('Gracias a todas las personas que contribuyeron, hemos logrado un impacto significativo en la comunidad. Su apoyo ha sido fundamental para mejorar la calidad de vida de muchas personas. ¡Gracias por ser parte del cambio!');
  const navigate = useNavigate();

  const handleInformar = () => {
    navigate('/informe');
  };

  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  return (
    <>
      
      <div className="view-causa-background">
        <Container className="view-causa-container">
          <Card className="view-causa-card">
            <Card.Body>
              <h2 className="view-causa-title">Detalles de la Causa</h2>
              <Card.Text>
                <strong>Total Recaudado:</strong> $10,000
              </Card.Text>
              <Card.Text>
                <strong>Impacto Generado:</strong> Esta causa ha permitido alimentar a 100 familias durante un mes.
              </Card.Text>
              <Form.Group controlId="formDescription" className="mb-3">
                <Form.Label><strong>Descripción:</strong></Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </Form.Group>
              <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label><strong>Subir Fotos Relacionadas:</strong></Form.Label>
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
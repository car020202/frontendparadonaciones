import React, { useState } from 'react';
import Navbar from '../navbar/navbar';
import Footer from '../Footer/Footer';
import backgroundImage from '../assets/background2.webp';
import './GestionarCausas.css'

const CreateCausa = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [meta, setMeta] = useState('');
  const [donationType, setDonationType] = useState([]);
  const [images, setImages] = useState([]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleDonationTypeChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setDonationType((prev) => [...prev, value]);
    } else {
      setDonationType((prev) => prev.filter((type) => type !== value));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí podrías enviar los datos a una API o manejarlos como desees
    console.log({ title, description, meta, donationType, images });
    alert('Causa creada con éxito!');

    // Resetear formulario después de enviar
    setTitle('');
    setDescription('');
    setMeta('');
    setDonationType([]);
    setImages([]);
  };

  return (
    <>
      <Navbar />
      <div className="create-causa-container" style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '100px 0',
        height: 'auto',
      }}>

        <div className="form-container" style={{
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '20px',
          maxWidth: '600px',
          margin: '0 auto',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Crear Causa</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label htmlFor="title">Título:</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                required
              />
            </div>
            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label htmlFor="description">Descripción:</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ width: '100%', padding: '8px', minHeight: '100px', marginBottom: '10px' }}
                required
              />
            </div>
            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label htmlFor="meta">Meta o Monto:</label>
              <input
                type="number"
                id="meta"
                value={meta}
                onChange={(e) => setMeta(e.target.value)}
                style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                required
              />
            </div>
            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label>Tipo de Donación:</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label>
                  <input
                    type="checkbox"
                    value="Dinero"
                    onChange={handleDonationTypeChange}
                  /> Dinero
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="Servicio Social"
                    onChange={handleDonationTypeChange}
                  /> Servicio Social
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="Utensilios"
                    onChange={handleDonationTypeChange}
                  /> Utensilios
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="Todo"
                    onChange={handleDonationTypeChange}
                  /> Todo
                </label>
              </div>
            </div>
            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label htmlFor="images">Agregar archivos:</label>
              <input
                type="file"
                id="images"
                multiple
                onChange={handleImageUpload}
                style={{ display: 'block', marginBottom: '10px' }}
              />
            </div>
            <button type="submit" style={{
              display: 'block',
              width: '100%',
              padding: '10px',
              backgroundColor: '#007b8a',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}>
              Crear
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreateCausa;
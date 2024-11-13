import React, { useState, useEffect } from 'react';
import Navbar from '../navbar/navbar';
import Footer from '../Footer/Footer';
import axios from 'axios';
import backgroundImage from '../assets/background2.webp';
import './GestionarCausas.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateCausa = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [meta, setMeta] = useState('');
  const [donationType, setDonationType] = useState([]);
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Obtener las categorías al cargar el componente
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/categorias');
        setCategories(response.data);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
        setErrorMessage('Error al obtener las categorías');
      }
    };

    fetchCategories();
  }, []);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('nombreCausa', title);
    formData.append('descripcion', description);
    formData.append('meta', meta);
    formData.append('tipoDonacion', donationType.join(', '));
    formData.append('idCategoria', selectedCategory);
    
    if (images.length > 0) {
      formData.append('portada', images[0]); // Solo enviar la primera imagen como portada
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3000/api/causas', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setSuccessMessage('Causa creada con éxito!');
      setErrorMessage('');
      setTitle('');
      setDescription('');
      setMeta('');
      setDonationType([]);
      setImages([]);
      setSelectedCategory('');
    } catch (error) {
      console.error('Error al crear la causa:', error);
      setErrorMessage('Hubo un problema al crear la causa.');
      setSuccessMessage('');
    }
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
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          {successMessage && <p className="text-success">{successMessage}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Título:</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Descripción:</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="meta">Meta o Monto:</label>
              <input
                type="number"
                id="meta"
                value={meta}
                onChange={(e) => setMeta(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Tipo de Donación:</label>
              <div>
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
            <div className="form-group">
              <label htmlFor="category">Categoría:</label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="form-control"
                required
              >
                <option value="">Selecciona una categoría</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="images">Agregar portada:</label>
              <input
                type="file"
                id="images"
                onChange={handleImageUpload}
                className="form-control-file"
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
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

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
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

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
      formData.append('portada', images[0]);
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
        padding: '60px 0',
      }}>
        <div className="form-container" style={{
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '40px',
          maxWidth: '1000px',
          margin: '0 auto',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
        }}>
          <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#007c8c' }}>Crear Causa</h2>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          {successMessage && <p className="text-success">{successMessage}</p>}
          <form onSubmit={handleSubmit}>
            <div className="row mb-4">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="title" style={{ fontWeight: 'bold' }}>Título:</label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-control"
                    required
                    style={{ borderRadius: '5px' }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="meta" style={{ fontWeight: 'bold' }}>Meta o Monto:</label>
                  <input
                    type="number"
                    id="meta"
                    value={meta}
                    onChange={(e) => setMeta(e.target.value)}
                    className="form-control"
                    required
                    style={{ borderRadius: '5px' }}
                  />
                </div>
              </div>
            </div>

            <div className="form-group mb-4">
              <label htmlFor="description" style={{ fontWeight: 'bold' }}>Descripción:</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-control"
                required
                style={{ borderRadius: '5px', minHeight: '100px' }}
              />
            </div>

            <div className="row mb-4">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="startDateTime" style={{ fontWeight: 'bold' }}>Fecha y Hora de Inicio:</label>
                  <input
                    type="datetime-local"
                    id="startDateTime"
                    value={startDateTime}
                    onChange={(e) => setStartDateTime(e.target.value)}
                    className="form-control"
                    required
                    style={{
                      borderRadius: '5px',
                      border: '1px solid #ced4da',
                      padding: '10px',
                      fontSize: '16px',
                      backgroundColor: '#f9f9f9',
                      boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="endDateTime" style={{ fontWeight: 'bold' }}>Fecha y Hora de Fin:</label>
                  <input
                    type="datetime-local"
                    id="endDateTime"
                    value={endDateTime}
                    onChange={(e) => setEndDateTime(e.target.value)}
                    className="form-control"
                    required
                    style={{
                      borderRadius: '5px',
                      border: '1px solid #ced4da',
                      padding: '10px',
                      fontSize: '16px',
                      backgroundColor: '#f9f9f9',
                      boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </div>
              </div>
            </div>


            <div className="form-group mb-4">
              <label style={{ fontWeight: 'bold' }}>Tipo de Donación:</label>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '10px',
                marginTop: '5px'
              }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <input
                    type="checkbox"
                    value="Dinero"
                    onChange={handleDonationTypeChange}
                    style={{ transform: 'scale(1.2)' }}
                  /> Dinero
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <input
                    type="checkbox"
                    value="Servicio Social"
                    onChange={handleDonationTypeChange}
                    style={{ transform: 'scale(1.2)' }}
                  /> Servicio Social
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <input
                    type="checkbox"
                    value="Utensilios"
                    onChange={handleDonationTypeChange}
                    style={{ transform: 'scale(1.2)' }}
                  /> Utensilios
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <input
                    type="checkbox"
                    value="Todo"
                    onChange={handleDonationTypeChange}
                    style={{ transform: 'scale(1.2)' }}
                  /> Todo
                </label>
              </div>
            </div>



            <div className="row mb-4">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="category" style={{ fontWeight: 'bold' }}>Categoría:</label>
                  <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="form-control"
                    required
                    style={{ borderRadius: '5px' }}
                  >
                    <option value="">Selecciona una categoría</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="images" style={{ fontWeight: 'bold' }}>Agregar portada:</label>
                  <input
                    type="file"
                    id="images"
                    onChange={handleImageUpload}
                    className="form-control-file"
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block" style={{
              backgroundColor: '#007c8c',
              borderColor: '#007c8c',
              padding: '10px',
              fontSize: '16px',
              fontWeight: 'bold',
              borderRadius: '5px'
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

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import Footer from '../Footer/Footer';
import axios from 'axios';
import backgroundImage from '../assets/background2.webp';
import Swal from 'sweetalert2'; // Importar SweetAlert2

const CreateCausa = () => {
  const navigate = useNavigate(); // Inicializar navigate
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [meta, setMeta] = useState('');
  const [donationType, setDonationType] = useState([]);
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Obtener categorías al cargar el componente
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/categorias');
        setCategories(response.data);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
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

    if (!startDateTime || isNaN(new Date(startDateTime).getTime())) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, ingresa una fecha de inicio válida.',
        icon: 'error',
        confirmButtonText: 'Cerrar',
      });
      return;
    }

    if (!endDateTime || isNaN(new Date(endDateTime).getTime())) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, ingresa una fecha de fin válida.',
        icon: 'error',
        confirmButtonText: 'Cerrar',
      });
      return;
    }

    if (!selectedCategory || isNaN(parseInt(selectedCategory))) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, selecciona una categoría válida.',
        icon: 'error',
        confirmButtonText: 'Cerrar',
      });
      return;
    }

    const formData = new FormData();
    formData.append('nombreCausa', title);
    formData.append('descripcion', description);
    formData.append('meta', meta);
    formData.append('tipoDonacion', donationType.join(', '));
    formData.append('idCategoria', selectedCategory);
    formData.append('fechaInicio', startDateTime);
    formData.append('fechaFin', endDateTime);

    if (images.length > 0) {
      formData.append('portada', images[0]);
    }

    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3000/api/causas', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      // Alerta de éxito
      Swal.fire({
        title: '¡Causa creada con éxito!',
        text: 'Tu causa ha sido registrada correctamente.',
        icon: 'success',
        confirmButtonText: 'Ir al inicio',
        customClass: {
          confirmButton: 'custom-swal-button',
        },
        didOpen: () => {
          const confirmButton = Swal.getConfirmButton();
          confirmButton.style.backgroundColor = '#007c8c'; // Botón verde
          confirmButton.style.color = '#fff';
          confirmButton.style.border = 'none';
          confirmButton.style.borderRadius = '5px';
          confirmButton.style.padding = '10px 20px';
        },
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/'); // Redirige al inicio
        }
      });

      // Limpiar el formulario
      setTitle('');
      setDescription('');
      setMeta('');
      setDonationType([]);
      setImages([]);
      setSelectedCategory('');
      setStartDateTime('');
      setEndDateTime('');
    } catch (error) {
      console.error('Error al crear la causa:', error);

      // Alerta de error
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al crear la causa. Por favor, inténtalo nuevamente.',
        icon: 'error',
        confirmButtonText: 'Cerrar',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className="create-causa-container"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '60px 0',
        }}
      >
        <div
          className="form-container"
          style={{
            backgroundColor: 'white',
            borderRadius: '10px',
            padding: '40px',
            maxWidth: '1000px',
            margin: '0 auto',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
          }}
        >
          <h2
            style={{
              textAlign: 'center',
              marginBottom: '30px',
              color: '#007c8c',
            }}
          >
            Crear Causa
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="row mb-4">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="title" style={{ fontWeight: 'bold' }}>
                    Título:
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="meta" style={{ fontWeight: 'bold' }}>
                    Meta o Monto:
                  </label>
                  <input
                    type="number"
                    id="meta"
                    value={meta}
                    onChange={(e) => setMeta(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group mb-4">
              <label htmlFor="description" style={{ fontWeight: 'bold' }}>
                Descripción:
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-control"
                required
                style={{ minHeight: '100px' }}
              />
            </div>

            <div className="row mb-4">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="startDateTime" style={{ fontWeight: 'bold' }}>
                    Fecha y Hora de Inicio:
                  </label>
                  <input
                    type="datetime-local"
                    id="startDateTime"
                    value={startDateTime}
                    onChange={(e) => setStartDateTime(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="endDateTime" style={{ fontWeight: 'bold' }}>
                    Fecha y Hora de Fin:
                  </label>
                  <input
                    type="datetime-local"
                    id="endDateTime"
                    value={endDateTime}
                    onChange={(e) => setEndDateTime(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group mb-4">
              <label style={{ fontWeight: 'bold' }}>Tipo de Donación:</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                {['Dinero', 'Servicio Social', 'Utensilios', 'Todo'].map((type) => (
                  <label key={type} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <input
                      type="checkbox"
                      value={type}
                      onChange={handleDonationTypeChange}
                    />{' '}
                    {type}
                  </label>
                ))}
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="category" style={{ fontWeight: 'bold' }}>
                    Categoría:
                  </label>
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
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="images" style={{ fontWeight: 'bold' }}>
                    Agregar portada:
                  </label>
                  <input
                    type="file"
                    id="images"
                    onChange={handleImageUpload}
                    className="form-control-file"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
              style={{
                backgroundColor: '#007c8c',
                borderColor: '#007c8c',
                fontWeight: 'bold',
                fontSize: '18px', // Texto más grande
                display: 'block', // Para centrar el botón
                margin: '20px auto', // Centrar horizontalmente
              }}
            >
              {isLoading ? 'Creando...' : 'Crear'}
            </button>

          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreateCausa;

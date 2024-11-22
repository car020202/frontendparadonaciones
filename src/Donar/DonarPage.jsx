import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import backgroundImage from '../assets/background2.webp';
import axios from 'axios';
import Swal from 'sweetalert2';

const DonarPage = () => {
  const { idCausa } = useParams(); // Obtiene el ID de la causa desde la URL
  const navigate = useNavigate(); // Inicializa navigate
  const [donationEntries, setDonationEntries] = useState([
    {
      donationType: '',
      amount: '',
      serviceDetails: '',
      utensilsDescription: '',
      utensilImages: [],
      clothingDescription: '',
      clothingImages: [],
    },
  ]);

  // Añadir nueva entrada de donación
  const handleAddDonationEntry = () => {
    setDonationEntries([
      ...donationEntries,
      {
        donationType: '',
        amount: '',
        serviceDetails: '',
        utensilsDescription: '',
        utensilImages: [],
        clothingDescription: '',
        clothingImages: [],
      },
    ]);
  };

  // Eliminar entrada de donación
  const handleRemoveDonationEntry = (index) => {
    if (index !== 0) {
      const updatedEntries = donationEntries.filter((_, i) => i !== index);
      setDonationEntries(updatedEntries);
    }
  };

  // Manejar cambios en los campos de texto o select
  const handleInputChange = (index, field, value) => {
    const updatedEntries = [...donationEntries];
    updatedEntries[index][field] = value;
    setDonationEntries(updatedEntries);
  };

  // Manejar la carga de imágenes
  const handleImageUpload = (index, event, field) => {
    const files = Array.from(event.target.files);
    const updatedEntries = [...donationEntries];
    updatedEntries[index][field] = files;
    setDonationEntries(updatedEntries);
  };

  // Enviar datos al backend
  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    try {
      for (const entry of donationEntries) {
        const formData = new FormData();
        formData.append('idCausa', idCausa); // ID de la causa
        formData.append('tipoDonacion', entry.donationType);

        if (entry.donationType === 'dinero') {
          formData.append('monto', entry.amount);
        } else if (entry.donationType === 'servicio_social') {
          formData.append('descripcion', entry.serviceDetails);
        } else if (entry.donationType === 'ropa' || entry.donationType === 'utensilios') {
          formData.append(
            'descripcion',
            entry.donationType === 'ropa' ? entry.clothingDescription : entry.utensilsDescription
          );
          const images =
            entry.donationType === 'ropa' ? entry.clothingImages : entry.utensilImages;
          images.forEach((image) => formData.append('img', image));
        }

        await axios.post('http://localhost:3000/api/donaciones', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      Swal.fire({
        title: '¡Donación realizada!',
        text: 'Tu donación ha sido procesada con éxito. ¡Gracias por tu apoyo!',
        icon: 'success',
        confirmButtonText: 'Ir al inicio',
        customClass: {
          confirmButton: 'custom-swal-button',
        },
        didOpen: () => {
          const confirmButton = Swal.getConfirmButton();
          if (confirmButton) {
            confirmButton.style.backgroundColor = '#007B8A';
            confirmButton.style.color = '#fff';
            confirmButton.style.border = 'none';
            confirmButton.style.borderRadius = '5px';
            confirmButton.style.padding = '10px 20px';
            confirmButton.style.cursor = 'pointer';
          }
        },
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/');
        }
      });
    } catch (error) {
      console.error('Error al realizar la donación:', error);

      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un problema al procesar tu donación. Por favor, inténtalo nuevamente.',
        icon: 'error',
        confirmButtonText: 'Cerrar',
        didOpen: () => {
          const confirmButton = Swal.getConfirmButton();
          if (confirmButton) {
            confirmButton.style.backgroundColor = '#dc3545';
            confirmButton.style.color = '#fff';
            confirmButton.style.border = 'none';
            confirmButton.style.borderRadius = '5px';
            confirmButton.style.padding = '10px 20px';
            confirmButton.style.cursor = 'pointer';
          }
        },
      });
    }
  };

  return (
    <>
      <div
        className="donar-page-container"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '800px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '50px',
        }}
      >
        <div
          className="donar-page"
          style={{
            width: '100%',
            maxWidth: '800px',
            backgroundColor: 'white',
            padding: '50px',
            borderRadius: '10px',
            boxShadow: '0 0 20px rgba(0,0,0,0.2)',
          }}
        >
          <h1>Donar a la causa {idCausa}</h1>
          <p>Contribuye a una causa importante y ayuda a marcar la diferencia en la vida de quienes más lo necesitan.</p>

          {donationEntries.map((entry, index) => (
            <div
              key={index}
              style={{
                margin: '20px 0',
                border: '1px solid #ddd',
                borderRadius: '10px',
                padding: '20px',
                position: 'relative',
              }}
            >
              <h3>Tipo de donación:</h3>
              <select
                value={entry.donationType}
                onChange={(e) => handleInputChange(index, 'donationType', e.target.value)}
                style={{ padding: '10px', width: '100%' }}
              >
                <option value="">Selecciona una opción</option>
                <option value="dinero">Dinero</option>
                <option value="servicio_social">Servicio Social</option>
                <option value="ropa">Ropa</option>
                <option value="utensilios">Utensilios</option>
              </select>

              {entry.donationType === 'dinero' && (
                <div style={{ margin: '20px 0' }}>
                  <h3>Cantidad a donar:</h3>
                  <input
                    type="number"
                    value={entry.amount}
                    onChange={(e) => handleInputChange(index, 'amount', e.target.value)}
                    style={{ padding: '10px', width: '100%' }}
                    placeholder="Ingresa la cantidad que deseas donar"
                  />
                </div>
              )}

              {entry.donationType === 'servicio_social' && (
                <div style={{ margin: '20px 0' }}>
                  <h3>Detalles del servicio:</h3>
                  <textarea
                    value={entry.serviceDetails}
                    onChange={(e) => handleInputChange(index, 'serviceDetails', e.target.value)}
                    style={{ padding: '10px', width: '100%' }}
                    placeholder="Describe el tipo de servicio social que deseas ofrecer"
                  />
                </div>
              )}

              {entry.donationType === 'ropa' && (
                <div style={{ margin: '20px 0' }}>
                  <h3>Descripción de la ropa:</h3>
                  <textarea
                    value={entry.clothingDescription}
                    onChange={(e) => handleInputChange(index, 'clothingDescription', e.target.value)}
                    style={{ padding: '10px', width: '100%' }}
                    placeholder="Describe la ropa que deseas donar"
                  />
                  <h3 style={{ marginTop: '20px' }}>Subir fotos de la ropa:</h3>
                  <input
                    type="file"
                    multiple
                    onChange={(e) => handleImageUpload(index, e, 'clothingImages')}
                  />
                  <div className="clothing-preview" style={{ marginTop: '20px' }}>
                    {entry.clothingImages.map((image, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={URL.createObjectURL(image)}
                        alt={`Clothing ${imgIndex + 1}`}
                        style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '10px' }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {entry.donationType === 'utensilios' && (
                <div style={{ margin: '20px 0' }}>
                  <h3>Descripción de los utensilios:</h3>
                  <textarea
                    value={entry.utensilsDescription}
                    onChange={(e) => handleInputChange(index, 'utensilsDescription', e.target.value)}
                    style={{ padding: '10px', width: '100%' }}
                    placeholder="Describe los utensilios que deseas donar"
                  />
                  <h3 style={{ marginTop: '20px' }}>Subir fotos de los utensilios:</h3>
                  <input
                    type="file"
                    multiple
                    onChange={(e) => handleImageUpload(index, e, 'utensilImages')}
                  />
                  <div className="utensil-preview" style={{ marginTop: '20px' }}>
                    {entry.utensilImages.map((image, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={URL.createObjectURL(image)}
                        alt={`Utensil ${imgIndex + 1}`}
                        style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '10px' }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {index !== 0 && (
                <button
                  onClick={() => handleRemoveDonationEntry(index)}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    padding: '5px 10px',
                    cursor: 'pointer',
                  }}
                >
                  Eliminar
                </button>
              )}
            </div>
          ))}

          <button
            onClick={handleAddDonationEntry}
            style={{
              backgroundColor: '#007B8A',
              color: 'white',
              padding: '15px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginRight: '20px',
            }}
          >
            Añadir otra donación
          </button>

          <button
            onClick={handleSubmit}
            style={{
              backgroundColor: '#007B8A',
              color: 'white',
              padding: '15px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Donar Ahora
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DonarPage;

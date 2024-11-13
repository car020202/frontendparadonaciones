import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
//import './CausaDetalle.css';

const CausaDetalle = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Recibimos los datos de la causa desde el estado de la navegación o puedes cargarlos desde una API
  const { title, description, images, needs } = location.state || {};

  if (!title) {
    return <p>No hay detalles disponibles para esta causa.</p>;
  }

  return (
    <>
    
    <div className="causa-detalle-container">
      <button className="back-button" onClick={() => navigate(-1)}>Volver</button>

      <h2 className="causa-title">{title}</h2>

      <div className="causa-gallery">
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Imagen de ${title}`} className="causa-image" />
        ))}
      </div>

      <p className="causa-description">{description}</p>

      <h3>Especificaciones para donaciones:</h3>
      <ul className="causa-needs">
        {needs.map((need, index) => (
          <li key={index}>{need}</li>
        ))}
      </ul>

      <button className="donate-button" onClick={() => alert("Funcionalidad de donar próximamente")}>Donar</button>
    </div>
    </>
  );
};

export default CausaDetalle;

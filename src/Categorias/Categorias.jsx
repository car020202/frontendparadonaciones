import React from 'react';
import './Categorias.css';
import Navbar from '../navbar/navbar';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';


const categorias = [
  { id: 1, title: 'Salud', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40"><path fill="#007c8c" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 13h-2v-5H7v-2h4V7h2v5h4v2h-4z"/></svg> },
  { id: 2, title: 'Conmemoraciones', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40"><path fill="#007c8c" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg> },
  { id: 3, title: 'Emergencias', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40"><path fill="#007c8c" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg> },
  { id: 4, title: 'Gastos educativos', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40"><path fill="#007c8c" d="M12 4L2 9l10 5 10-5-10-5zm0 5.3L5.91 9 12 6.7 18.09 9 12 9.3z"/><path fill="#007c8c" d="M2 17v2h20v-2H2z"/></svg> },
  { id: 5, title: 'Animales', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40"><path fill="#007c8c" d="M12 4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM4 4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm16 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-7 6c-2.33 0-7 1.17-7 3.5V18h14v-4.5c0-2.33-4.67-3.5-7-3.5z"/></svg> },
  { id: 6, title: 'Medioambiente', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40"><path fill="#007c8c" d="M12 2C6.48 2 2 6.48 2 12c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8zm0 14c-2.21 0-4-1.79-4-4 0-1.66 1.34-3 3-3s3 1.34 3 3c0 2.21-1.79 4-4 4zM12 8c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/></svg> },
  { id: 7, title: 'Negocios', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40"><path fill="#007c8c" d="M4 6c-1.1 0-2 .9-2 2v10h6v4h8v-4h6V8c0-1.1-.9-2-2-2h-2.29l.3-1H6.99l.3 1H4zm2 2h2v2H6zm0 4h2v2H6zm8 10h-4v-2h4zm4-6h-4v2h4zM10 8h4v2h-4zm0 4h4v2h-4zm6 0h2v2h-2zm2-4v2h-2V8h2z"/></svg> },
  { id: 8, title: 'Comunidad', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40"><path fill="#007c8c" d="M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm-3.5 13c-.83 0-1.5-.67-1.5-1.5S7.67 14 8.5 14s1.5.67 1.5 1.5S9.33 17 8.5 17zm7 0c-.83 0-1.5-.67-1.5-1.5S14.67 14 15.5 14s1.5.67 1.5 1.5-1.5 1.5-1.5 1.5zM12 9c-2.21 0-4 1.79-4 4h8c0-2.21-1.79-4-4-4z"/></svg> },
  { id: 9, title: 'Competencias', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40"><path fill="#007c8c" d="M12 2L8 8h8z"/><path fill="#007c8c" d="M4 8l4 8h8l4-8zm8 8h-2v-2h2v2z"/></svg> },
  { id: 10, title: 'Artes creativas', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40"><path fill="#007c8c" d="M12 2c-5.53 0-10 4.47-10 10s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm-2 15h-2v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"/></svg> },
  { id: 11, title: 'Eventos', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40"><path fill="#007c8c" d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v17c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 17H5V8h14v12z"/></svg> },
  { id: 12, title: 'Deportes', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40"><path fill="#007c8c" d="M19 1H5C3.9 1 3 1.9 3 3v18c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm-4 14h-4v2H9v-4h6v2zm1.17-4.72l-.82 2.72h-2.1l.83-2.72h2.1z"/></svg> },
  { id: 13, title: 'Causas religiosas', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40"><path fill="#007c8c" d="M12 1L8.25 8H4l6.75 4.91L6 21l6-5.45L18 21l-4.75-8.09L20 8h-4.25L12 1z"/></svg> },
  { id: 14, title: 'Gastos familiares', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40"><path fill="#007c8c" d="M13 5h-2v4H7v2h4v4h2v-4h4v-2h-4V5z"/></svg> },
  { id: 15, title: 'Viajes', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40"><path fill="#007c8c" d="M12 2c-5.53 0-10 4.47-10 10s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 16l-5-5h10l-5 5z"/></svg> },
  { id: 16, title: 'Voluntariado', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40"><path fill="#007c8c" d="M10 2H8v2H6V2H4v2H2v16h20V4h-2V2h-2v2h-2V2h-2v2h-2V2h-2v2h-2V2zm2 14H4v2h8v-2zm6-4h2V6h-2v6zm-2 2h-2v4h2v-4zm-6-4v2h8v-2h-8z"/></svg> },
  { id: 17, title: 'Deseos', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40"><path fill="#007c8c" d="M12 2l1.09 3.14L16 7l-2.91.86L12 11l-1.09-3.14L8 7l2.91-.86L12 2zM2 20h20v2H2v-2zm10-5l1.09 3.14L16 17l-2.91.86L12 21l-1.09-3.14L8 17l2.91-.86L12 15z"/></svg> },
  { id: 18, title: 'Tecnología', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40"><path fill="#007c8c" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zM6 10h5v5H6zm7 5h5v5h-5z"/></svg> }
];

function Categorias() {
  return (
    <>
      <Navbar />
      <div className="categorias-container">
        <h1>Listado de Categorias</h1>
        <div className="categorias-grid">
          {categorias.map((categoria) => (
            <Link to="/vercausacategoria" key={categoria.id} state={{ nombreCategoria: categoria.title }} className="categoria-card-link">
            <div key={categoria.id} className="categoria-card">
              <div className="icon">{categoria.icon}</div>
              <h3>{categoria.title}</h3>
            </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Categorias;

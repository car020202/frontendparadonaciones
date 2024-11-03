import React, { useState } from 'react';
import Navbar from '../navbar/navbar';
import Footer from '../Footer/Footer';
import './CreateCausa.css';

const CreateCausa = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí podrías enviar los datos a una API o manejarlos como desees
    console.log({ title, description, images });
    alert('Causa creada con éxito!');

    // Resetear formulario después de enviar
    setTitle('');
    setDescription('');
    setImages([]);
  };

  return (
    <>
    <Navbar/>
    <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Crear tu Propia Causa de Recaudación</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="title">Título</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="description">Descripción</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            rows="4"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="images">Subir Imágenes</label>
          <input
            type="file"
            id="images"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="w-full"
          />
          {images.length > 0 && (
            <div className="mt-2">
              <p className="text-sm">Imágenes seleccionadas:</p>
              <ul className="list-disc ml-5 text-sm">
                {images.map((image, index) => (
                  <li key={index}>{image.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Crear Causa
        </button>
      </form>
    </div>
    <Footer/>
    </>
  );
};

export default CreateCausa;

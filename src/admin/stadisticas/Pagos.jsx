import React, { useState, useEffect } from 'react';
import Navbar from '../NarbarAdmin';
import axios from 'axios';

const DonationsHistory = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const fetchDonationsHistory = async () => {
      try {
        setLoading(true);
        setErrorMessage('');
        const endpoint = selectedDate
          ? `http://localhost:3000/api/donaciones/historial?fecha=${selectedDate}`
          : `http://localhost:3000/api/donaciones/historial`;

        console.log('Solicitando historial de donaciones del endpoint:', endpoint);
        const response = await axios.get(endpoint);
        console.log('Respuesta de la API:', response.data);

        setDonations(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener el historial de donaciones:', error);
        setErrorMessage('No se pudo cargar el historial de donaciones.');
        setLoading(false);
      }
    };

    fetchDonationsHistory();
  }, [selectedDate]);

  const handleDateChange = (event) => {
    const date = event.target.value;
    console.log('Fecha seleccionada:', date);
    setSelectedDate(date);
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '20px',
          backgroundColor: '#f9f9f9',
        }}
      >
        <div
          style={{
            marginLeft: '250px',
            width: '100%',
            maxWidth: '1500px',
            backgroundColor: '#ffffff',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h1
            style={{
              textAlign: 'center',
              marginBottom: '20px',
              color: '#007B8A', // Cambiado a verde
            }}
          >
            Historial de Donaciones
          </h1>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            style={{
              display: 'block',
              margin: '0 auto 20px auto',
              padding: '10px',
              fontSize: '16px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              width: '100%',
              maxWidth: '300px',
            }}
          />
          {loading ? (
            <p style={{ textAlign: 'center', fontSize: '18px' }}>Cargando historial...</p>
          ) : errorMessage ? (
            <p style={{ textAlign: 'center', color: 'red', fontSize: '18px' }}>{errorMessage}</p>
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                marginTop: '20px',
                maxHeight: '500px', // Limitar altura para permitir scroll
                overflowY: 'auto', // Activar scroll vertical
                paddingRight: '10px', // Espacio para el scroll
              }}
            >
              {donations.length > 0 ? (
                donations.map((donation) => (
                  <div
                    key={donation.id}
                    style={{
                      backgroundColor: '#ffffff',
                      width: '100%',
                      padding: '15px',
                      borderRadius: '10px',
                      border: '2px solid #007B8A', // Borde del mismo color
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                      display: 'flex',
                      flexWrap: 'wrap', // Permitir filas
                      gap: '20px',
                      fontSize: '16px', // Letras más grandes
                      minHeight: '100px', // Altura mínima de la tarjeta
                    }}
                  >
                    <p style={{ flex: '1', margin: '0' }}>
                      <strong>Usuario:</strong> {donation.usuarioNombre || 'Anónimo'}
                    </p>
                    <p style={{ flex: '1', margin: '0' }}>
                      <strong>Causa:</strong> {donation.causaNombre || 'Desconocida'}
                    </p>
                    <p style={{ flex: '1', margin: '0' }}>
                      <strong>Tipo:</strong> {donation.tipoDonacion}
                    </p>
                    <p style={{ flex: '1', margin: '0' }}>
                      <strong>Monto:</strong> {donation.monto ? `$${donation.monto}` : '-'}
                    </p>
                    <p style={{ flex: '1', margin: '0' }}>
                      <strong>Fecha:</strong>{' '}
                      {new Date(donation.fechaDonacion).toLocaleDateString()}
                    </p>
                    <p style={{ flex: '2', margin: '0' }}>
                      <strong>Descripción:</strong> {donation.descripcion || '-'}
                    </p>
                  </div>
                ))
              ) : (
                <p
                  style={{
                    textAlign: 'center',
                    fontSize: '18px',
                    color: '#777',
                  }}
                >
                  No se encontraron donaciones para la fecha seleccionada.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DonationsHistory;

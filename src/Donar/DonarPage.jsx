import React, { useState } from "react";
import Navbar from "../navbar/navbar";
import Footer from "../Footer/Footer";
import backgroundImage from '../assets/background2.webp';


const DonarPage = () => {
  const [donationType, setDonationType] = useState("");
  const [amount, setAmount] = useState("");
  const [serviceDetails, setServiceDetails] = useState("");
  const [utensilsDescription, setUtensilsDescription] = useState("");
  const [utensilImages, setUtensilImages] = useState([]);
  const [clothingDescription, setClothingDescription] = useState("");

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setUtensilImages(files);
  };

  const handleSubmit = () => {
    let donationInfo = `Donación realizada con tipo: ${donationType}`;
    if (donationType === "dinero") {
      donationInfo += `, cantidad: ${amount}`;
    } else if (donationType === "servicio_social") {
      donationInfo += `, detalles del servicio: ${serviceDetails}`;
    } else if (donationType === "utensilios") {
      donationInfo += `, descripción de utensilios: ${utensilsDescription}`;
    } else if (donationType === "ropa") {
      donationInfo += `, descripción de la ropa: ${clothingDescription}`;
    }
    alert(donationInfo);
  };

  return (
    <>
      <Navbar />
      <div className="donar-page-container" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center", minHeight: "800px", display: "flex", alignItems: "center", justifyContent: "center", padding: "50px" }}>
        <div className="donar-page" style={{ width: "100%", maxWidth: "800px", backgroundColor: "white", padding: "50px", borderRadius: "10px", boxShadow: "0 0 20px rgba(0,0,0,0.2)" }}>
          <h1>Donar a una Causa</h1>
          <p>Contribuye a una causa importante y ayuda a marcar la diferencia en la vida de quienes más lo necesitan.</p>
          <div style={{ margin: "20px 0" }}>
            <h3>Tipo de donación:</h3>
            <select
              value={donationType}
              onChange={(e) => setDonationType(e.target.value)}
              style={{ padding: "10px", width: "100%" }}
            >
              <option value="">Selecciona una opción</option>
              <option value="dinero">Dinero</option>
              <option value="servicio_social">Servicio Social</option>
              <option value="ropa">Ropa</option>
              <option value="utensilios">Utensilios</option>
            </select>
          </div>

          {donationType === "dinero" && (
            <div style={{ margin: "20px 0" }}>
              <h3>Cantidad a donar:</h3>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{ padding: "10px", width: "100%" }}
                placeholder="Ingresa la cantidad que deseas donar"
              />
            </div>
          )}

          {donationType === "servicio_social" && (
            <div style={{ margin: "20px 0" }}>
              <h3>Detalles del servicio:</h3>
              <textarea
                value={serviceDetails}
                onChange={(e) => setServiceDetails(e.target.value)}
                style={{ padding: "10px", width: "100%" }}
                placeholder="Describe el tipo de servicio social que deseas ofrecer"
              />
            </div>
          )}

          {donationType === "ropa" && (
            <div style={{ margin: "20px 0" }}>
              <h3>Descripción de la ropa:</h3>
              <textarea
                value={clothingDescription}
                onChange={(e) => setClothingDescription(e.target.value)}
                style={{ padding: "10px", width: "100%" }}
                placeholder="Describe la ropa que deseas donar"
              />
            </div>
          )}

          {donationType === "utensilios" && (
            <div style={{ margin: "20px 0" }}>
              <h3>Descripción de los utensilios:</h3>
              <textarea
                value={utensilsDescription}
                onChange={(e) => setUtensilsDescription(e.target.value)}
                style={{ padding: "10px", width: "100%" }}
                placeholder="Describe los utensilios que deseas donar"
              />
              <h3 style={{ marginTop: "20px" }}>Subir fotos de los utensilios:</h3>
              <input type="file" multiple onChange={handleImageUpload} />
              <div className="utensil-preview" style={{ marginTop: "20px" }}>
                {utensilImages.map((image, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(image)}
                    alt={`Utensil ${index + 1}`}
                    style={{ width: "100px", height: "100px", objectFit: "cover", marginRight: "10px" }}
                  />
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleSubmit}
            style={{ backgroundColor: "#007B8A", color: "white", padding: "15px 20px", border: "none", borderRadius: "5px", cursor: "pointer" }}
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
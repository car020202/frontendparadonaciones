import React from 'react';
import './Footercss/Footer.css'; 
import { FaFacebook, FaYoutube, FaTwitter, FaInstagram, FaMicrophone } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-links">
          <span className='footer-link'>&copy; 2024 Donate</span> &bull;
          <a href="#" className="footer-link">Condiciones</a>
          <a href="#" className="footer-link">Declaración de privacidad</a>
          <a href="#" className="footer-link">Información legal</a>
        </div>
        <div className="footer-icons">
          <a href="#" className="icon-link"><FaFacebook /></a>
          <a href="#" className="icon-link"><FaYoutube /></a>
          <a href="#" className="icon-link"><FaTwitter /></a>
          <a href="#" className="icon-link"><FaInstagram /></a>
          
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;


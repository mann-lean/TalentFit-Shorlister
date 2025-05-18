import React from 'react';
import '../css/Footer.css';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <p className="footer-text">© {new Date().getFullYear()} TalentFit Shortlister. All rights reserved.</p>
        <div className="footer-links">
         <Link to="/about" className="footer-link">About</Link>
        <Link to="/about#contact" className="footer-link">Contact</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

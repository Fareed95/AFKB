// src/components/Footer.jsx
import React from 'react';
import './Footer.css'; // Import CSS for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h2 className="footer-title">AFKB</h2>
        <p className="footer-description">
          Bringing you the best products and services to enhance your life.
        </p>
        <ul className="footer-links">
          <li><a href="https://github.com/Fareed95/AFKB">Github</a></li>
          <li><a href="https://www.linkedin.com/in/fareed-sayed-b39936280/">Developer</a></li>
          <li><a href="mailto:fareedsayed95@gmail.com">Contact Developer</a></li>
          <li><a href="../../../LICENSE">Privacy Policy</a></li>
        </ul>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

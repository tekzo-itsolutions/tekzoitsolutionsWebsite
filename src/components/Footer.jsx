import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src="public/images/tekzo logo 12.png" alt="Tekzo IT Solution" />
            <p>
              Transforming ideas into powerful digital solutions. Your trusted partner for web
              development, design, and social media excellence.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://www.instagram.com/tekzoitsolutions?igsh=MXBvaW5wNzVmNDV0dg=="
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/company-details">Company Details</Link>
              </li>
              <li>
                <Link to="/vision-mission">Vision & Mission</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            <ul className="footer-links">
              <li>
                <Link to="/services">Web Development</Link>
              </li>
              <li>
                <Link to="/services">Logo Design</Link>
              </li>
              <li>
                <Link to="/services">Branding</Link>
              </li>
              <li>
                <Link to="/services">Social Media</Link>
              </li>
              <li>
                <Link to="/services">UI/UX Design</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Terms & Conditions</h4>
            <ul className="footer-links">
              <li>
                <Link to="/terms">Terms of Service</Link>
              </li>
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/refund-policy">Refund Policy</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Tekzo IT Solution. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


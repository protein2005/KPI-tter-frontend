import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3">
      <div className="container">
        <div className="row">
          <div className="col-md-4 text-center text-md-start mb-3 mb-md-0">
            <h5 className="fw-bold">KPI-tter</h5>
            <p>Ваш найкращий помічник у навчанні та спілкуванні.</p>
          </div>
          <div className="col-md-4 text-center mb-3 mb-md-0">
            <h6>Корисні посилання</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-light text-decoration-none">
                  Про нас
                </Link>
              </li>
              <li>
                <Link to="/" className="text-light text-decoration-none">
                  Контакти
                </Link>
              </li>
              <li>
                <Link to="/" className="text-light text-decoration-none">
                  Допомога
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4 text-center text-md-end">
            <h6>Ми в соціальних мережах</h6>
            <Link to="/" className="text-light me-2">
              <FaFacebookF size={20} />
            </Link>
            <Link to="/" className="text-light me-2">
              <FaTwitter size={20} />
            </Link>
            <Link to="/" className="text-light me-2">
              <FaInstagram size={20} />
            </Link>
          </div>
        </div>
        <div className="text-center mt-3">
          <small>&copy; {new Date().getFullYear()} KPI-tter. Всі права захищено.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

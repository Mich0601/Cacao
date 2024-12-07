import React, { useState } from 'react';
import logococoa from '../assets/images/logococo.png';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Barra = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/blog'); 
  };

 
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="nav">
      <img src={logococoa} alt="Logo Cocoa" />

      <nav>
        <a href="/">Inicio<span></span></a>
        <a href="/#productos">Productos<span></span></a>
        <a href="/#nosotros">Nosotros<span></span></a>
        <a href="/#eventos">Eventos<span></span></a>
        <a href="/#servicios">Servicios<span></span></a>
        <a href="/#comentarios">Comentarios<span></span></a>

        
        <div className="dropdown">
          <button onClick={toggleDropdown} className="dropdown-toggle">
            Blog<span></span>
          </button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/blog" className="dropdown-item">Inicio</Link>
              <Link to="/articles" className="dropdown-item">Artículos</Link>
              <Link to="/EventSite" className="dropdown-item">Eventos</Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Barra;

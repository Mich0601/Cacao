import React from 'react'
import '../assets/styles/cuestions.css'
import whats from '../assets/icons/iconW.png';
import face from '../assets/icons/iconF.png';
import instagram from '../assets/icons/iconI.png';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Cuestions = () => {
  
  const navigate =useNavigate();
  const handleRedirect = () => {
    navigate('/contact'); 
  };


  return (
    <div className='content-questions'>
        <h1>Preguntas frecuentes</h1>
        <div className='questions'>
          <div className='first-content'>
          <Link to="/firstQuestion">Como puedo hacer una compra por unidad?</Link>
            <a href="#">Como puedo hacer un pedido a mayoreo?</a>
            <a href="#">Como puedo ser parte de la comunidad de Cacao?</a>
            <a href="#">Como puedo ser parte de la comunidad de Cacao?</a>
          </div>
          <div className='first-content'>
          <a href="#">Como puedo hacer una compra por unidad?</a>
            <a href="#">Como puedo hacer un pedido a mayoreo?</a>
            <a href="#">Como puedo ser parte de la comunidad de Cacao?</a>
            <a href="#">Como puedo ser parte de la comunidad de Cacao?</a>
          </div>
        </div>
        <div className='contact-questions'>
            <button onClick={handleRedirect}>Ponerme en contacto</button>
            <div className='socials1'>
            <div><a href="https://www.instagram.com/cacao.cocoa_with_cause?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" >
                <img src={instagram} alt='insta' /></a></div>
              <div><a href="" target="_blank" >
                <img src={face} alt='Facebook' /></a></div>
              <div><a href="" target="_blank" >
                <img src={whats} alt='whats' /></a></div>
            </div>
        </div>
    </div>
  )
}

export default Cuestions
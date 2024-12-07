import React from 'react'
import eventos_img2 from '../assets/images/eventos_2.jpeg'
import eventos_img3 from '../assets/images/eventos_3.jpeg'
import eventos_img from '../assets/images/eventos.jpeg'
import eventos2 from '../assets/images/eventos_2.jpg';
import eventos3 from '../assets/images/eventos_3.jpg';
import whats from '../assets/icons/iconW.png';
import face from '../assets/icons/iconF.png';
import instagram from '../assets/icons/iconI.png';
import { useNavigate } from 'react-router-dom';
const Services = () => {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate('/contact'); 
  };

  const Instagram = "https://www.instagram.com/cacao.cocoa_with_cause/";
  const Facebook = "https://www.instagram.com/cacao.cocoa_with_cause/";
  const Whatsp = "https://www.instagram.com/cacao.cocoa_with_cause/";

  return (
    <>
     <div className='header-section' id='servicios'>
        <h1>SERVICIOS</h1>
        <span>Si tienes un evento nos encantaría formar parte de él</span>
      </div>

    <div className='services-content'>
        <div className='services'>
            <div className='items-services'>
                <img className='services-images' src={eventos_img} alt="eventos" />
            </div>
            <div className='items-services'>
                <img className='item-1' src={eventos_img2} alt="" />
                <img className='item-1' src={eventos_img3} alt="" />
            </div>
        </div>
        <div className='services'>
            
            <div className='items-services'>
                <img className='item-1' src={eventos_img2} alt="" />
                <img className='item-1' src={eventos_img3} alt="" />
            </div>
            <div className='items-services'>
                <img className='services-images' src={eventos_img} alt="eventos" />
            </div>
        </div>
        <div className='button-section'>
            <div className='btn-contact'>
              <button onClick={handleRedirect}>Ponerme en contacto</button>
            </div>
            <div className='socials'>
            <div>
              <a href={Instagram} target="_blank" >
              <img src={instagram} href={Instagram} alt='Instagram' /></a></div>
              <div>
                <a href={Facebook} target="_blank" >
                <img src={face} alt='Facebook' /></a></div>
              <div>
                <a href={Whatsp} target="_blank" >
                <img src={whats} alt='WhatsApp' /></a></div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Services
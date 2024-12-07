
import React from 'react';
import '../assets/styles/thankYou.css';
import destello from '../assets/images/destellos1.png'
import destello2 from '../assets/images/destellos2.png'
const ThankYouWindow = ({ onClose }) => {
  return (
    <div className="thankyou-container2">
      <img src={destello} className="sparkles-left2" alt="Sparkle Left" />
      
      <div className="thankyou-box2">
        <h3>¡GRACIAS POR COMENTAR NUESTRO PRODUCTO!</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur. Proin varius varius tristique
          at phasellus vel commodo ac. Ultricies eget morbi lacus quis.
        </p>
        <button onClick={onClose}>Volver al producto</button> 
      </div>

      <img src={destello2} className="sparkles-right2" alt="Sparkle Right" />
    </div>
  );
};

export default ThankYouWindow;

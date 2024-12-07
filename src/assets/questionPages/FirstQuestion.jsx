import React from "react";
import "../styles/responseQuestions.css";
import Barra from "../../components/Barra";
import fondoQ from "../images/fondoQ.png";
import people from '../images/questionsP.png'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import whats from '../icons/iconW.png';
import face from '../icons/iconF.png';
import instagram from '../icons/iconI.png';
const FirstQuestion = () => {

  const navigate =useNavigate();
  const handleRedirect = () => {
    navigate('/contact'); 
  };




  return (
    <main className="questions-response-content">
      <Barra/>
      <div className="questions-response-box">
        <div className="questions-response-info">
          <h1>COMO PUEDO HACER UNA COMPRA POR UNIDAD?</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At tempora
            ut, necessitatibus accusamus illum consequuntur facilis minima
            recusandae magnam ab qui quos quam deserunt vero veniam odit
            delectus quasi maiores!
          </p>
          <div className="questions-response-numbers">
          <span>1. dskajhdadhadhalda</span>
          <span>2. adahjdkahdkajbdakdb</span>
          <span>3. akldjdaddadlakdaklaad</span>
          <span>4. ajdhaodhaolikhjaodlikhaoi</span>
          <span>5. akidaolidjaoidjadoiadoaihda</span>
          </div>
          
        </div>
        <div>
          <img src={people} alt="people" />
        </div>
      </div>
    <div className='questions-response-buttons'>
            <button onClick={handleRedirect}>Ponerme en contacto</button>
            <div className='questions-response-socials'>
              <div><img src={instagram} alt='WhatsApp' /></div>
              <div><img src={face} alt='Facebook' /></div>
              <div><img src={whats} alt='Instagram' /></div>
            </div>
        </div>
        </main>
    
  );
};

export default FirstQuestion;

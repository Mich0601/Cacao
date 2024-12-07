import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/comments.css'
import sendIcon from '../assets/images/send-icon.png';
import leftArrow from '../assets/images/izquierda.png';
import rightArrow from '../assets/images/derecha.png';
import hello from '../assets/images/hello1.png';
import Barra from "../components/Barra";


function ComentsClientes() {
  const [index, setIndex] = useState(0);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://18.205.185.20:8000/api/commentscarrusel/')
      .then(response => response.json())
      .then(data => setComments(data))
      .catch(error => console.error('Error fetching comments:', error));
  }, []);


    const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Formulario enviado");  

    const formData = new FormData(event.target);



    fetch('http://localhost:3000/api/commentscarrusel/add_commentU', {
      method: 'POST',
      body: formData,
    })

      .then(response => {
        if (response.status === 201) {
          window.location.reload(); 
        }
      })
      .catch(error => console.error('Error:', error));
  };

  const nextComment = () => {
    setIndex((prevIndex) => (prevIndex + 3) % comments.length);
  };

  const prevComment = () => {
    setIndex((prevIndex) => (prevIndex - 3 + comments.length) % comments.length);
  };

  const ArrowButton = ({ direction, onClick, icon }) => {
    return (
      <button onClick={onClick} className={`arrow-btn ${direction}`}>
        <img src={icon} alt={`Flecha ${direction}`} />
      </button>
    );
  };
  
  const CommentBox = ({ comment }) => {
    return (
      <div className="comment">
        <h3>{comment.username}</h3>
        <p>{comment.comment}</p>
      </div>
    );
  };

  const handleRedirect = () => { 
    navigate('/blog'); 
  };
  return (
    
    <div className="comments-container" id='comentarios'>
      <h2>COMENTARIOS DE NUESTROS CLIENTES</h2>
      <form className="comment-form" onSubmit={handleSubmit}>
      <label htmlFor="username">Déjanos un comentario:</label>
      <input type="text" placeholder="Nombre" id="username" name="username" required />
      <div className="textarea-wrapper">
        <textarea placeholder="Comentario" id="comment" name="comment" required></textarea>
        <button type="submit" className="send-btn">
          <img src={sendIcon} alt="Enviar" />
        </button>
      </div>
    </form>
      <div className="carousel-wrapper">
        <ArrowButton direction="left" onClick={nextComment} icon={leftArrow} />
        <div className="comment-box">
          {comments.length > 0 &&(
            <>
          <CommentBox comment={comments[index % comments.length]} />
          <CommentBox comment={comments[(index + 1) % comments.length]} />
          <CommentBox comment={comments[(index + 2) % comments.length]} />
          </>
        )}
        </div>
        <ArrowButton direction="right" onClick={prevComment} icon={rightArrow} />
      </div>
      <div className="divider"></div>






      <div className='hello-section'>
        <div className='hello-image'>
            <img src={hello} alt="" />
        </div>
        <div className='hello-description'>
            <h1>HOLA ME LLAMO CARLA</h1>
            <p>Soy la dueña de CACAO.COCOA. El camino del emprendedor no es una tarea fácil, al contrario, pero es algo que vale tanto la pena hacer, pero para mi en lo personal no ha sido sencillo, pues he atravesado muchos conflictos para llegar a donde estoy hoy y me gustaría que fueras parte de mi historia... 
                <br /> 
            </p>
            <p>
            Te invito cordialmente a que seas parte de CACAO.COCOA a través de nuestro blog, aquí compartimos un poco más de mujeres que han pasado por momentos difíciles pero que han logrado superarse:
            </p>
                <a href="">
                <button onClick={handleRedirect}>Ir al Blog</button> 
                </a>
        </div>
      </div>
    </div>
    
  );
};


export default ComentsClientes;

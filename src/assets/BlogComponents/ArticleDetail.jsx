import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Barra from "../../components/Barra";
import whats from '../icons/iconW.jpeg';
import face from '../icons/iconF.jpeg';
import instagram from '../icons/iconI.jpeg';
import '../styles/articleDetail.css'

const ArticleDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const { category, title, LongImg, LongD } = location.state || {};
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/contact");
  };

  return (
    <>
    <Barra/>
    <main className="article-detail-container">
        <div className="article-detail-image">
        {LongImg && (
        <img src={LongImg.startsWith("data:image") ? LongImg : `data:image/png;base64,${LongImg}`} alt="Imagen de artículo" />
      )}
        </div> 
    

      <h1 className="article-detail-title">{title}</h1>
      
      <div className="article-detail-description-container">
      <p className="article-detail-description">{LongD}</p>
      </div>
      

    </main>
    <div className='contact-blog-questions'>
            <button onClick={handleRedirect}>Ponerme en contacto</button>
            <div className='blog-socials'>
            <div><a href="https://www.instagram.com/cacao.cocoa_with_cause?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" >
                <img src={instagram} alt='insta' /></a></div>
              <div><a href="" target="_blank" >
                <img src={face} alt='Facebook' /></a></div>
              <div><a href="" target="_blank" >
                <img src={whats} alt='whats' /></a></div>
            </div>
        </div>
    </>
  );
};

export default ArticleDetail;

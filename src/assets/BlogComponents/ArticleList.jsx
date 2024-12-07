import React, { useState, useEffect } from "react";
import Barra from '../../components/Barra';
import bannerArticle from '../images/bannerArticles.png';
import { useNavigate } from "react-router-dom";
import '../styles/articlesList.css';
import whats from '../icons/iconW.jpeg';
import face from '../icons/iconF.jpeg';
import instagram from '../icons/iconI.jpeg';
import '../styles/BlogEvents.css';
import buttonRight from '../icons/arrow-right.png';
import flechaIz from '../images/flechaIz.png';
import flechaDe from '../images/flechaDe.png';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 12;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("http://18.205.185.20:8000/api/articulo/");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const articleData = await response.json();
        setArticles(articleData.slice(1));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const handleRedirect = () => {
    navigate("/contact");
  };

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  const handleArticleClick = (id, category, title, LongImg, LongD) => {
    navigate(`/articlesDetail/${id}`, { state: { category, title, LongImg, LongD } });
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const totalPages = Math.ceil(articles.length / articlesPerPage);

  const renderPagination = () => {
    const paginationButtons = [];
  
    
    for (let i = 1; i <= Math.min(3, totalPages); i++) {
      paginationButtons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={currentPage === i ? "active" : ""}
        >
          {i}
        </button>
      );
    }
  
    
    if (currentPage > 4) {
      paginationButtons.push(<span key="left-ellipsis">...</span>);
    }
  
    
    for (
      let i = Math.max(4, currentPage - 1);
      i <= Math.min(currentPage + 1, totalPages - 2);
      i++
    ) {
      paginationButtons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={currentPage === i ? "active" : ""}
        >
          {i}
        </button>
      );
    }
  
    
    if (currentPage < totalPages - 3) {
      paginationButtons.push(<span key="right-ellipsis">...</span>);
    }
  
    
    for (let i = Math.max(totalPages - 1, 4); i <= totalPages; i++) {
      paginationButtons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={currentPage === i ? "active" : ""}
        >
          {i}
        </button>
      );
    }
  
    return paginationButtons;
  };
  

  return (
    <>
      <Barra />
      <main>
        <section>
          <p className='articles-banner-title'>ARTICULOS</p>
          <div>
            <img className='articles-banner' src={bannerArticle} alt="" />
          </div>
        </section>

        <section className='articles-container'>
          {loading ? (
            <p>Cargando...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            currentArticles.map((article, index) => (
              <div
                key={index}
                className='article'
                onClick={() => handleArticleClick(article._id, article.category, article.title, article.LongImg, article.LongD)}
              >
                <img src={article.ShortImg} alt="" />
                <p className='article-category'>{article.category}</p>
                <p className='article-title'>{article.title}</p>
                <p className='article-description'>{article.ShortD}</p>
              </div>
            ))
          )}
        </section>

        {totalPages > 1 && (
          <div className="pagination-blogE2">
            <img className='flechaArt' src={flechaIz} alt="" />
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
            
            Previous
           
            </button>
            
            {renderPagination()}
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next
           
            </button> <img className='flechaArt' src={flechaDe} alt="" />
          </div>
        )}
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

export default ArticleList;

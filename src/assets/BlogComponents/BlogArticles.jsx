import React, { useState, useEffect } from "react";
import '../styles/blogArticles.css'
import articleImg from '../images/articleImg.png'
import { useNavigate } from 'react-router-dom'

const BlogArticles = () => {

  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/articles");
  };

  const handleArticleClick = (id, category, title, LongImg, LongD) => {
    navigate(`/articlesDetail/${id}`, { state: { category, title, LongImg, LongD } });
  };

  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("http://18.205.185.20:8000/api/articulo/");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const articleData = await response.json();
        setArticles(articleData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);



  return (
    <>
    <main className='articles-container'>
        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (

          articles.slice(1, 9).map((article, index) => (
            <div key={index} className='article' onClick={() => handleArticleClick(article._id, article.category, article.title, article.LongImg, article.LongD)} >
              <img src={article.ShortImg} alt="" />
              <p className='article-category'>{article.category}</p>
              <p className='article-title'>{article.title}</p>
              <p className='article-description'>{article.ShortD}</p>
            </div>
          ))
        )}
      </main>
    <button onClick={handleRedirect} className='btn-article-more'>Ver mas</button>
    </>
  )
}

export default BlogArticles
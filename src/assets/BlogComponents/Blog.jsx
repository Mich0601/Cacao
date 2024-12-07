import React, { useState, useEffect } from "react";
import Barra from "../../components/Barra";
import hello from "../images/hello1.png";
import { useNavigate } from "react-router-dom";
import "../styles/blog.css";
import '../styles/BlogEvents.css';
import buttonRight from '../icons/arrow-right.png';
import whats from '../icons/iconW.jpeg';
import face from '../icons/iconF.jpeg';
import instagram from '../icons/iconI.jpeg';
import contactImg from '../images/contactsImg.png';
import BlogArticles from "./BlogArticles";
import flecha from '../images/flechab.png';
const Blog = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/literature");
  };
  const handleButtonClick = () => {
    navigate('/EventSite');
  };
  const handleRedirect2 = (id) => {
    navigate(`/EventDetail/${id}`);
  };

  const handleArticleClick = (id, category, title, LongImg, LongD) => {
    navigate(`/articlesDetail/${id}`, { state: { category, title, LongImg, LongD } });
  };

  const handleRedirect3 = () => {
    navigate('/contact');
  };


  const [articles, setArticles] = useState([]);
  const [events, setEvents] = useState([]);
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

    const fetchEvents = async () => {
      try {
        const response = await fetch("http://18.205.185.20:8000/api/events/events");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const eventData = await response.json();
        setEvents(eventData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchArticles();
    fetchEvents(); 
  }, []);

  const firstArticle = articles.length > 0 ? articles[0] : null;
  const upcomingEvents = events.filter(event => event.status === 'PROXIMOS').slice(0, 3);

  return (
    <>
      <Barra />
      <main className="main-blog">
        <section>
          <div className="hello-blog">
            <div className="hello-blog-description">
              <h1>Carla Olivares Rueda</h1>
              <h2>Mama esposa emprendedora y <span>Sobreviviente</span></h2>
              <p>
                Carla Olivares R. es una madre y esposa emprendedora que, tras <br /> superar numerosas adversidades, hoy se destaca como una <br /> verdadera sobreviviente.
                <br />
              </p>
              <a href="">
                <button onClick={handleRedirect}>Mas informacion
                  <img src={buttonRight} alt="" />
                </button>
              </a>
            </div>
            <div className="hello-blog-image">
              <img src={hello} alt="" />
            </div>
          </div>
        </section>
        <section>
          <div className='contact-blog-questions'>
            <button onClick={handleRedirect3}>Ponerme en contacto</button>
            <div className='blog-socials'>
            <div><a href="https://www.instagram.com/cacao.cocoa_with_cause?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" >
                <img src={instagram} alt='insta' /></a></div>
              <div><a href="" target="_blank" >
                <img src={face} alt='Facebook' /></a></div>
              <div><a href="" target="_blank" >
                <img src={whats} alt='whats' /></a></div>
            </div>
          </div>
        </section>
        <section className="blogs">
          <span>BLOG</span>
          <div className="blog-presentation" onClick={() => handleArticleClick(firstArticle._id, firstArticle.category, firstArticle.title, firstArticle.LongImg, firstArticle.LongD)}>
            {firstArticle ? (
              <>
                <img src={firstArticle.LongImg} alt="" />
                <p className="blog-category">{firstArticle.category}</p>
                <p className="blog-title">{firstArticle.title}</p>
                <p className="blog-description">{firstArticle.ShortD}</p>
              </>
            ) : (
              loading ? <p>Cargando...</p> : <p>Error: {error}</p>
            )}
          </div>
        </section>
        <section>
          <BlogArticles />
        </section>
        <section>
          <div className="blog-contact-info">
            <div className="blog-contact-contacts">
              <p>No te pierdas la información sobre nuestras conferencias <br /> y eventos. Si deseas más detalles de algún evento en <br /> particular, contáctanos a:</p>
              <span>IG: cacao.cocoa_with_cause</span>
              <span>Phone: 825202634</span>
              <span>Email: carla@cacaococoa.ca</span>
            </div>
            <div><img src={contactImg} alt="" /></div>
          </div>
        </section>
        
       
        <p className="fin-event">EVENTOS </p>
        <section className="upcoming-events">
        <div className="Container-events-First">
        <div className="events-box-blogE">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((item) => (
              <div key={item._id} className="event-card-blogE2">
              <span className="direction-blogE">{item.title}</span>
              <p className="Dir-blogE">{item.direccion}</p>
              <p className="Dir-blogE2">{item.shortDescription}</p>
              <hr className="thin-line-blogE" />
              <div className="btn-more3-blogE">
                <button onClick={() => handleRedirect2(item._id)}>View Event Details
                <img className='flechab' src={flecha} alt="" />
                </button>
              </div>
              </div>
              
            ))
          ) : (
            <p>No hay eventos próximos</p>
          )}
          </div>
          </div>
          <button className="btn-events-moreb" onClick={handleButtonClick}>Ver más
          <img className='btn-more-art' src={buttonRight} alt="" />
          </button>
        </section>
        
       
      </main>
    </>
  );
};

export default Blog;

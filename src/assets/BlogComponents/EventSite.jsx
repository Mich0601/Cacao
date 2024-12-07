import React, { useState, useEffect } from 'react';
import Barra from "../../components/Barra";
import '../styles/EventSite.css'
import flecha from '../images/flechab.png'
import logococoa from '../images/logococo.png';
import { useNavigate } from 'react-router-dom';
import flechaIz from '../images/flechaIz.png';
import flechaDe from '../images/flechaDe.png';
import whats from '../icons/iconW.jpeg';
import face from '../icons/iconF.jpeg';
import instagram from '../icons/iconI.jpeg';

const EventSite = () => {

  const navigate = useNavigate();

  
  const handleRedirect = (id) => {
    navigate(`/EventDetail/${id}`);
  };
  const handleRedirect2 = () =>{
    navigate ("/contact");
  };

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [currentPageUpcoming, setCurrentPageUpcoming] = useState(1);
  const [currentPageExpired, setCurrentPageExpired] = useState(1);

  const eventsPerPage = 3;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://18.205.185.20:8000/api/events/events");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const eventsData = await response.json();
        setEvents(eventsData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const upcomingEvents = events.filter(event => event.status === "PROXIMOS");
  const expiredEvents = events.filter(event => event.status === "EXPIRADO");

  const indexOfLastUpcomingEvent = currentPageUpcoming * eventsPerPage;
  const indexOfFirstUpcomingEvent = indexOfLastUpcomingEvent - eventsPerPage;
  const currentUpcomingEvents = upcomingEvents.slice(indexOfFirstUpcomingEvent, indexOfLastUpcomingEvent);

  const totalUpcomingPages = Math.ceil(upcomingEvents.length / eventsPerPage);

  const handleNextPageUpcoming = () => {
    if (currentPageUpcoming < totalUpcomingPages) setCurrentPageUpcoming(currentPageUpcoming + 1);
  };

  const handlePrevPageUpcoming = () => {
    if (currentPageUpcoming > 1) setCurrentPageUpcoming(currentPageUpcoming - 1);
  };

  const indexOfLastExpiredEvent = currentPageExpired * eventsPerPage;
  const indexOfFirstExpiredEvent = indexOfLastExpiredEvent - eventsPerPage;
  const currentExpiredEvents = expiredEvents.slice(indexOfFirstExpiredEvent, indexOfLastExpiredEvent);

  const totalExpiredPages = Math.ceil(expiredEvents.length / eventsPerPage);

  const handleNextPageExpired = () => {
    if (currentPageExpired < totalExpiredPages) setCurrentPageExpired(currentPageExpired + 1);
  };

  const handlePrevPageExpired = () => {
    if (currentPageExpired > 1) setCurrentPageExpired(currentPageExpired - 1);
  };

  return (
    <>
      <Barra/>
    <div className='container-events-all'>
      <div className="header-image-blogE">
        <div className="blur-background-blogE"></div>
        <div className="header-text-blogE">EVENTOS</div>
      </div>
      
      <div className="body-text-blogE">PROXIMOS</div>
      <div className="Container-events-First" id="eventos">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}

        <div className="events-box-blogE">
          {currentUpcomingEvents.length === 0 && !loading && <p>No se encontraron eventos próximos</p>}
          {currentUpcomingEvents.map((item) => (
            <div key={item._id} className="event-card-blogE">
              <span className="direction-blogE">{item.title}</span>
              <p className="Dir-blogE">{item.direccion}</p>
              <p className="Dir-blogE2">{item.shortDescription}</p>
              <hr className="thin-line-blogE" />
              <div className="btn-more3-blogE">
                <button onClick={() => handleRedirect(item._id)}>View Event Details
                <img className='flechab' src={flecha} alt="" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="pagination-blogE">
        <img className='flechaArt' src={flechaIz} alt="" />
          <button onClick={handlePrevPageUpcoming} disabled={currentPageUpcoming === 1}>
          
          Previous</button>
          {Array.from({ length: totalUpcomingPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPageUpcoming(page)}
              className={currentPageUpcoming === page ? "active" : ""}
            >
              {page}
            </button>
          ))}
          <button onClick={handleNextPageUpcoming} disabled={currentPageUpcoming === totalUpcomingPages}>
            Next
            
            </button>
            <img className='flechaArt' src={flechaDe} alt="" />
        </div>
      </div>

      <div className="body2-text-blogE">EXPIRADO</div>
      <div className="Container-events-First2">
        <div className="events-box-blogE">
          {currentExpiredEvents.length === 0 && <p>No se encontraron eventos expirados</p>}
          {currentExpiredEvents.map((item) => (
            <div key={item._id} className="event-card-blogE">
              <span className="direction-blogE">{item.title}</span>
              <p className="Dir-blogE">{item.direccion}</p>
              <p className="Dir-blogE2">{item.shortDescription}</p>
              <hr className="thin-line-blogE" />
              <div className="btn-expired-blogE">
                <button>View Event Details
                <img className='flechab' src={flecha} alt="" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="pagination-blogE">
        <img className='flechaArt' src={flechaIz} alt="" />
          <button onClick={handlePrevPageExpired} disabled={currentPageExpired === 1}>
          
          Previous</button>
          {Array.from({ length: totalExpiredPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPageExpired(page)}
              className={currentPageExpired === page ? "active" : ""}
            >
              {page}
            </button>
          ))}
          <button onClick={handleNextPageExpired} disabled={currentPageExpired === totalExpiredPages}>Next 
          
          </button>
          <img className='flechaArt' src={flechaDe} alt="" />
        </div>
      </div>
    </div>
    <div className='contact-blog-questions'>
            <button onClick={handleRedirect2}>Ponerme en contacto</button>
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

export default EventSite;

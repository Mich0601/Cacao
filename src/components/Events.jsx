import React, { useState, useEffect } from 'react';
import Barra from "../components/Barra";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className='events-content' id='eventos'>
      <h2 className='event-title'>PROXIMOS EVENTOS</h2>
      <div className='events-box'>
        <div className='section-top'>
          {events.length === 0 ? (
            <p>No products found</p>
          ) : (
            events.slice(0, 4).map((item, index) => (  
              <div
                key={index}
                style={{ 
                  backgroundImage: `url(${item.image})`, 
                  backgroundSize: 'cover', 
                  backgroundPosition: 'center'
                }}
              >
                <div className='description-event'>
                  <p>{item.date}</p> 
                  <span className='direction'>{item.title}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;

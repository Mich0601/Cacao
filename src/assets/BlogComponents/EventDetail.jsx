import React, { useEffect, useState } from 'react';
import '../styles/EventDetail.css';
import Barra from "../../components/Barra";
import whats from '../icons/iconW.jpeg';
import face from '../icons/iconF.jpeg';
import instagram from '../icons/iconI.jpeg';
import { useParams, useNavigate } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'; 


const App = () => {
    
    const navigate = useNavigate();
    const handleRedirect = () =>{
        navigate ("/contact");
    };
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  const [mapPosition, setMapPosition] = useState({ lat: 0, lng: 0 }); 

  useEffect(() => {
    
    fetch('http://18.205.185.20:8000/api/events/events')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la red: ' + response.status);
        }
        return response.json();
      })
      .then(data => {
        console.log("Eventos recibidos:", data);
        const selectedEvent = data.find(event => event._id.toString() === id.toString());
        console.log("Evento seleccionado:", selectedEvent); 
        setEvent(selectedEvent);
      })
      .catch(error => {
        console.error('Error al obtener el evento:', error);
        setError('Error al cargar el evento.');
      });
  }, [id]);

  
  const getLatLng = (direccion) => {
    return { lat: -34.397, lng: 150.644 }; 
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!event) {
    return <div>Cargando...</div>;
  }

  return (
    <>
    <Barra/>
    <div className="event-container">
      <h1>{event.title}</h1>
      <h3>{event.direccion} / {event.date}</h3>
      {event.image && <img src={event.image} alt={event.title} />}
      <p>{event.longDescription}</p> 
      <LoadScript googleMapsApiKey="AIzaSyDfsTYQu6uJ343sAJsYnG9cJalLlHOMu0Q">
        <GoogleMap
          mapContainerStyle={{ height: "400px", width: "100%" }}
          center={mapPosition}
          zoom={10}
        >
          <Marker position={mapPosition} />
        </GoogleMap>
      </LoadScript>
      <h4>HORARIO Y LUGAR:</h4>
      <h5>{event.date}, {event.time}</h5>
      <h5>{event.direccion}</h5>
    </div>
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

export default App;

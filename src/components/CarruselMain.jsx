import React, { useState, useEffect, useRef } from 'react';
import whats from '../assets/icons/iconW.png';
import face from '../assets/icons/iconF.png';
import instagram from '../assets/icons/iconI.png';
import leftArrow from '../assets/icons/leftArrow.png';
import rightArrow from '../assets/icons/rightArrow.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CarruselMain = () => {
  const litRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(1); 
  const [data, setData] = useState([]); 
  const [isAnimating, setIsAnimating] = useState(false);
  const [showArrows, setShowArrows] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarouselImages = async () => {
      try {
        const response = await axios.get('http://18.205.185.20:8000/api/carrusel/');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching carousel images:', error);
      }
    };

    fetchCarouselImages();
  }, []);

  useEffect(() => {
    if (data.length > 1 && litRef.current) {
      const listNode = litRef.current;
      const imgNode = listNode.querySelectorAll('li > img')[currentIndex];
  
      if (imgNode) {
        imgNode.scrollIntoView({
          behavior: isAnimating ? 'smooth' : 'auto',
          block: 'center',
          inline: 'center'
        });
      }
    }
  }, [currentIndex, isAnimating, data]);

  const scrollToImage = (direction) => {
    event.preventDefault();

    if (isAnimating) return; 
    setIsAnimating(true);

    if (direction === 'prev') {
      setCurrentIndex((curr) => curr - 1);
    } else {
      setCurrentIndex((curr) => curr + 1);
    }
  };

  useEffect(() => {
    if (currentIndex === 0) {
      setTimeout(() => {
        setIsAnimating(false);
        setCurrentIndex(data.length); 
      }, 900); 
    } else if (currentIndex === data.length + 1) {
      setTimeout(() => {
        setIsAnimating(false);
        setCurrentIndex(1); 
      }, 900);
    } else {
      setTimeout(() => setIsAnimating(false), 900); 
    }
  }, [currentIndex, data.length]);

  const handleRedirect = () => {
    navigate('/contact'); 
  };

  return (
    <>
      <div 
        className='main-container'
        onMouseEnter={() => setShowArrows(true)}  
        onMouseLeave={() => setShowArrows(false)} 
      >
        <div className='slider-container'>
          <div className='info-container'>
            <div className='btn-contact'>
              <button onClick={handleRedirect}>Ponerme en contacto</button>
            </div>
            <div className='socials'>
            <div><a href="https://www.instagram.com/cacao.cocoa_with_cause?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" >
                <img src={instagram} alt='insta' /></a></div>
              <div><a href="" target="_blank" >
                <img src={face} alt='Facebook' /></a></div>
              <div><a href="" target="_blank" >
                <img src={whats} alt='whats' /></a></div>
            </div>
          </div>
          {showArrows && (  
            <>
              <div className='leftArrow' onClick={(e) => scrollToImage('prev', e)}>
                <img src={leftArrow} alt="" />
              </div>
              <div className='rightArrow' onClick={(e) => scrollToImage('next', e)}>
                <img src={rightArrow} alt="" />
              </div>
            </>
          )}
          <div className='container-images'>
            <ul ref={litRef}>
              {data.length > 0 && (
                <>
                  <li key="duplicate-last">
                    <img src={data[data.length - 1].image} alt='Carrusel' />
                  </li>
                  {data.map((item, index) => (
                    <li key={item._id}>
                      <img src={item.image} alt='Carrusel' />
                    </li>
                  ))}
                  <li key="duplicate-first">
                    <img src={data[0].image} alt='Carrusel' />
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarruselMain;

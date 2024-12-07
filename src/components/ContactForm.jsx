import React, { useState } from 'react';
import '../assets/styles/contact.css';
import Barra from '../components/Barra';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const ErrorModal = ({ onClose }) => {
        return (
            <div id="errorModal" className={`modall ${showErrorModal ? 'active' : ''}`}>
                <div className="modal-content-error">
                    <h2>LO SENTIMOS</h2>
                    <p>No se ha logrado enviar correctamente su contacto, por favor intente de nuevo.</p>
                    <button onClick={onClose}>Volver a intentar</button>
                </div>
            </div>
        );
    };

    const SuccessModal = ({ onClose }) => {
        return (
            <div id="successModal" className={`modall ${showSuccessModal ? 'active' : ''}`}>
                <div className="modal-content">
                    <h2>¡GRACIAS POR LA CONFIANZA!</h2>
                    <p>Nos pondremos en contacto con usted <br /> lo antes posible.</p>
                    <button onClick={onClose}>Volver</button>
                </div>
            </div>
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://18.205.185.20:8000/api/email/send', {  
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data.message === "Correo enviado con éxito") {
                setShowSuccessModal(true);  
            } else {
                setShowErrorModal(true);  
            }
        })
        .catch((error) => {
            console.error('Error al hacer la solicitud:', error);
            setShowErrorModal(true); 
        });
    };

    
    const handleCloseAndReload = () => {
        window.location.reload();
    };

    return (
        <div>
            <Barra />
            <main>
                <div className="contact-container-contact">
                    <form className="contact-form" id="contactForm" onSubmit={handleSubmit}>
                        <h2>CONTACTO</h2>
                        <div className="form-group">
                            <label className='labels' htmlFor="name">Nombre:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className='labels' htmlFor="email">Correo:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className='label-message' htmlFor="message">Mensaje:</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <button type="submit">Enviar</button>
                    </form>
                </div>
                
                
                {showSuccessModal && <SuccessModal onClose={handleCloseAndReload} />}
                {showErrorModal && <ErrorModal onClose={handleCloseAndReload} />}
            </main>
        </div>
    );
};

export default ContactForm;

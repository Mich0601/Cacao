import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ThankYouWindow from "../components/ThankYouWindow";
import sendIcon from "../assets/images/send-icon.png";
import Whats from "../assets/images/what.png";
import Face from "../assets/images/face.png";
import Insta from "../assets/images/insta.png";
import loaderImage from "../assets/images/loaderImage.png";
import "../assets/styles/productDesc.css";
import { useNavigate } from "react-router-dom";
import logococoa from "../assets/images/logococo.png";
import Barra from '../components/Barra';

const Loading = () => {
  return (
    <div className="loading-screen">
      <img src={loaderImage} alt="Cargando..." className="loader-c" />
      <div>
        <p className="loading-text">Cargando...</p>
      </div>
    </div>
  );
};

const ProductDesc = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState(null);
  const [showThankYou, setShowThankYou] = useState(false);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const API_URL = "https://0yuiclk74a.execute-api.us-east-1.amazonaws.com/cacao/";
  const { productNumber } = useParams();
  const navigate = useNavigate();
  const handleInstagramClick = () => {
    window.open("https://www.instagram.com/cacao.cocoa_with_cause/", "_blank");
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(API_URL);
        
        // Parseamos la respuesta JSON en el campo body
        const productsList = JSON.parse(response.data.body);
        setProducts(productsList);

        const initialProduct = productNumber
          ? productsList[productNumber - 1]
          : productsList[0];

        if (initialProduct) {
          setSelectedProduct(initialProduct);
          setMainImage(initialProduct.image);
          setPrice(initialProduct.precios.chico);
          fetchComments(initialProduct._id);
        }
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [productNumber]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setMainImage(product.image);
    setPrice(product.precios.chico);
    fetchComments(product._id);
  };

  const handleThumbnailClick = (img) => {
    setMainImage(img);
  };

  const fetchComments = async (productId) => {
    try {
      const response = await fetch(
        `http://18.205.185.20:8000/api/commentscarrusel/product_comments/${productId}`
      );
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://18.205.185.20:8000/api/commentscarrusel/add_product/${selectedProduct._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: name,
            comment: comment,
          }),
        }
      );

      if (response.ok) {
        setShowThankYou(true);
        setName("");
        setComment("");
        fetchComments(selectedProduct._id);
      } else {
        console.error("Error submitting comment");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleCloseThankYou = () => {
    setShowThankYou(false);
  };

  const handleSizeChange = (size) => {
    setPrice(selectedProduct.precios[size.toLowerCase()]);
  };

  const [visibleProducts, setVisibleProducts] = useState(3);

  const handleShowMoreProducts = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 3);
  };

  const handleRedirect = () => {
    navigate("/contact");
  };

  const [visibleComments, setVisibleComments] = useState(4);

  const handleShowMoreComments = () => {
    setVisibleComments((prevVisibleComments) => prevVisibleComments + 4);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Barra />
      <div className="co">
        <div className="container2">
          <div className="content">
            <div className="columns">
              <div className="left-column">
                <div className="image-gallery">
                  <div className="main-image">
                    {mainImage && (
                      <img
                        src={mainImage}
                        alt={
                          selectedProduct
                            ? selectedProduct.title
                            : "Imagen principal"
                        }
                        className="product-main-image2"
                      />
                    )}
                  </div>
                  <div className="thumbnail-images2">
                    {selectedProduct &&
                      selectedProduct.detailed_images.map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={`Thumbnail2 ${index + 1}`}
                          className="thumbnail2"
                          onClick={() => handleThumbnailClick(img)}
                        />
                      ))}
                  </div>
                </div>
                <hr className="thin-line" />
                <h2 className="h2">Seguir explorando</h2>
                <div className="product-container2">
                  {products.slice(0, visibleProducts).map((product, index) => (
                    <div
                      key={index}
                      className="product-box"
                      onClick={() => handleProductClick(product)}
                    >
                      <div className="product-content">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="product-image"
                        />
                        <strong>{product.title}</strong>
                        <p className="product-description">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                {visibleProducts < products.length && (
                  <div className="btn-more2">
                    <button onClick={handleShowMoreProducts}>Ver más</button>
                  </div>
                )}
              </div>
              <div className="right-column">
                {selectedProduct ? (
                  <>
                    <div className="product-desc-container">
                      <div className="product-container">
                        <h1>{selectedProduct.title}</h1>
                        <p className="price">${price} USD</p>
                        <div className="size-buttons">
                          <button onClick={() => handleSizeChange("chico")}>
                            Chico
                          </button>
                          <button onClick={() => handleSizeChange("grande")}>
                            Grande
                          </button>
                          <button onClick={() => handleSizeChange("caja")}>
                            Caja
                          </button>
                        </div>
                        <div className="description-section">
                          <h2>Descripción:</h2>
                          <p>{selectedProduct.description}</p>
                        </div>
                        <div className="description-section">
                          <h2>Beneficios:</h2>
                          <p>{selectedProduct.beneficios}</p>
                        </div>
                        <div className="action-section2">
                          <button
                            className="contact-button2"
                            onClick={handleRedirect}
                          >
                            Ponerme en contacto
                          </button>
                          <div className="social-media-icons2">
                            <div className="icon-wrapper">
                              <img
                                src={Insta}
                                alt="Instagram"
                                className="icon"
                                onClick={handleInstagramClick}
                              />
                            </div>
                            <div className="icon-wrapper">
                              <img src={Face} alt="Facebook" className="icon" />
                            </div>
                            <div className="icon-wrapper">
                              <img src={Whats} alt="WhatsApp" className="icon" />
                            </div>
                          </div>
                        </div>
                        <hr className="thin-line2" />
                        <div className="comments-container2">
                          <h2>Déjanos un comentario:</h2>
                          <form className="comment-form2" onSubmit={handleSubmit}>
                            <input
                              type="text"
                              placeholder="Nombre"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required
                            />
                            <div className="textarea-wrapper">
                              <textarea
                                placeholder="Comentario"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                required
                              />
                              <button type="submit" className="send-btn2">
                                <img src={sendIcon} alt="Enviar" />
                              </button>
                            </div>
                          </form>
                          {showThankYou && (
                            <div className="modal-overlay2">
                              <ThankYouWindow onClose={handleCloseThankYou} />
                            </div>
                          )}
                          <div className="scrollable-comments">
                            {comments.length > 0 ? (
                              comments
                                .slice(0, visibleComments)
                                .map((comment, index) => (
                                  <div key={index} className="comment-item2">
                                    <div className="comments-list2">
                                      <strong>{comment.username}:</strong>
                                      <p>{comment.comment}</p>
                                    </div>
                                  </div>
                                ))
                            ) : (
                              <p>No hay comentarios aún.</p>
                            )}
                          </div>
                          {visibleComments < comments.length && (
                            <div className="btn-more3">
                              <button onClick={handleShowMoreComments}>
                                Ver más
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div>Selecciona un producto para ver los detalles.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDesc;

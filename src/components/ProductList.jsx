import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import estrella from "../assets/images/star.png";
import Barra from '../components/Barra';
import "../App.css";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleProducts, setVisibleProducts] = useState(9);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://0yuiclk74a.execute-api.us-east-1.amazonaws.com/cacao/");
        
        const productData = JSON.parse(response.data.body);
        
        if (Array.isArray(productData)) {
          setProducts(productData);
        } else {
          throw new Error("Formato de datos inesperado");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleShowMore = () => {
    setVisibleProducts(products.length); 
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="product-list" id="productos">
      <h2 className="head">PRODUCTOS</h2>
      <div className="conten-card">
        {products.length === 0 ? (
          <p>No products found</p>
        ) : (
          products.slice(0, visibleProducts).map((item, index) => (
            <div className="container" key={item._id}>
              {item.nuevo && <span>Nuevo</span>}
              <img
                className="img-product"
                src={item.image}
                alt={item.title}
              />
              <div className="title-content">
                {item.estrella && <img src={estrella} alt="estrella" />}
                <p className="title">{item.title}</p>
              </div>
              <div className="btn-info-product">
                <div>
                  <Link to={`/products/${index + 1}`}>Más información</Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {visibleProducts < products.length && (
        <div className="btn-more">
          <button onClick={handleShowMore}>Ver más</button>
        </div>
      )}
    </div>
  );
}

export default ProductList;

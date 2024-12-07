import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ProductContainer from './components/ProductContainer';
import ProductList from './components/ProductList';
import Barra from './components/Barra';
import CarruselMain from './components/CarruselMain';
import AboutUs from './components/AboutUs';
import Events from './components/Events';
import Services from './components/Services';
import ComentsClientes from './components/ComentsClientes';
import ContactForm from './components/ContactForm';
import Cuestions from './components/Cuestions';
import ProductDesc from './components/ProductDesc';
import FirstQuestion from './assets/questionPages/FirstQuestion';
import Blog from './assets/BlogComponents/Blog';
import BlogLiterature from './assets/BlogComponents/BlogLiterature';
import ArticleList from './assets/BlogComponents/ArticleList';
import ArticleDetail from './assets/BlogComponents/ArticleDetail';
import EventSite from './assets/BlogComponents/EventSite';
import EventDetail from './assets/BlogComponents/EventDetail';
import { useState, useEffect } from 'react';

function App() {
  const [products, setProducts] = useState([]);

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://0yuiclk74a.execute-api.us-east-1.amazonaws.com/cacao/");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/products/:productNumber" element={<ProductDesc products={products} />} />
        <Route path="/firstQuestion" element={<FirstQuestion />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/literature' element={<BlogLiterature />} />
        <Route path='/articles' element={<ArticleList />} />
        <Route path='/articlesDetail/:id' element={<ArticleDetail />} />
        <Route path='/EventSite' element={<EventSite />} />
        <Route path='/EventDetail/:id' element={<EventDetail />} />
        <Route path='/AboutUs' element={<AboutUs />} />
        <Route path='/ProductList' element={<ProductList/>} />
        <Route path='/Events' element={<Events />} />
        <Route path='/Services' element={<Services />} />
        <Route path='/ComentsClientes' element={<ComentsClientes />} />
        
        
        <Route 
          path="/" 
          element={
            <>
              <Barra />
              <CarruselMain />
              <ProductContainer />
              <ProductList />
              <AboutUs />
              <Events />
              <Services />
              <ComentsClientes />
              <Cuestions />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
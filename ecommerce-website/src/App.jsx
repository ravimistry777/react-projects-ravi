// App.jsx
import React, { useEffect } from 'react';
import NavbarComponent from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import ProductDetail from './components/ProductDetail';
import Footer from './components/Footer';
import Newsletter from './components/Newsletter';
import Features from './components/Features';

function App() {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Parallax effect on scroll
    const handleParallax = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax-bg');
      parallaxElements.forEach(el => {
        const speed = el.dataset.speed || 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
      });
    };
    
    window.addEventListener('scroll', handleParallax);
    return () => window.removeEventListener('scroll', handleParallax);
  }, []);

  return (
    <div className="app-wrapper">
      <NavbarComponent />
      <main>
        <Hero />
        <Features />
        <ProductGrid />
        <Newsletter />
      </main>
      <ProductDetail />
      <Footer />
    </div>
  );
}

export default App;
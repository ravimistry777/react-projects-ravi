// components/Hero.jsx - Stunning Hero Section with Parallax
import React, { useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowRight, FiPlay } from 'react-icons/fi';

const Hero = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div 
      ref={heroRef}
      id="home" 
      className="position-relative d-flex align-items-center overflow-hidden"
      style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #fffef7 0%, #fbfaf6 50%, #f8f5ee 100%)',
        paddingTop: '80px'
      }}
    >
      {/* Animated Background Elements */}
      <div className="position-absolute w-100 h-100 overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="position-absolute"
          style={{ 
            top: '10%',
            right: '-5%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(193,127,89,0.08) 0%, transparent 70%)',
            borderRadius: '50%'
          }}
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -180, -360]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="position-absolute"
          style={{ 
            bottom: '10%',
            left: '-5%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(212,163,115,0.06) 0%, transparent 70%)',
            borderRadius: '50%'
          }}
        />
      </div>

      <Container fluid="xl" className="position-relative" style={{ zIndex: 10 }}>
        <Row className="align-items-center min-vh-100">
          
          <Col lg={7} xs={12} className="offset-lg-1">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              style={{ y, opacity }}
            >
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: 60 }}
                transition={{ duration: 0.8 }}
                style={{ height: 2, background: 'var(--accent-primary)', marginBottom: 24 }}
              />
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="text-uppercase small fw-semibold" style={{ 
                  color: 'var(--accent-primary)',
                  letterSpacing: '3px',
                  fontSize: '0.75rem'
                }}>
                  Since 2026
                </span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="display-1 fw-bold mb-4"
                style={{ 
                  fontSize: 'clamp(3rem, 8vw, 5.5rem)',
                  lineHeight: '1.1',
                  letterSpacing: '-0.02em',
                  fontFamily: "'Playfair Display', serif"
                }}
              >
                Where <span className="text-gradient">Elegance</span><br />
                Meets <span className="text-gradient">Artistry</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="fs-4 mb-5"
                style={{ 
                  color: 'var(--text-secondary)',
                  maxWidth: '540px',
                  fontFamily: "'Cormorant Garamond', serif"
                }}
              >
                Discover our curated collection of timeless masterpieces, 
                where every creation tells a story of passion and perfection.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="d-flex gap-3 flex-wrap"
              >
                <a href="#collection" className="btn-premium text-decoration-none">
                  Explore Collection <FiArrowRight className="ms-2" />
                </a>
                <button className="btn-outline-premium d-flex align-items-center gap-2">
                  <FiPlay size={16} /> Watch Story
                </button>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="d-flex gap-5 mt-5 pt-4"
              >
                {[
                  { value: '500+', label: 'Exclusive Pieces' },
                  { value: '50+', label: 'Design Awards' },
                  { value: '30+', label: 'Countries' }
                ].map((stat, index) => (
                  <div key={index} className="text-center text-md-start">
                    <div className="display-6 fw-bold text-gradient">{stat.value}</div>
                    <div className="text-muted small">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </Col>

          <Col lg={4} xs={12} className="d-none d-lg-block">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="position-relative"
            >
              <div className="image-zoom-effect float-animation" style={{ height: '550px' }}>
                <img 
                  src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=1000" 
                  alt="Luxury Collection" 
                />
              </div>
              <div className="glass-card-premium position-absolute p-4" style={{ bottom: -30, left: -30, maxWidth: 220 }}>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <div style={{ width: 8, height: 8, background: 'var(--accent-primary)', borderRadius: '50%' }} />
                  <span className="small text-uppercase fw-bold">Limited Edition</span>
                </div>
                <div className="fw-bold">Spring/Summer 2026</div>
                <div className="text-muted small mt-2">Only 100 pieces available</div>
              </div>
            </motion.div>
          </Col>

        </Row>
      </Container>
    </div>
  );
};

export default Hero;
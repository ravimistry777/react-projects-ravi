// components/Footer.jsx - Enhanced footer
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiPhone, FiInstagram, FiTwitter, FiFacebook, FiYoutube } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="position-relative pt-5 pb-4" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)' }}>
      <Container>
        <Row className="gy-5 justify-content-between mb-5">
          
          <Col lg={4} xs={12}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="fw-bold mb-3" style={{ 
                fontFamily: "'Playfair Display', serif",
                fontSize: '2rem'
              }}>
                <span className="text-gradient">AESTHETE</span>
              </h2>
              <p className="text-muted" style={{ lineHeight: 1.8 }}>
                Crafting timeless elegance through exceptional design and uncompromising quality.
              </p>
              <div className="d-flex gap-3 mt-4">
                <motion.a whileHover={{ y: -3 }} href="#" className="text-muted"><FiInstagram size={20} /></motion.a>
                <motion.a whileHover={{ y: -3 }} href="#" className="text-muted"><FiTwitter size={20} /></motion.a>
                <motion.a whileHover={{ y: -3 }} href="#" className="text-muted"><FiFacebook size={20} /></motion.a>
                <motion.a whileHover={{ y: -3 }} href="#" className="text-muted"><FiYoutube size={20} /></motion.a>
              </div>
            </motion.div>
          </Col>

          <Col lg={2} xs={6}>
            <h6 className="fw-bold mb-3">Explore</h6>
            <ul className="list-unstyled">
              {['New Arrivals', 'Best Sellers', 'Collections', 'About Us'].map(item => (
                <li key={item} className="mb-2">
                  <a href="#" className="text-muted text-decoration-none text-link small">{item}</a>
                </li>
              ))}
            </ul>
          </Col>

          <Col lg={2} xs={6}>
            <h6 className="fw-bold mb-3">Support</h6>
            <ul className="list-unstyled">
              {['FAQ', 'Shipping', 'Returns', 'Size Guide'].map(item => (
                <li key={item} className="mb-2">
                  <a href="#" className="text-muted text-decoration-none text-link small">{item}</a>
                </li>
              ))}
            </ul>
          </Col>

          <Col lg={4} xs={12}>
            <h6 className="fw-bold mb-3">Visit Us</h6>
            <div className="d-flex flex-column gap-3">
              <div className="d-flex align-items-start gap-3">
                <FiMapPin size={20} className="text-muted mt-1" />
                <div>
                  <span className="fw-semibold d-block">Our Atelier</span>
                  <span className="text-muted small">Surat, Gujarat, India</span>
                </div>
              </div>

              <div className="d-flex align-items-center gap-3">
                <FiMail size={16} className="text-muted" />
                <a href="mailto:ravisiddhapura777@gmail.com" className="text-muted text-decoration-none text-link small">
                  ravisiddhapura777@gmail.com
                </a>
              </div>

              <div className="d-flex align-items-center gap-3">
                <FiPhone size={16} className="text-muted" />
                <a href="tel:+917069695001" className="text-muted text-decoration-none text-link small">
                  +91 7069695001
                </a>
              </div>
            </div>
          </Col>

        </Row>
        
        <hr className="my-4" style={{ borderColor: 'var(--border-color)' }} />
        
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <div className="small text-muted">
            © 2026 AESTHETE. All rights reserved.
          </div>
          <div className="d-flex gap-4">
            <a href="#" className="small text-muted text-decoration-none text-link">Privacy Policy</a>
            <a href="#" className="small text-muted text-decoration-none text-link">Terms of Service</a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
// components/Newsletter.jsx - New Newsletter Section
import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FiSend } from 'react-icons/fi';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    alert('Thank you for subscribing!');
    setEmail('');
  };

  return (
    <section className="py-5 position-relative" style={{ background: 'var(--bg-tertiary)' }}>
      <Container>
        <Row className="justify-content-center text-center">
          <Col lg={8}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="text-uppercase small fw-semibold" style={{ color: 'var(--accent-primary)', letterSpacing: '3px' }}>
                Stay Inspired
              </span>
              <h2 className="display-5 fw-bold mt-3 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                Join Our Inner Circle
              </h2>
              <p className="text-muted mb-4" style={{ fontSize: '1.1rem' }}>
                Be the first to discover new arrivals, exclusive collections, and private sales.
              </p>
              <form onSubmit={handleSubmit} className="d-flex gap-3 justify-content-center flex-wrap">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="px-4 py-3 rounded-pill border-0"
                  style={{ 
                    width: '300px',
                    background: 'white',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                />
                <button type="submit" className="btn-premium d-flex align-items-center gap-2">
                  Subscribe <FiSend />
                </button>
              </form>
              <p className="text-muted small mt-3">
                By subscribing, you agree to our Privacy Policy and consent to receive updates.
              </p>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Newsletter;
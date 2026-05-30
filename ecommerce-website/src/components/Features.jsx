// components/Features.jsx - New Features Section
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FiTruck, FiShield, FiRefreshCw, FiAward } from 'react-icons/fi';

const features = [
  {
    icon: <FiTruck size={32} />,
    title: 'Free Worldwide Shipping',
    description: 'Complimentary delivery on all orders over ₹50,000'
  },
  {
    icon: <FiShield size={32} />,
    title: 'Lifetime Authenticity',
    description: '100% genuine materials with certificate of authenticity'
  },
  {
    icon: <FiRefreshCw size={32} />,
    title: '30-Day Returns',
    description: 'Hassle-free returns and exchanges'
  },
  {
    icon: <FiAward size={32} />,
    title: 'Premium Support',
    description: '24/7 dedicated personal shopping assistance'
  }
];

const Features = () => {
  return (
    <section className="py-5 position-relative" style={{ background: 'var(--bg-secondary)' }}>
      <Container>
        <Row className="g-4">
          {features.map((feature, index) => (
            <Col key={index} lg={3} md={6} xs={12}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-4"
              >
                <div className="mb-3" style={{ color: 'var(--accent-primary)' }}>
                  {feature.icon}
                </div>
                <h5 className="fw-bold mb-2">{feature.title}</h5>
                <p className="text-muted small mb-0">{feature.description}</p>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Features;
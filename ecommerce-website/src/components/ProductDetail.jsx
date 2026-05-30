// components/ProductDetail.jsx - Fixed mobile responsiveness
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiShoppingBag } from 'react-icons/fi';
import { cartActions } from '../store/cartSlice';

const ProductDetail = () => {
  const dispatch = useDispatch();
  const product = useSelector(state => state.cart.selectedProduct);

  if (!product) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN').format(price);
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-2 p-md-3"
        style={{ 
          zIndex: 9999, 
          background: 'rgba(255, 255, 255, 0.98)', 
          backdropFilter: 'blur(20px)',
          overflowY: 'auto'
        }}
      >
        <Container className="position-relative">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="glass-card p-3 p-md-5"
            style={{ 
              maxWidth: '1000px', 
              margin: '0 auto',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            
            <button 
              onClick={() => dispatch(cartActions.clearInspectionState())}
              className="btn-close-custom position-absolute end-0 top-0 m-2 m-md-4"
              style={{ zIndex: 10 }}
            >
              <FiX size={20} />
            </button>

            <Row className="gy-4 align-items-start">
              <Col xs={12} md={6}>
                <div className="image-wrapper" style={{ 
                  height: 'clamp(300px, 50vh, 450px)',
                  borderRadius: '16px'
                }}>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="image-hover-zoom w-100 h-100" 
                    style={{ objectFit: 'cover' }} 
                  />
                </div>
              </Col>
              
              <Col xs={12} md={6}>
                <div className="p-1 p-md-2">
                  <span className="category-badge mb-2 mb-md-3 d-inline-block">
                    {product.category || 'Premium Collection'}
                  </span>
                  
                  <h2 className="fw-bold mb-2 mb-md-3" style={{ 
                    fontSize: 'clamp(1.5rem, 6vw, 2.5rem)',
                    letterSpacing: '-0.02em',
                    lineHeight: '1.2'
                  }}>
                    {product.name}
                  </h2>
                  
                  <div className="fw-bold mb-3 mb-md-4" style={{ 
                    color: 'var(--accent-primary)',
                    fontSize: 'clamp(1.5rem, 5vw, 2.5rem)'
                  }}>
                    ₹{formatPrice(product.price)}
                  </div>
                  
                  <p className="text-muted mb-4" style={{ 
                    lineHeight: '1.6',
                    fontSize: 'clamp(0.85rem, 3vw, 1rem)'
                  }}>
                    Meticulously designed with premium high-density materials engineered to deliver 
                    structural form integrity combined with optimal day-to-day comfort and timeless elegance.
                  </p>

                  <button
                    onClick={() => {
                      dispatch(cartActions.addProductToCart(product));
                      dispatch(cartActions.clearInspectionState());
                      dispatch(cartActions.toggleCartView());
                    }}
                    className="btn-primary-custom w-100 justify-content-center gap-2"
                    style={{ padding: '12px 24px' }}
                  >
                    <FiShoppingBag /> Add to Bag
                  </button>

                  <div className="mt-4 pt-3 border-top">
                    <div className="d-flex flex-column flex-sm-row justify-content-between gap-2 small text-muted">
                      <span>✓ Free Shipping</span>
                      <span>✓ 30-Day Returns</span>
                      <span>✓ Premium Quality</span>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>

          </motion.div>
        </Container>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductDetail;
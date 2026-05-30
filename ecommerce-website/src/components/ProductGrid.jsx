// components/ProductGrid.jsx - Fixed filter buttons with proper UI
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEye } from 'react-icons/fi';
import { cartActions } from '../store/cartSlice';

const PRODUCT_DATABASE = [
  { 
    id: 'p1', 
    name: 'Celestial Silk Gown', 
    price: 15999, 
    category: 'Dresses', 
    image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80&w=800',
    badge: 'Best Seller',
    description: 'Handcrafted with pure mulberry silk'
  },
  { 
    id: 'p2', 
    name: 'Royal Cashmere Coat', 
    price: 24999, 
    category: 'Outerwear', 
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80&w=800',
    badge: 'New Arrival',
    description: 'Premium Mongolian cashmere'
  },
  { 
    id: 'p3', 
    name: 'Artisan Leather Tote', 
    price: 12999, 
    category: 'Accessories', 
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800',
    badge: 'Limited',
    description: 'Full-grain Italian leather'
  },
  { 
    id: 'p4', 
    name: 'Pleated Midi Skirt', 
    price: 8999, 
    category: 'Skirts', 
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&q=80&w=800',
    badge: '',
    description: 'Japanese crepe fabric'
  },
  { 
    id: 'p5', 
    name: 'Hermitage Silk Scarf', 
    price: 3999, 
    category: 'Accessories', 
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&q=80&w=800',
    badge: '',
    description: 'Hand-rolled edges, 100% silk'
  },
  { 
    id: 'p6', 
    name: 'Signature Blazer', 
    price: 18999, 
    category: 'Outerwear', 
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800',
    badge: 'Premium',
    description: 'Italian wool blend'
  }
];

const ProductGrid = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector(state => state.cart.activeCategoryFilter);
  const [hoveredId, setHoveredId] = useState(null);

  const categories = ['All', 'Dresses', 'Outerwear', 'Accessories', 'Skirts'];
  
  const processedPool = currentFilter === 'All' 
    ? PRODUCT_DATABASE 
    : PRODUCT_DATABASE.filter(item => item.category === currentFilter);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN').format(price);
  };

  return (
    <section id="collection" className="py-5 position-relative" style={{ background: 'var(--bg-primary)' }}>
      <Container fluid="lg">
        
        <div className="text-center mb-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-uppercase small fw-semibold" style={{ 
              color: 'var(--accent-primary)',
              letterSpacing: '3px'
            }}>
              Curated Selection
            </span>
            <h2 className="display-4 fw-bold mt-3 mb-3" style={{ 
              fontFamily: "'Playfair Display', serif",
              letterSpacing: '-0.01em'
            }}>
              Signature Collection
            </h2>
            <div style={{ width: 60, height: 2, background: 'var(--accent-primary)', margin: '0 auto' }} />
          </motion.div>
        </div>
        
        {/* Filter Buttons - NOW WITH PROPER UI */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="filter-buttons-container"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => dispatch(cartActions.setCategoryFilter(cat))}
              className={`filter-btn ${currentFilter === cat ? 'filter-btn-active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <Row className="g-4">
          <AnimatePresence>
            {processedPool.map((product, index) => (
              <Col key={product.id} xs={12} sm={6} lg={4}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  onHoverStart={() => setHoveredId(product.id)}
                  onHoverEnd={() => setHoveredId(null)}
                  className="h-100"
                >
                  <div className="glass-card-premium h-100 p-0 overflow-hidden position-relative">
                    
                    {product.badge && (
                      <motion.div 
                        initial={{ x: -100 }}
                        animate={{ x: 0 }}
                        className="position-absolute top-0 start-0 m-3 px-3 py-1 rounded-pill z-1"
                        style={{ 
                          background: 'var(--gradient-gold)',
                          color: 'white',
                          fontSize: '0.7rem',
                          fontWeight: 'bold',
                          zIndex: 10
                        }}
                      >
                        {product.badge}
                      </motion.div>
                    )}
                    
                    <div className="image-zoom-effect position-relative" style={{ height: '350px' }}>
                      <img 
                        src={product.image} 
                        alt={product.name}
                        style={{ cursor: 'pointer' }}
                        onClick={() => dispatch(cartActions.inspectProductDetails(product))}
                      />
                      
                      {/* Hover Overlay */}
                      <AnimatePresence>
                        {hoveredId === product.id && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="position-absolute inset-0 d-flex align-items-center justify-content-center gap-3"
                            style={{ 
                              background: 'rgba(255, 254, 247, 0.95)',
                              inset: 0,
                              position: 'absolute'
                            }}
                          >
                            <motion.button 
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className="btn-premium"
                              style={{ width: 50, height: 50, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
                              onClick={() => dispatch(cartActions.inspectProductDetails(product))}
                            >
                              <FiEye size={20} />
                            </motion.button>
                            <motion.button 
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className="product-card-btn"
                              onClick={() => dispatch(cartActions.addProductToCart(product))}
                            >
                              <FiPlus size={20} />
                            </motion.button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="p-4">
                      <span className="text-uppercase small" style={{ color: 'var(--accent-primary)', letterSpacing: '1px' }}>
                        {product.category}
                      </span>
                      <h5 className="fw-bold mt-2 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {product.name}
                      </h5>
                      <p className="text-muted small mb-3">{product.description}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="fs-3 fw-bold" style={{ color: 'var(--accent-primary)' }}>
                          ₹{formatPrice(product.price)}
                        </span>
                        <button 
                          onClick={() => dispatch(cartActions.addProductToCart(product))}
                          className="product-card-btn"
                        >
                          <FiPlus size={20} />
                        </button>
                      </div>
                    </div>

                  </div>
                </motion.div>
              </Col>
            ))}
          </AnimatePresence>
        </Row>

      </Container>
    </section>
  );
};

export default ProductGrid;
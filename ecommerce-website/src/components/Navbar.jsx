// components/Navbar.jsx - Fixed navbar with visible buttons
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navbar, Container, Offcanvas } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingBag, FiX, FiPlus, FiMinus, FiArrowRight, FiMenu } from 'react-icons/fi';
import { cartActions } from '../store/cartSlice';

const NavbarComponent = () => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  const totalAmount = useSelector(state => state.cart.totalAmount);
  const isCartOpen = useSelector(state => state.cart.isCartOpen);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN').format(price);
  };

  return (
    <>
      <Navbar 
        fixed="top" 
        className="py-3"
        style={{ 
          background: scrolled ? 'rgba(255, 254, 247, 0.95)' : 'rgba(255, 254, 247, 0.98)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border-color)',
          transition: 'all 0.3s ease'
        }}
      >
        <Container fluid="xl" className="d-flex justify-content-between align-items-center px-3 px-md-4">
          
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Navbar.Brand href="#" className="fw-bold m-0" style={{ 
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.5rem, 5vw, 2rem)',
              letterSpacing: '-0.02em'
            }}>
              <span className="text-gradient">AESTHETE</span>
            </Navbar.Brand>
          </motion.div>

          {/* Desktop Navigation Links - VISIBLE NOW */}
          <div className="d-none d-md-flex navbar-nav-links">
            {['Home', 'Collection', 'Features', 'Journal'].map((anchor, i) => (
              <motion.a 
                key={anchor}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                href={`#${anchor.toLowerCase()}`}
                className="navbar-link"
              >
                {anchor}
              </motion.a>
            ))}
          </div>

          {/* Cart and Menu Buttons */}
          <div className="d-flex gap-3 align-items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => dispatch(cartActions.toggleCartView())}
              className="cart-trigger-btn"
            >
              <FiShoppingBag size={18} />
              <span className="small fw-semibold d-none d-sm-inline">Cart</span>
              <motion.span 
                key={totalQuantity}
                animate={{ scale: [1, 1.2, 1] }}
                className="badge rounded-pill px-2 py-1"
                style={{ background: 'var(--accent-primary)', color: 'white', fontSize: '11px' }}
              >
                {totalQuantity}
              </motion.span>
            </motion.div>

            {/* Mobile Menu Button */}
            <button 
              className="d-md-none btn p-0"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ background: 'none', border: 'none' }}
            >
              <FiMenu size={24} />
            </button>
          </div>

        </Container>
      </Navbar>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween' }}
            className="position-fixed top-0 end-0 h-100 w-75 bg-white shadow-lg p-4"
            style={{ zIndex: 9998, maxWidth: '300px' }}
          >
            <button 
              className="btn-close-custom position-absolute end-0 top-0 m-3"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FiX size={20} />
            </button>
            <div className="mt-5 pt-4 d-flex flex-column gap-3">
              {['Home', 'Collection', 'Features', 'Journal'].map((anchor) => (
                <a 
                  key={anchor}
                  href={`#${anchor.toLowerCase()}`}
                  className="navbar-link fs-5 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {anchor}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Offcanvas */}
      <Offcanvas 
        show={isCartOpen} 
        onHide={() => dispatch(cartActions.toggleCartView())} 
        placement="end" 
        style={{ 
          background: 'var(--bg-primary)', 
          width: '100%', 
          maxWidth: '500px',
          boxShadow: 'var(--shadow-xl)'
        }}
      >
        <Offcanvas.Header className="p-4 d-flex justify-content-between align-items-center border-bottom">
          <span className="fw-bold fs-2" style={{ fontFamily: "'Playfair Display', serif" }}>Your Bag</span>
          <button 
            className="btn-close-custom"
            onClick={() => dispatch(cartActions.toggleCartView())}
          >
            <FiX size={20} />
          </button>
        </Offcanvas.Header>
        
        <Offcanvas.Body className="p-4 d-flex flex-column justify-content-between">
          <div className="overflow-auto flex-grow-1" style={{ maxHeight: 'calc(100vh - 200px)' }}>
            {items.length === 0 ? (
              <div className="text-center py-5 my-5">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="mb-4"
                >
                  <FiShoppingBag size={80} color="var(--text-tertiary)" />
                </motion.div>
                <p className="text-muted mb-4 fs-5">Your bag is empty</p>
                <button 
                  onClick={() => dispatch(cartActions.toggleCartView())}
                  className="btn-outline-premium"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <AnimatePresence>
                {items.map((item, idx) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ delay: idx * 0.1 }}
                    className="d-flex gap-3 p-3 mb-3 align-items-center rounded-4"
                    style={{ background: 'var(--bg-tertiary)' }}
                  >
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="rounded-3"
                      style={{ width: 80, height: 80, objectFit: 'cover' }}
                    />
                    <div className="flex-grow-1">
                      <h6 className="fw-bold mb-1">{item.name}</h6>
                      <span className="d-block text-muted small fw-semibold mb-2">₹{formatPrice(item.price)}</span>
                      <div className="d-flex align-items-center gap-2">
                        <button 
                          className="btn-qty"
                          onClick={() => dispatch(cartActions.removeProductFromCart(item.id))}
                        >
                          <FiMinus size={12} />
                        </button>
                        <span className="small fw-bold px-2">{item.quantity}</span>
                        <button 
                          className="btn-qty"
                          onClick={() => dispatch(cartActions.addProductToCart(item))}
                        >
                          <FiPlus size={12} />
                        </button>
                      </div>
                    </div>
                    <div className="fw-bold fs-5">₹{formatPrice(item.totalPrice)}</div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>

          {items.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-top pt-4 mt-3"
            >
              <div className="d-flex justify-content-between align-items-center mb-4">
                <span className="text-muted fs-5">Subtotal</span>
                <span className="fs-1 fw-bold text-gradient">₹{formatPrice(totalAmount)}</span>
              </div>
              <button 
                className="btn-premium w-100 mb-3 d-flex align-items-center justify-content-center gap-2"
              >
                Proceed to Checkout <FiArrowRight />
              </button>
              <p className="text-center text-muted small mb-0">
                Free shipping on orders over ₹50,000
              </p>
            </motion.div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default NavbarComponent;
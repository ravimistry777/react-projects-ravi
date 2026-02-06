import React, { useState } from 'react'
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiHome, FiPlusCircle, FiSearch, FiPhone, FiChevronDown } from 'react-icons/fi'

const NavbarComponent = () => {
  const navigate = useNavigate()
  const [showDropdown, setShowDropdown] = useState(false)
  const [expanded, setExpanded] = useState(false)
  
  const carCategories = [
    { name: 'Sedan', icon: 'fas fa-car' },
    { name: 'SUV', icon: 'fas fa-truck' },
    { name: 'Hatchback', icon: 'fas fa-car-side' },
    { name: 'Coupe', icon: 'fas fa-car' },
    { name: 'Sports', icon: 'fas fa-tachometer-alt' },
    { name: 'Minivan', icon: 'fas fa-van-shuttle' },
    { name: 'Pickup', icon: 'fas fa-truck-pickup' }
  ]

  const handleCategorySelect = (category) => {
    navigate(`/find-cars?category=${category.toLowerCase()}`)
    setShowDropdown(false)
    setExpanded(false)
  }

  return (
    <Navbar expanded={expanded} expand="lg" className="navbar-premium">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="navbar-brand-premium"
          onClick={() => setExpanded(false)}
        >
          RAVI'S CARZ HUB
        </Navbar.Brand>

        <Navbar.Toggle 
          aria-controls="basic-navbar-nav" 
          className="navbar-toggler-premium"
          onClick={() => setExpanded(!expanded)}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">

            <Nav.Link
              as={Link}
              to="/"
              className="nav-link-premium"
              onClick={() => setExpanded(false)}
            >
              <FiHome />
              <span>Home</span>
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/add-car"
              className="nav-link-premium"
              onClick={() => setExpanded(false)}
            >
              <FiPlusCircle />
              <span>Add Car</span>
            </Nav.Link>

            <Dropdown 
              className="mx-2"
              onToggle={(isOpen) => setShowDropdown(isOpen)}
              show={showDropdown}
            >
              <Dropdown.Toggle 
                className="nav-link-premium d-flex align-items-center" 
                style={{ background: 'transparent', border: 'none', boxShadow: 'none' }}
              >
                <FiSearch />
                <span className="mx-2">Find Cars</span>
                <motion.div
                  animate={{ rotate: showDropdown ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FiChevronDown />
                </motion.div>
              </Dropdown.Toggle>

              <AnimatePresence>
                {showDropdown && (
                  <Dropdown.Menu 
                    as={motion.div}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="dropdown-menu-premium border-0 shadow-lg p-0"
                    style={{
                      marginTop: '0px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-surface)',
                      minWidth: '220px',
                      border: '1px solid var(--border-strong)'
                    }}
                  >
                    <Dropdown.Item
                      onClick={() => {
                        navigate('/find-cars')
                        setShowDropdown(false)
                        setExpanded(false)
                      }}
                      className="dropdown-item-premium"
                      style={{ fontWeight: 600, color: 'var(--primary)' }}
                    >
                      <i className="fas fa-th-large me-2"></i>
                      Browse All Cars
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    {carCategories.map((category, index) => (
                      <Dropdown.Item
                        key={index}
                        onClick={() => handleCategorySelect(category.name)}
                        className="px-3 py-3 my-0 border-bottom"
                        style={{
                          fontSize: '0.9rem',
                          color: 'var(--text-secondary)',
                          transition: 'all 0.2s',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = 'var(--primary)'
                          e.target.style.color = 'white'
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'transparent'
                          e.target.style.color = 'var(--text-secondary)'
                        }}
                      >
                        <i className={`${category.icon} me-2`} style={{ width: '20px' }}></i>
                        {category.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                )}
              </AnimatePresence>
            </Dropdown>

            <Nav.Link
              as={Link}
              to="/contact"
              className="nav-link-premium"
              onClick={() => setExpanded(false)}
            >
              <FiPhone />
              <span>Contact</span>
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarComponent
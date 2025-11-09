import React from 'react'
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

const NavbarComponent = () => {
  const navigate = useNavigate()
  
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
  }

  return (
    <Navbar expand="lg" className="navbar-premium fixed-top">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="navbar-brand-premium"
          style={{ cursor: 'pointer' }}
        >
          RAVI'S CARZ HUB
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">

            <Nav.Link
              as={Link}
              to="/add-car"
              className="nav-link-premium"
            >
              <i className="fas fa-plus me-2"></i>
              Add Car
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/"
              className="nav-link-premium"
            >
              <i className="fas fa-home me-2"></i>
              Home
            </Nav.Link>

            <Dropdown className="mx-2">
              <Dropdown.Toggle className="nav-link-premium" style={{ background: 'none', border: 'none' }}>
                <i className="fas fa-search me-2"></i>
                Find Cars
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-premium" style={{
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(10px)',
                border: 'none',
                borderRadius: '15px',
                padding: '10px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
              }}>
                {carCategories.map((category, index) => (
                  <Dropdown.Item
                    key={index}
                    onClick={() => handleCategorySelect(category.name)}
                    style={{
                      padding: '12px 20px',
                      borderRadius: '10px',
                      margin: '5px 0',
                      fontWeight: '500',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#8B0000'
                      e.target.style.color = 'white'
                      // e.target.style.transform = 'translateX(20px)'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'none'
                      e.target.style.color = 'inherit'
                      e.target.style.transform = 'translateX(0)'
                    }}
                  >
                    <i className={`${category.icon} me-2`}></i>
                    {category.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            <Nav.Link
              as={Link}
              to="/contact"
              className="nav-link-premium"
            >
              <i className="fas fa-envelope me-2"></i>
              Contact Us
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarComponent
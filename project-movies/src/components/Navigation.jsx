import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navigation = ({ onAddMovieClick }) => {
  return (
    <Navbar expand="lg" className="custom-navbar fixed-top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand">
          📽 MOVIE MANIA
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/" className="fw-medium me-3 hover-text-main" style={{ color: 'var(--text-main)' }}>
              HOME
            </Nav.Link>
            <Button
              className="btn-premium"
              onClick={onAddMovieClick}
            >
              + Add Movie
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;

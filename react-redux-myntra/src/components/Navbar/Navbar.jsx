import React from "react";
import { Navbar, Container, Nav, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./navbar.css";
import { FaHeart, FaShoppingBag } from "react-icons/fa";

const MyntraNavbar = () => {
  return (
    <Navbar bg="white" expand="lg" className="shadow-sm py-2">
      <Container>

        {/* LOGO */}
        <Navbar.Brand as={Link} to="/" className="logo-text">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0d/Myntra_Logo.png"
            alt="logo"
            width="60"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">

          {/* MAIN LINKS */}
          <Nav className="me-auto nav-links">
            <Nav.Link as={Link} to="/men">Men</Nav.Link>
            <Nav.Link as={Link} to="/women">Women</Nav.Link>
            <Nav.Link as={Link} to="/kids">Kids</Nav.Link>
          </Nav>

          {/* SEARCH */}
          <Form className="d-flex search-bar">
            <input
              type="search"
              placeholder="Search for products..."
              className="search-input"
            />
          </Form>

          {/* ICONS */}
          <div className="d-flex align-items-center icons-wrap">
            <Link to="/wishlist" className="icon-box">
              <FaHeart size={22} />
              <span>Wishlist</span>
            </Link>

            <Link to="/cart" className="icon-box">
              <FaShoppingBag size={22} />
              <span>Bag</span>
            </Link>
          </div>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyntraNavbar;

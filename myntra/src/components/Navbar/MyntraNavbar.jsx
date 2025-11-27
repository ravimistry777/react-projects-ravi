import { useState } from "react";
import { Container, Nav, Navbar, Form, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Bag, Search } from "react-bootstrap-icons";

const MyntraNavbar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/search/${search}`);
    }
  };

  return (
    <Navbar
      bg="white"
      expand="lg"
      className="py-2"
      style={{ 
        borderBottom: "1px solid #f5f5f5",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
      }}
    >
      <Container>
        {/* logo */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold me-4"
          style={{ 
            color: "#ff3e6c", 
            fontSize: "24px",
            letterSpacing: "1px",
          }}
        >
          MYNTRA
        </Navbar.Brand>

        <Navbar.Toggle 
          style={{
            border: "none",
            boxShadow: "none",
          }}
        />

        <Navbar.Collapse>
          {/* main menu */}
          <Nav className="me-auto ms-4 fw-semibold d-flex align-items-center gap-4">
            <Nav.Link
              as={Link}
              to="/men"
              className="position-relative px-2 py-1"
              style={{ 
                fontSize: "14px",
                color: "#282c3f",
                fontWeight: "600",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "#ff3e6c";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "#282c3f";
              }}
            >
              MEN
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/women"
              className="position-relative px-2 py-1"
              style={{ 
                fontSize: "14px",
                color: "#282c3f",
                fontWeight: "600",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "#ff3e6c";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "#282c3f";
              }}
            >
              WOMEN
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/kids"
              className="position-relative px-2 py-1"
              style={{ 
                fontSize: "14px",
                color: "#282c3f",
                fontWeight: "600",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "#ff3e6c";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "#282c3f";
              }}
            >
              KIDS
            </Nav.Link>
          </Nav>

          {/* search */}
          <div className="d-flex align-items-center me-4 position-relative w-50">
            <div className="position-absolute start-0 ms-3 z-1">
              <Search 
                size={16} 
                color={isSearchFocused ? "#ff3e6c" : "#94969f"} 
              />
            </div>
            <Form.Control
              type="search"
              placeholder="Search for products, brands and more"
              className="ps-5 py-2"
              style={{
                borderRadius: "4px",
                fontSize: "14px",
                border: `1px solid ${isSearchFocused ? "#ff3e6c" : "#f5f5f6"}`,
                background: "#f5f5f6",
                fontWeight: "400",
                transition: "all 0.2s ease",
              }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
            {search && (
              <div 
                className="position-absolute end-0 me-3 bg-light rounded-pill px-2 py-1 small"
                style={{
                  cursor: "pointer",
                  color: "#94969f",
                  background: "#e4e5e9",
                }}
                onClick={() => setSearch("")}
              >
                ✕
              </div>
            )}
          </div>

          {/* right side menu */}
          <Nav className="fw-semibold d-flex align-items-center gap-3">

            {/* wishlist */}
            <Nav.Link
              as={Link}
              to="/wishlist"
              className="d-flex flex-column align-items-center px-2 py-1 position-relative"
              style={{
                borderRadius: "6px",
                transition: "all 0.2s ease",
                fontSize: "12px",
                color: "#282c3f",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#f5f5f6";
                e.currentTarget.style.color = "#ff3e6c";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#282c3f";
              }}
            >
              <Heart size={18} className="mb-1" />
              <span style={{ fontSize: "11px", fontWeight: "500" }}>Wishlist</span>
            </Nav.Link>

            {/* vag */}
            <Nav.Link
              as={Link}
              to="/cart"
              className="d-flex flex-column align-items-center px-2 py-1 position-relative"
              style={{
                borderRadius: "6px",
                transition: "all 0.2s ease",
                fontSize: "12px",
                color: "#282c3f",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#f5f5f6";
                e.currentTarget.style.color = "#ff3e6c";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#282c3f";
              }}
            >
              <Bag size={18} className="mb-1" />
              <span style={{ fontSize: "11px", fontWeight: "500" }}>Bag</span>
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/admin/products"
              className="px-3 py-1 ms-2"
              style={{
                borderRadius: "6px",
                background: "#f5f5f6",
                border: "1px solid #e5e5e5",
                fontSize: "12px",
                fontWeight: "600",
                color: "#282c3f",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#ff3e6c";
                e.currentTarget.style.color = "white";
                e.currentTarget.style.borderColor = "#ff3e6c";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#f5f5f6";
                e.currentTarget.style.color = "#282c3f";
                e.currentTarget.style.borderColor = "#e5e5e5";
              }}
            >
              ADD PRODUCT
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyntraNavbar;
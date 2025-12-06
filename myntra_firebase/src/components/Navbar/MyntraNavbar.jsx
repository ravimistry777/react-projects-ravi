import { useState } from "react";
import { Container, Nav, Navbar, Form, Badge, Button, Modal, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Bag, Search, PersonCircle, BoxArrowRight } from "react-bootstrap-icons";
import { useAuth } from "../../context/AuthContext";
import { logOut } from "../../firebasee/auth";
import { useDispatch, useSelector } from "react-redux";

const MyntraNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ email: "", password: "", name: "" });
  const [authError, setAuthError] = useState("");
  const [authSuccess, setAuthSuccess] = useState("");

  const { currentUser } = useAuth();
  const { cartItems = [] } = useSelector((state) => state.cart || {});
  const { wishlistItems = [] } = useSelector((state) => state.wishlist || {});

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/search/${search}`);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError("");
    setAuthSuccess("");
    
    const { signIn } = await import("../../firebasee/auth");
    const result = await signIn(loginData.email, loginData.password);
    
    if (result.success) {
      setAuthSuccess("Login successful!");
      setTimeout(() => {
        setShowLoginModal(false);
        setLoginData({ email: "", password: "" });
        setAuthSuccess("");
      }, 1500);
    } else {
      setAuthError(result.error || "Login failed");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setAuthError("");
    setAuthSuccess("");
    
    const { signUp } = await import("../../firebasee/auth");
    const result = await signUp(signupData.email, signupData.password);
    
    if (result.success) {
      setAuthSuccess("Account created successfully! Please login.");
      setTimeout(() => {
        setShowSignupModal(false);
        setShowLoginModal(true);
        setSignupData({ email: "", password: "", name: "" });
        setAuthSuccess("");
      }, 2000);
    } else {
      setAuthError(result.error || "Signup failed");
    }
  };

  const handleLogout = async () => {
    const result = await logOut();
    if (result.success) {
      navigate("/");
    }
  };

  return (
    <>
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
              {/* User Profile */}
              {currentUser ? (
                <Dropdown>
                  <Dropdown.Toggle
                    variant="link"
                    className="d-flex flex-column align-items-center px-2 py-1"
                    style={{
                      border: "none",
                      textDecoration: "none",
                      color: "#282c3f",
                    }}
                  >
                    <PersonCircle size={18} className="mb-1" />
                    <span style={{ fontSize: "11px", fontWeight: "500" }}>
                      {currentUser.email.split('@')[0]}
                    </span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.ItemText className="small text-muted">
                      {currentUser.email}
                    </Dropdown.ItemText>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>
                      <BoxArrowRight className="me-2" />
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Button
                  variant="link"
                  className="d-flex flex-column align-items-center px-2 py-1"
                  style={{
                    border: "none",
                    textDecoration: "none",
                    color: "#282c3f",
                  }}
                  onClick={() => setShowLoginModal(true)}
                >
                  <PersonCircle size={18} className="mb-1" />
                  <span style={{ fontSize: "11px", fontWeight: "500" }}>Login</span>
                </Button>
              )}

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
                {wishlistItems.length > 0 && (
                  <Badge 
                    bg="danger"
                    className="position-absolute top-0 end-0 translate-middle"
                    style={{ fontSize: "10px", padding: "2px 4px" }}
                  >
                    {wishlistItems.length}
                  </Badge>
                )}
              </Nav.Link>

              {/* cart */}
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
                {cartItems.length > 0 && (
                  <Badge 
                    bg="danger"
                    className="position-absolute top-0 end-0 translate-middle"
                    style={{ fontSize: "10px", padding: "2px 4px" }}
                  >
                    {cartItems.length}
                  </Badge>
                )}
              </Nav.Link>

              {/* Admin link - only for logged in users */}
              {currentUser && (
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
                  ADMIN
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Login Modal */}
      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login to Myntra</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={loginData.email}
                onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                required
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                required
              />
            </Form.Group>
            
            {authError && (
              <div className="alert alert-danger small">{authError}</div>
            )}
            {authSuccess && (
              <div className="alert alert-success small">{authSuccess}</div>
            )}
            
            <Button 
              type="submit" 
              className="w-100 py-2"
              style={{
                background: "linear-gradient(135deg, #ff3e6c 0%, #ff7b9c 100%)",
                border: "none"
              }}
            >
              Login
            </Button>
          </Form>
          <div className="text-center mt-3">
            <p className="mb-0 small text-muted">
              Don't have an account?{" "}
              <Button 
                variant="link" 
                className="p-0 text-decoration-none"
                onClick={() => {
                  setShowLoginModal(false);
                  setShowSignupModal(true);
                }}
                style={{ color: "#ff3e6c" }}
              >
                Sign Up
              </Button>
            </p>
          </div>
        </Modal.Body>
      </Modal>

      {/* Signup Modal */}
      <Modal show={showSignupModal} onHide={() => setShowSignupModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSignup}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={signupData.name}
                onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={signupData.email}
                onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                required
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password (min 6 characters)"
                value={signupData.password}
                onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                minLength={6}
                required
              />
            </Form.Group>
            
            {authError && (
              <div className="alert alert-danger small">{authError}</div>
            )}
            {authSuccess && (
              <div className="alert alert-success small">{authSuccess}</div>
            )}
            
            <Button 
              type="submit" 
              className="w-100 py-2"
              style={{
                background: "linear-gradient(135deg, #ff3e6c 0%, #ff7b9c 100%)",
                border: "none"
              }}
            >
              Create Account
            </Button>
          </Form>
          <div className="text-center mt-3">
            <p className="mb-0 small text-muted">
              Already have an account?{" "}
              <Button 
                variant="link" 
                className="p-0 text-decoration-none"
                onClick={() => {
                  setShowSignupModal(false);
                  setShowLoginModal(true);
                }}
                style={{ color: "#ff3e6c" }}
              >
                Login
              </Button>
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MyntraNavbar;
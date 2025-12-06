import { Container, Row, Col } from "react-bootstrap";
import facebook from "../../assets/fb.png";
import x from "../../assets/x.png";
import yt from "../../assets/yt.png";


const Footer = () => {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
        paddingTop: "60px",
        paddingBottom: "40px",
        marginTop: "80px",
        color: "#ffffff",
      }}
    >
      <Container>
        <Row>

          <Col lg={3} md={6} className="mb-5">
            <h6 className="fw-bold mb-4" style={{ 
              color: "#ffffff", 
              fontSize: "16px",
              letterSpacing: "0.5px"
            }}>
              ONLINE SHOPPING
            </h6>
            <div className="d-flex flex-column gap-3">
              {["Men", "Women", "Kids", "Home & Living", "Beauty", "Gift Cards"].map((item) => (
                <p 
                  key={item}
                  className="footer-link m-0"
                  style={{
                    fontSize: "14px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    padding: "4px 0",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "#ff3e6c";
                    e.target.style.transform = "translateX(8px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "#b0b0b0";
                    e.target.style.transform = "translateX(0)";
                  }}
                >
                  {item}
                </p>
              ))}
            </div>
          </Col>

          <Col lg={3} md={6} className="mb-5">
            <h6 className="fw-bold mb-4" style={{ 
              color: "#ffffff", 
              fontSize: "16px",
              letterSpacing: "0.5px"
            }}>
              CUSTOMER POLICIES
            </h6>
            <div className="d-flex flex-column gap-3">
              {["Contact Us", "FAQ", "Terms & Conditions", "Returns", "Shipping", "Privacy Policy"].map((item) => (
                <p 
                  key={item}
                  className="footer-link m-0"
                  style={{
                    fontSize: "14px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    padding: "4px 0",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "#ff3e6c";
                    e.target.style.transform = "translateX(8px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "#b0b0b0";
                    e.target.style.transform = "translateX(0)";
                  }}
                >
                  {item}
                </p>
              ))}
            </div>
          </Col>

          <Col lg={3} md={6} className="mb-5">
            <h6 className="fw-bold mb-4" style={{ 
              color: "#ffffff", 
              fontSize: "16px",
              letterSpacing: "0.5px"
            }}>
              KEEP IN TOUCH
            </h6>
            <div className="d-flex gap-3 mb-4">
              {[
                { src: facebook , alt: "Facebook" },
                { src: x, alt: "Twitter" },
                { src: "https://cdn-icons-png.flaticon.com/512/733/733614.png", alt: "Instagram" },
                { src: yt, alt: "YouTube" }
              ].map((social, index) => (
                <div
                  key={index}
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    background: "rgba(255, 255, 255, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#ff3e6c";
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 8px 20px rgba(255, 62, 108, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <img
                    src={social.src}
                    width="20"
                    height="20"
                    alt={social.alt}
                    style={{
                      filter: "brightness(0) invert(1)",
                    }}
                  />
                </div>
              ))}
            </div>
            
            <div className="mt-4">
              <h6 className="fw-bold mb-3" style={{ fontSize: "14px", color: "#ffffff" }}>
                DOWNLOAD THE APP
              </h6>
              <div className="d-flex gap-2">
                <img 
                  src="https://png.pngtree.com/png-vector/20230817/ourmid/pngtree-google-play-store-vector-png-image_9183318.png" 
                  width="80"
                  alt="Google Play"
                  style={{ cursor: "pointer", borderRadius: "8px"}}
                />
                <img 
                  src="https://download.logo.wine/logo/App_Store_(iOS)/App_Store_(iOS)-Logo.wine.png" 
                  width="120" 
                  alt="App Store"
                  style={{ cursor: "pointer", borderRadius: "8px" }}
                />
              </div>
            </div>
          </Col>

          <Col lg={3} md={6} className="mb-5">
            <div className="d-flex flex-column gap-4">
              <div>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    background: "linear-gradient(135deg, #ff3e6c 0%, #ff7b9c 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <span style={{ color: "white", fontSize: "12px", fontWeight: "bold" }}>✓</span>
                  </div>
                  <h6 className="fw-bold mb-0" style={{ color: "#ffffff", fontSize: "14px" }}>
                    100% ORIGINAL
                  </h6>
                </div>
                <p className="m-0" style={{ color: "#b0b0b0", fontSize: "13px", lineHeight: "1.5" }}>
                  Guarantee for all products at Myntra.
                </p>
              </div>

              <div>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    background: "linear-gradient(135deg, #ff3e6c 0%, #ff7b9c 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <span style={{ color: "white", fontSize: "12px", fontWeight: "bold" }}>↻</span>
                  </div>
                  <h6 className="fw-bold mb-0" style={{ color: "#ffffff", fontSize: "14px" }}>
                    RETURN WITHIN 14 DAYS
                  </h6>
                </div>
                <p className="m-0" style={{ color: "#b0b0b0", fontSize: "13px", lineHeight: "1.5" }}>
                  Easy return/exchange available.
                </p>
              </div>

              <div>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    background: "linear-gradient(135deg, #ff3e6c 0%, #ff7b9c 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <span style={{ color: "white", fontSize: "12px", fontWeight: "bold" }}>🚚</span>
                  </div>
                  <h6 className="fw-bold mb-0" style={{ color: "#ffffff", fontSize: "14px" }}>
                    FREE SHIPPING
                  </h6>
                </div>
                <p className="m-0" style={{ color: "#b0b0b0", fontSize: "13px", lineHeight: "1.5" }}>
                  On orders above ₹499.
                </p>
              </div>
            </div>
          </Col>
        </Row>

        <hr style={{ 
          border: "none", 
          height: "1px", 
          background: "rgba(255, 255, 255, 0.1)",
          margin: "40px 0 30px 0" 
        }} />

        <div className="text-center">
          <p className="m-0" style={{ 
            color: "#b0b0b0", 
            fontSize: "14px",
            letterSpacing: "0.3px"
          }}>
            © {new Date().getFullYear()} Myntra clone , Built for learning purposes only
          </p>
          <p className="m-0 mt-2" style={{ 
            color: "#888", 
            fontSize: "12px",
          }}>
            This is a demo project., Not affiliated with Myntra.
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
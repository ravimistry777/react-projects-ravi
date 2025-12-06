import { useEffect } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard/ProductCard";
import { getAllProductsAsync } from "../services/actions/productAction";
import { StarFill, Award } from "react-bootstrap-icons";

const Men = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllProductsAsync());
  }, []);

  const filtered = products.filter(item => item.category === "Men");

  return (
    <Container className="my-5">

      {/* HERO BANNER */}
      <div
        className="position-relative rounded-4 overflow-hidden mb-5"
        style={{
          width: "100%",
          height: "400px",
          background:
            "linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(255, 62, 108, 0.6) 100%), url('') no-repeat center/cover",
        }}
      >
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center">
          <div className="text-white ps-5" style={{ maxWidth: "500px" }}>
            <Badge 
              bg="light" 
              text="dark" 
              className="mb-3 px-3 py-2 fw-semibold d-flex align-items-center gap-2 w-fit-content"
              style={{ fontSize: "14px", borderRadius: "20px" }}
            >
              <Award size={14} color="#ff3e6c" /> Premium Collection
            </Badge>
            <h1 className="fw-bold display-5 mb-3">Men's Fashion</h1>
            <p className="fs-5 mb-4 opacity-90">
              Elevate your style with our premium men's collection. From casual wear to formal attire, find your perfect fit.
            </p>
            <div className="d-flex align-items-center gap-4">
              <div className="d-flex align-items-center gap-2">
                <div className="d-flex text-warning">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarFill key={star} size={16} />
                  ))}
                </div>
                <span className="text-white fs-6">4.9/5</span>
              </div>
              <div className="text-white fs-6">
                <strong>{filtered.length}</strong> Products
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HEADER SECTION */}
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h2 className="fw-bold mb-2" style={{ color: "#2a2a2a", fontSize: "2rem" }}>
            Men's Collection
          </h2>
          <p className="text-muted mb-0" style={{ fontSize: "16px" }}>
            Premium quality clothing for the modern man
          </p>
        </div>
        <Badge 
          bg="primary" 
          className="px-3 py-2 fw-semibold"
          style={{ 
            fontSize: "14px", 
            borderRadius: "12px",
            background: "linear-gradient(135deg, #2a2a2a 0%, #ff3e6c 100%)",
            border: "none"
          }}
        >
          {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
        </Badge>
      </div>

      {/* PRODUCTS GRID */}
      {filtered.length === 0 ? (
        <div className="text-center py-5">
          <div 
            className="mx-auto mb-4 d-flex align-items-center justify-content-center"
            style={{
              width: "100px",
              height: "100px",
              background: "linear-gradient(135deg, rgba(42, 42, 42, 0.1) 0%, rgba(255, 62, 108, 0.1) 100%)",
              borderRadius: "25px",
            }}
          >
            <span style={{ fontSize: "40px" }}>👔</span>
          </div>
          <h4 className="fw-bold mb-3" style={{ color: "#2a2a2a" }}>
            No Men's Products Available
          </h4>
          <p className="text-muted mb-4" style={{ fontSize: "16px" }}>
            We're adding more stylish men's wear soon!
          </p>
        </div>
      ) : (
        <Row>
          {filtered.map((item, index) => (
            <Col xl={3} lg={4} md={6} className="mb-4 fade-in" key={item.id}>
              <ProductCard item={item} />
            </Col>
          ))}
        </Row>
      )}

      {/* FEATURES SECTION */}
      <Row className="mt-5 pt-5">
        <Col md={4} className="text-center mb-4">
          <div 
            className="mx-auto mb-3 d-flex align-items-center justify-content-center"
            style={{
              width: "70px",
              height: "70px",
              background: "linear-gradient(135deg, rgba(42, 42, 42, 0.1) 0%, rgba(255, 62, 108, 0.1) 100%)",
              borderRadius: "20px",
            }}
          >
            <span style={{ fontSize: "28px" }}>🎯</span>
          </div>
          <h5 className="fw-bold mb-2" style={{ color: "#2a2a2a" }}>Premium Quality</h5>
          <p className="text-muted" style={{ fontSize: "14px" }}>
            Crafted with premium fabrics for lasting comfort
          </p>
        </Col>
        
        <Col md={4} className="text-center mb-4">
          <div 
            className="mx-auto mb-3 d-flex align-items-center justify-content-center"
            style={{
              width: "70px",
              height: "70px",
              background: "linear-gradient(135deg, rgba(42, 42, 42, 0.1) 0%, rgba(255, 62, 108, 0.1) 100%)",
              borderRadius: "20px",
            }}
          >
            <span style={{ fontSize: "28px" }}>📏</span>
          </div>
          <h5 className="fw-bold mb-2" style={{ color: "#2a2a2a" }}>Perfect Fit</h5>
          <p className="text-muted" style={{ fontSize: "14px" }}>
            Available in all sizes for the perfect fit
          </p>
        </Col>
        
        <Col md={4} className="text-center mb-4">
          <div 
            className="mx-auto mb-3 d-flex align-items-center justify-content-center"
            style={{
              width: "70px",
              height: "70px",
              background: "linear-gradient(135deg, rgba(42, 42, 42, 0.1) 0%, rgba(255, 62, 108, 0.1) 100%)",
              borderRadius: "20px",
            }}
          >
            <span style={{ fontSize: "28px" }}>🚚</span>
          </div>
          <h5 className="fw-bold mb-2" style={{ color: "#2a2a2a" }}>Fast Delivery</h5>
          <p className="text-muted" style={{ fontSize: "14px" }}>
            Quick shipping with easy returns
          </p>
        </Col>
      </Row>

      {/* ANIMATION */}
      <style>{`
        .fade-in {
          animation: fade 0.6s ease-in;
        }
        @keyframes fade {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        .men-banner {
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
      `}</style>

    </Container>
  );
};

export default Men;
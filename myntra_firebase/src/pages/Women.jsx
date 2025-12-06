import { useEffect } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getAllProductsAsync } from "../services/actions/productAction";
import ProductCard from "../components/ProductCard/ProductCard";

const Women = () => {
  const dispatch = useDispatch();
  const { products } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(getAllProductsAsync());
  }, []);

  const filtered = products.filter(item => item.category === "Women");

  return (
    <Container className="my-5">
      <div
        className="mb-5 rounded-4 overflow-hidden"
        style={{
          width: "100%",
          height: "300px",
          background: "url('') no-repeat center/cover",
          borderRadius: "20px"
        }}
      >
        <div className="w-100 h-100 d-flex align-items-center" style={{ background: "rgba(0,0,0,0.3)" }}>
          <div className="text-white ps-5" style={{ maxWidth: "500px" }}>
            <Badge 
              bg="light" 
              text="dark" 
              className="mb-3 px-3 py-2 fw-semibold"
              style={{ fontSize: "14px", borderRadius: "20px" }}
            >
              Trending Collection
            </Badge>
            <h1 className="fw-bold mb-3">Women's Fashion</h1>
            <p className="fs-5 mb-4">
              Discover the latest trends in women's fashion
            </p>
          </div>
        </div>
      </div>

      {/* HEADER SECTION */}
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h2 className="fw-bold mb-2" style={{ color: "#2a2a2a" }}>
            Women's Collection
          </h2>
          <p className="text-muted mb-0">
            Elegant and trendy fashion for the modern woman
          </p>
        </div>
        <Badge 
          bg="primary" 
          className="px-3 py-2 fw-semibold"
          style={{ 
            fontSize: "14px", 
            borderRadius: "12px",
            backgroundColor: "#ff3e6c"
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
              backgroundColor: "rgba(255, 62, 108, 0.1)",
              borderRadius: "25px",
            }}
          >
            <span style={{ fontSize: "40px" }}>👗</span>
          </div>
          <h4 className="fw-bold mb-3" style={{ color: "#2a2a2a" }}>
            No Women's Products Available
          </h4>
          <p className="text-muted mb-4">
            We're adding more beautiful women's wear soon!
          </p>
        </div>
      ) : (
        <Row>
          {filtered.map((item, index) => (
            <Col xl={3} lg={4} md={6} className="mb-4" key={item.id}>
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
              backgroundColor: "rgba(255, 62, 108, 0.1)",
              borderRadius: "20px",
            }}
          >
            <span style={{ fontSize: "28px" }}>✨</span>
          </div>
          <h5 className="fw-bold mb-2">Elegant Designs</h5>
          <p className="text-muted">
            Curated collection of stylish outfits
          </p>
        </Col>
        
        <Col md={4} className="text-center mb-4">
          <div 
            className="mx-auto mb-3 d-flex align-items-center justify-content-center"
            style={{
              width: "70px",
              height: "70px",
              backgroundColor: "rgba(255, 62, 108, 0.1)",
              borderRadius: "20px",
            }}
          >
            <span style={{ fontSize: "28px" }}>🎀</span>
          </div>
          <h5 className="fw-bold mb-2">Premium Quality</h5>
          <p className="text-muted">
            High-quality materials for comfort
          </p>
        </Col>
        
        <Col md={4} className="text-center mb-4">
          <div 
            className="mx-auto mb-3 d-flex align-items-center justify-content-center"
            style={{
              width: "70px",
              height: "70px",
              backgroundColor: "rgba(255, 62, 108, 0.1)",
              borderRadius: "20px",
            }}
          >
            <span style={{ fontSize: "28px" }}>🌟</span>
          </div>
          <h5 className="fw-bold mb-2">Perfect Fit</h5>
          <p className="text-muted">
            Flattering cuts for all body types
          </p>
        </Col>
      </Row>

    </Container>
  );
};

export default Women;
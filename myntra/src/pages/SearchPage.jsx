import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import ProductCard from "../components/ProductCard/ProductCard";
import { getAllProductsAsync } from "../services/actions/productAction";
import { Search, ArrowLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const { query } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, isLoading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllProductsAsync());
  }, []);

  const filtered = products.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Container className="my-5">
      {/* SEARCH HEADER */}
      <div className="d-flex align-items-center gap-4 mb-5">
        <Button
          variant="outline-dark"
          className="d-flex align-items-center gap-2"
          onClick={() => navigate(-1)}
          style={{
            borderRadius: "12px",
            border: "2px solid #e0e0e0",
            padding: "10px 20px",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#2a2a2a";
            e.target.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "transparent";
            e.target.style.color = "#2a2a2a";
          }}
        >
          <ArrowLeft size={16} />
          Back
        </Button>

        <div className="flex-grow-1">
          <div className="d-flex align-items-center gap-3 mb-2">
            <div 
              className="d-flex align-items-center justify-content-center"
              style={{
                width: "50px",
                height: "50px",
                background: "linear-gradient(135deg, #ff3e6c 0%, #ff7b9c 100%)",
                borderRadius: "12px",
              }}
            >
              <Search size={20} color="white" />
            </div>
            <div>
              <h1 className="fw-bold mb-1" style={{ color: "#2a2a2a" }}>
                Search Results
              </h1>
              <p className="text-muted mb-0">Found {filtered.length} results for your search</p>
            </div>
          </div>
        </div>
      </div>

      {/* SEARCH QUERY CARD */}
      <Card
        className="border-0 p-4 mb-5"
        style={{
          borderRadius: "20px",
          background: "linear-gradient(135deg, rgba(255, 62, 108, 0.05) 0%, rgba(255, 123, 156, 0.05) 100%)",
          border: "1px solid rgba(255, 62, 108, 0.1)",
        }}
      >
        <div className="d-flex align-items-center gap-3">
          <Badge 
            bg="light" 
            text="dark" 
            className="px-3 py-2 fw-semibold"
            style={{ fontSize: "14px", borderRadius: "10px" }}
          >
            Search Query
          </Badge>
          <h3 className="fw-bold mb-0" style={{ color: "#ff3e6c" }}>
            "{query}"
          </h3>
        </div>
      </Card>

      {/* RESULTS */}
      {filtered.length === 0 ? (
        <Card 
          className="text-center py-5 border-0"
          style={{
            background: "linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
          }}
        >
          <div 
            className="mx-auto mb-4 d-flex align-items-center justify-content-center"
            style={{
              width: "120px",
              height: "120px",
              background: "rgba(255, 62, 108, 0.1)",
              borderRadius: "30px",
            }}
          >
            <Search size={40} color="#ff3e6c" />
          </div>
          <h3 className="fw-bold mb-3" style={{ color: "#2a2a2a" }}>
            No Results Found
          </h3>
          <p className="text-muted mb-4 fs-5">
            We couldn't find any products matching "<strong>{query}</strong>"
          </p>
          <div className="d-flex gap-3 justify-content-center">
            <Button
              onClick={() => navigate('/')}
              className="px-4 py-2 fw-bold"
              style={{
                borderRadius: "12px",
                background: "linear-gradient(135deg, #ff3e6c 0%, #ff7b9c 100%)",
                border: "none",
              }}
            >
              Continue Shopping
            </Button>
            <Button
              variant="outline-dark"
              className="px-4 py-2 fw-bold"
              style={{
                borderRadius: "12px",
                border: "2px solid #2a2a2a",
              }}
              onClick={() => navigate(-1)}
            >
              Try Different Search
            </Button>
          </div>
        </Card>
      ) : (
        <>
          {/* RESULTS */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h4 className="fw-bold mb-1" style={{ color: "#2a2a2a" }}>
                Products Found
              </h4>
              <p className="text-muted mb-0">
                Showing {filtered.length} {filtered.length === 1 ? 'product' : 'products'} for "{query}"
              </p>
            </div>
            <Badge 
              bg="primary" 
              className="px-3 py-2 fw-semibold"
              style={{ 
                fontSize: "14px", 
                borderRadius: "12px",
                background: "linear-gradient(135deg, #ff3e6c 0%, #ff7b9c 100%)",
                border: "none"
              }}
            >
              {filtered.length} {filtered.length === 1 ? 'Result' : 'Results'}
            </Badge>
          </div>

          {/* PRODUCTS GRID */}
          <Row>
            {filtered.map((item, index) => (
              <Col xl={3} lg={4} md={6} className="mb-4 fade-in" key={item.id}>
                <ProductCard item={item} />
              </Col>
            ))}
          </Row>

          <Card className="mt-5 border-0" style={{ background: "rgba(0, 168, 83, 0.05)" }}>
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-3" style={{ color: "#2a2a2a" }}>Search Tips</h5>
              <Row>
                <Col md={4} className="mb-3">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <div style={{ color: "#00a853", fontSize: "18px" }}>•</div>
                    <span className="fw-semibold">Check spelling</span>
                  </div>
                  <p className="text-muted small mb-0">Make sure all words are spelled correctly</p>
                </Col>
                <Col md={4} className="mb-3">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <div style={{ color: "#00a853", fontSize: "18px" }}>•</div>
                    <span className="fw-semibold">Try different keywords</span>
                  </div>
                  <p className="text-muted small mb-0">Use more general or specific terms</p>
                </Col>
                <Col md={4} className="mb-3">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <div style={{ color: "#00a853", fontSize: "18px" }}>•</div>
                    <span className="fw-semibold">Browse categories</span>
                  </div>
                  <p className="text-muted small mb-0">Explore our Men, Women & Kids sections</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </>
      )}

      {/* EFFECT */}
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
      `}</style>
    </Container>
  );
};

export default SearchPage;
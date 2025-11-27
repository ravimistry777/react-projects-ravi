import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, Card, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductAsync } from "../services/actions/productAction";
import { addToCartAsync } from "../services/actions/cartAction";
import { addToWishlistAsync } from "../services/actions/wishlistAction";
import { Heart, HeartFill, Truck, ShieldCheck, ArrowReturnLeft } from "react-bootstrap-icons";

const sizes = ["S", "M", "L", "XL"];

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { product, isLoading } = useSelector((state) => state.products);
  const [selectedSize, setSelectedSize] = useState(null);
  const [mainImg, setMainImg] = useState("");
  const [wishlistAdded, setWishlistAdded] = useState(false);

  useEffect(() => {
    dispatch(getProductAsync(id));
  }, [id]);

  useEffect(() => {
    if (product) {
      setMainImg(product.images?.[0] || product.image);
    }
  }, [product]);

  const handleAddCart = () => {
    if (!selectedSize) return alert("Please select a size");
    dispatch(addToCartAsync({ ...product, selectedSize, quantity: 1 }));
  };

  const handleWishlist = () => {
    dispatch(addToWishlistAsync(product));
    setWishlistAdded(true);
  };

  return (
    <Container className="my-5">
      {isLoading || !product ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading product details...</p>
        </div>
      ) : (
        <Row>

          {/* THUMBNAILS */}
          <Col md={2} className="d-flex flex-md-column flex-row gap-3 mb-4 mb-md-0">
            {product.images?.map((img, index) => (
              <Card
                key={index}
                className="cursor-pointer"
                style={{
                  border: mainImg === img ? "3px solid #ff3e6c" : "2px solid #f0f0f0",
                  borderRadius: "12px",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                }}
                onClick={() => setMainImg(img)}
              >
                <img
                  src={img}
                  width="80"
                  height="80"
                  style={{
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
              </Card>
            ))}
          </Col>

          {/* MAIN IMAGE */}
          <Col md={5}>
            <Card
              className="border-0"
              style={{
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
              }}
            >
              <Card.Img
                src={mainImg}
                style={{ 
                  objectFit: "cover", 
                  height: "500px",
                  transition: "transform 0.3s ease"
                }}
                className="product-main-img"
              />
            </Card>
          </Col>

          {/* DETAILS */}
          <Col md={5}>
            {/* HEADER */}
            <div className="mb-3">
              <Badge 
                bg="light" 
                text="dark" 
                className="mb-2 px-3 py-2 fw-semibold"
                style={{ fontSize: "12px", borderRadius: "8px" }}
              >
                {product.category}
              </Badge>
              <h1 className="fw-bold mb-2" style={{ color: "#2a2a2a", fontSize: "28px" }}>
                {product.title}
              </h1>
            </div>

            {/* RATING */}
            <div className="d-flex align-items-center gap-3 mb-4">
              <div className="d-flex align-items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} style={{ color: "#ffc107", fontSize: "16px" }}>★</span>
                ))}
              </div>
              <span style={{ color: "#666", fontSize: "14px" }}>4.8 (1.2k reviews)</span>
            </div>

            {/* PRICE SECTION */}
            <div className="mb-4 p-4 rounded-3" style={{ background: "rgba(255, 62, 108, 0.05)", border: "1px solid rgba(255, 62, 108, 0.1)" }}>
              <div className="d-flex align-items-center gap-3 mb-2">
                <h2 className="fw-bold mb-0" style={{ color: "#ff3e6c" }}>
                  ₹{product.price}
                </h2>
                {product.mrp && (
                  <>
                    <span
                      style={{
                        textDecoration: "line-through",
                        fontSize: "18px",
                        color: "#999",
                        fontWeight: "500"
                      }}
                    >
                      ₹{product.mrp}
                    </span>
                    <Badge 
                      bg="success" 
                      className="px-2 py-1"
                      style={{ fontSize: "12px", borderRadius: "6px" }}
                    >
                      {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                    </Badge>
                  </>
                )}
              </div>
              <p className="mb-0 small text-success fw-semibold">
                You save ₹{product.mrp ? product.mrp - product.price : 0} on this product
              </p>
            </div>

            <hr className="my-4" />

            {/* SIZE SELECTOR */}
            <div className="mb-4">
              <h5 className="fw-bold mb-3">SELECT SIZE</h5>
              <div className="d-flex gap-3">
                {sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "primary" : "outline-dark"}
                    onClick={() => setSelectedSize(size)}
                    style={{
                      borderRadius: "12px",
                      width: "60px",
                      height: "45px",
                      border: selectedSize === size ? "none" : "2px solid #e0e0e0",
                      background: selectedSize === size ? "linear-gradient(135deg, #ff3e6c 0%, #ff7b9c 100%)" : "transparent",
                      color: selectedSize === size ? "white" : "#2a2a2a",
                      fontWeight: "600",
                      transition: "all 0.3s ease"
                    }}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* ADD BUTTONS */}
            <div className="d-flex gap-3 mb-4">
              <Button
                className="py-3 fw-bold flex-fill"
                onClick={handleAddCart}
                style={{
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #ff3e6c 0%, #ff7b9c 100%)",
                  border: "none",
                  fontSize: "16px",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 15px rgba(255, 62, 108, 0.3)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 8px 25px rgba(255, 62, 108, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 4px 15px rgba(255, 62, 108, 0.3)";
                }}
              >
                ADD TO BAG
              </Button>

              <Button
                variant={wishlistAdded ? "primary" : "outline-danger"}
                className="py-3 px-4 fw-bold d-flex align-items-center gap-2"
                onClick={handleWishlist}
                style={{
                  borderRadius: "12px",
                  border: wishlistAdded ? "none" : "2px solid #ff3e6c",
                  background: wishlistAdded ? "linear-gradient(135deg, #ff3e6c 0%, #ff7b9c 100%)" : "transparent",
                  color: wishlistAdded ? "white" : "#ff3e6c",
                  transition: "all 0.3s ease"
                }}
              >
                {wishlistAdded ? <HeartFill size={18} /> : <Heart size={18} />}
              </Button>
            </div>

            {/* DELIVERY CHECK */}
            <Card className="mb-4 border-0" style={{ background: "rgba(0, 168, 83, 0.05)" }}>
              <Card.Body className="p-3">
                <div className="d-flex align-items-center gap-3">
                  <Truck size={20} color="#00a853" />
                  <div>
                    <h6 className="fw-bold mb-1" style={{ color: "#2a2a2a" }}>Free Delivery</h6>
                    <p className="mb-0 small text-muted">Enter your PIN code to check delivery time</p>
                  </div>
                </div>
                <div className="mt-3 d-flex gap-2">
                  <Form.Control
                    placeholder="Enter PIN Code"
                    className="py-2"
                    style={{
                      borderRadius: "8px",
                      border: "1px solid #e0e0e0"
                    }}
                  />
                  <Button 
                    variant="outline-success" 
                    className="py-2 px-3"
                    style={{ borderRadius: "8px" }}
                  >
                    Check
                  </Button>
                </div>
              </Card.Body>
            </Card>

            {/* PRODUCT DESCRIPTION */}
            <div className="mb-4">
              <h5 className="fw-bold mb-3">PRODUCT DETAILS</h5>
              <p className="text-muted" style={{ lineHeight: "1.6" }}>
                {product.desc}
              </p>
            </div>

            {/* POLICY SECTION */}
            <Card className="border-0" style={{ background: "rgba(255, 62, 108, 0.05)" }}>
              <Card.Body className="p-4">
                <h6 className="fw-bold mb-3">BENEFITS</h6>
                <div className="d-flex flex-column gap-3">
                  <div className="d-flex align-items-center gap-3">
                    <ShieldCheck size={20} color="#ff3e6c" />
                    <span className="small">100% Original Products</span>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <ArrowReturnLeft size={20} color="#ff3e6c" />
                    <span className="small">Easy 14-day return and exchange</span>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <Truck size={20} color="#ff3e6c" />
                    <span className="small">Free delivery on orders above ₹499</span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      <style>{`
        .cursor-pointer { cursor: pointer; }
        .product-main-img:hover { transform: scale(1.02); }
      `}</style>
    </Container>
  );
};

export default ProductDetails;
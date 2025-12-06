import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, Card, Badge, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getProductAsync } from "../services/actions/productAction";
import { addToCartAsync } from "../services/actions/cartAction";
import { addToWishlistAsync, removeFromWishlistAsync } from "../services/actions/wishlistAction";
import { Heart, HeartFill, Truck, ShieldCheck, ArrowReturnLeft, Bag, Star, StarFill } from "react-bootstrap-icons";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const sizes = ["S", "M", "L", "XL"];

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const { product, isLoading, error } = useSelector((state) => state.products);
  const { wishlistItems = [] } = useSelector((state) => state.wishlist || {});
  
  const [selectedSize, setSelectedSize] = useState("M");
  const [mainImg, setMainImg] = useState("");
  const [wishlistAdded, setWishlistAdded] = useState(false);
  const [pinCode, setPinCode] = useState("");

  useEffect(() => {
    dispatch(getProductAsync(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (product) {
      setMainImg(product.images?.[0] || product.image || "");
      setSelectedSize(product.selectedSize || "M");
      
      // Check if product is in wishlist
      if (currentUser && wishlistItems) {
        const isInWishlist = wishlistItems.some(item => 
          item.id === product.id || item.productId === product.id
        );
        setWishlistAdded(isInWishlist);
      }
    }
  }, [product, currentUser, wishlistItems]);

  const handleAddToCart = () => {
    if (!currentUser) {
      toast.error("🔐 Please login to add items to cart!", {
        position: "bottom-right",
        autoClose: 3000,
      });
      return;
    }

    if (!selectedSize) {
      toast.warning("📏 Please select a size!", {
        position: "bottom-right",
        autoClose: 3000,
      });
      return;
    }

    const cartItem = {
      productId: product.id,
      title: product.title || product.name,
      price: product.price || 0,
      images: product.images || [product.image || "https://via.placeholder.com/300"],
      quantity: 1,
      selectedSize: selectedSize,
      category: product.category,
      description: product.desc || product.description,
      mrp: product.mrp || product.price,
      addedAt: new Date().toISOString()
    };

    dispatch(addToCartAsync(cartItem, currentUser.uid));
    
    toast.success("🛍️ Added to bag successfully!", {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  const handleWishlist = () => {
    if (!currentUser) {
      toast.error("🔐 Please login to manage wishlist!", {
        position: "bottom-right",
        autoClose: 3000,
      });
      return;
    }

    if (wishlistAdded) {
      // Remove from wishlist
      dispatch(removeFromWishlistAsync(product.id, currentUser.uid));
      setWishlistAdded(false);
      toast.info("❤️ Removed from wishlist", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } else {
      // Add to wishlist
      const wishlistItem = {
        productId: product.id,
        title: product.title || product.name,
        price: product.price || 0,
        images: product.images || [product.image || "https://via.placeholder.com/300"],
        selectedSize: selectedSize,
        category: product.category,
        description: product.desc || product.description,
        mrp: product.mrp || product.price,
        addedAt: new Date().toISOString()
      };

      dispatch(addToWishlistAsync(wishlistItem, currentUser.uid));
      setWishlistAdded(true);
      toast.success("❤️ Added to wishlist!", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  const handleCheckDelivery = () => {
    if (pinCode.length === 6) {
      toast.success(`🚚 Delivery available to ${pinCode}!`, {
        position: "bottom-right",
        autoClose: 3000,
      });
    } else {
      toast.error("📮 Please enter a valid 6-digit PIN code", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  if (isLoading) {
    return (
      <Container className="my-5">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading product details...</p>
        </div>
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container className="my-5">
        <Card className="text-center py-5 border-0">
          <div className="alert alert-danger">
            <h4>Product Not Found</h4>
            <p>{error || "The product you're looking for doesn't exist."}</p>
            <Button onClick={() => navigate("/")} className="mt-3">
              Continue Shopping
            </Button>
          </div>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      {/* USER NOT LOGGED IN ALERT */}
      {!currentUser && (
        <Alert variant="warning" className="mb-4">
          <strong>Please login</strong> to add items to cart or wishlist.
        </Alert>
      )}

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
                background: "#fff",
              }}
              onClick={() => setMainImg(img)}
            >
              <img
                src={img || "https://via.placeholder.com/80x80?text=Image"}
                width="80"
                height="80"
                style={{
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
                alt={`Product view ${index + 1}`}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/80x80?text=Image";
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
              src={mainImg || "https://via.placeholder.com/500x500?text=Product+Image"}
              style={{ 
                objectFit: "cover", 
                height: "500px",
                transition: "transform 0.3s ease"
              }}
              className="product-main-img"
              alt={product.title}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/500x500?text=Product+Image";
              }}
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
              style={{ 
                fontSize: "12px", 
                borderRadius: "8px",
                background: "#ff3e6c",
                color: "white"
              }}
            >
              {product.category || "Category"}
            </Badge>
            <h1 className="fw-bold mb-2" style={{ color: "#2a2a2a", fontSize: "28px" }}>
              {product.title || product.name || "Product"}
            </h1>
          </div>

          {/* RATING */}
          <div className="d-flex align-items-center gap-3 mb-4">
            <div className="d-flex align-items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                star <= (product.rating || 4) ? (
                  <StarFill key={star} size={16} color="#ffc107" />
                ) : (
                  <Star key={star} size={16} color="#ddd" />
                )
              ))}
            </div>
            <span style={{ color: "#666", fontSize: "14px" }}>
              {product.rating || 4}.8 ({product.ratingCount || "1.2k"} reviews)
            </span>
          </div>

          {/* PRICE SECTION */}
          <div className="mb-4 p-4 rounded-3" style={{ 
            background: "rgba(255, 62, 108, 0.05)", 
            border: "1px solid rgba(255, 62, 108, 0.1)" 
          }}>
            <div className="d-flex align-items-center gap-3 mb-2">
              <h2 className="fw-bold mb-0" style={{ color: "#ff3e6c" }}>
                ₹{product.price || 0}
              </h2>
              {product.mrp && product.mrp > product.price && (
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
                  disabled={!currentUser}
                  style={{
                    borderRadius: "12px",
                    width: "60px",
                    height: "45px",
                    border: selectedSize === size ? "none" : "2px solid #e0e0e0",
                    background: selectedSize === size ? 
                      "linear-gradient(135deg, #ff3e6c 0%, #ff7b9c 100%)" : 
                      "transparent",
                    color: selectedSize === size ? "white" : "#2a2a2a",
                    fontWeight: "600",
                    transition: "all 0.3s ease",
                    opacity: currentUser ? 1 : 0.6,
                    cursor: currentUser ? "pointer" : "not-allowed"
                  }}
                  title={currentUser ? `Select size ${size}` : "Login to select size"}
                >
                  {size}
                </Button>
              ))}
            </div>
            {!currentUser && (
              <div className="mt-2">
                <small className="text-muted">
                  <i>Login to select size</i>
                </small>
              </div>
            )}
          </div>

          {/* ADD BUTTONS */}
          <div className="d-flex gap-3 mb-4">
            <Button
              className="py-3 fw-bold flex-fill d-flex align-items-center justify-content-center gap-2"
              onClick={handleAddToCart}
              disabled={!currentUser || !selectedSize}
              style={{
                borderRadius: "12px",
                background: currentUser && selectedSize ? 
                  "linear-gradient(135deg, #ff3e6c 0%, #ff7b9c 100%)" : 
                  "#ccc",
                border: "none",
                fontSize: "16px",
                transition: "all 0.3s ease",
                boxShadow: currentUser && selectedSize ? 
                  "0 4px 15px rgba(255, 62, 108, 0.3)" : 
                  "none",
                opacity: currentUser && selectedSize ? 1 : 0.7,
                cursor: currentUser && selectedSize ? "pointer" : "not-allowed"
              }}
              onMouseEnter={(e) => {
                if (currentUser && selectedSize) {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 8px 25px rgba(255, 62, 108, 0.4)";
                }
              }}
              onMouseLeave={(e) => {
                if (currentUser && selectedSize) {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 4px 15px rgba(255, 62, 108, 0.3)";
                }
              }}
              title={currentUser ? 
                (selectedSize ? "Add to cart" : "Select size first") : 
                "Login to add to cart"
              }
            >
              <Bag size={18} />
              {currentUser ? "ADD TO BAG" : "LOGIN TO ADD"}
            </Button>

            <Button
              variant={wishlistAdded ? "primary" : "outline-danger"}
              className="py-3 px-4 fw-bold d-flex align-items-center justify-content-center gap-2"
              onClick={handleWishlist}
              disabled={!currentUser}
              style={{
                borderRadius: "12px",
                border: wishlistAdded ? "none" : "2px solid #ff3e6c",
                background: wishlistAdded ? 
                  "linear-gradient(135deg, #ff3e6c 0%, #ff7b9c 100%)" : 
                  "transparent",
                color: wishlistAdded ? "white" : "#ff3e6c",
                transition: "all 0.3s ease",
                opacity: currentUser ? 1 : 0.7,
                cursor: currentUser ? "pointer" : "not-allowed"
              }}
              title={currentUser ? 
                (wishlistAdded ? "Remove from wishlist" : "Add to wishlist") : 
                "Login to manage wishlist"
              }
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
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="py-2"
                  style={{
                    borderRadius: "8px",
                    border: "1px solid #e0e0e0"
                  }}
                  maxLength={6}
                />
                <Button 
                  variant="outline-success" 
                  className="py-2 px-3"
                  onClick={handleCheckDelivery}
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
              {product.desc || product.description || "No description available."}
            </p>
            {product.createdAt && (
              <p className="small text-muted mt-2">
                <i>Added on: {new Date(product.createdAt).toLocaleDateString()}</i>
              </p>
            )}
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

      <style>{`
        .cursor-pointer { cursor: pointer; }
        .product-main-img:hover { transform: scale(1.02); }
      `}</style>
    </Container>
  );
};

export default ProductDetails;
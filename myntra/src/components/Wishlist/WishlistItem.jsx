import { Button, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { removeFromWishlistAsync } from "../../services/actions/wishlistAction";
import { addToCartAsync } from "../../services/actions/cartAction";
import { HeartFill, Trash, Bag } from "react-bootstrap-icons";

const WishlistItem = ({ item }) => {
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(
      addToCartAsync({
        ...item,
        quantity: 1,
        selectedSize: item.selectedSize || "M",
      })
    );
    dispatch(removeFromWishlistAsync(item.id));
  };

  const removeItem = () => {
    dispatch(removeFromWishlistAsync(item.id));
  };

  return (
    <Row
      className="mb-4 p-4 rounded-3 wishlist-item"
      style={{
        border: "1px solid #f0f0f0",
        background: "#ffffff",
        transition: "all 0.4s ease",
        boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)",
      }}
    >
      {/* img */}
      <Col md={3}>
        <div style={{ position: "relative", overflow: "hidden", borderRadius: "12px" }}>
          <img
            src={item.images?.[0] || item.image}
            width="100%"
            height="240"
            style={{
              objectFit: "cover",
              borderRadius: "12px",
              transition: "transform 0.4s ease",
            }}
            className="wishlist-img"
          />

          {/* remove heart */}
          <div
            onClick={removeItem}
            style={{
              position: "absolute",
              right: "12px",
              top: "12px",
              background: "rgba(255, 255, 255, 0.95)",
              borderRadius: "50%",
              padding: "8px",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              backdropFilter: "blur(10px)",
            }}
            className="remove-heart"
          >
            <HeartFill size={20} color="#ff3e6c" />
          </div>

          {/* disc. */}
          {item.mrp && item.mrp > item.price && (
            <div
              style={{
                position: "absolute",
                left: "12px",
                top: "12px",
                background: "linear-gradient(135deg, #ff3e6c 0%, #ff7b9c 100%)",
                color: "white",
                borderRadius: "10px",
                padding: "4px 10px",
                fontSize: "12px",
                fontWeight: "700",
                boxShadow: "0 2px 8px rgba(255, 62, 108, 0.3)",
              }}
            >
              {Math.round(((item.mrp - item.price) / item.mrp) * 100)}% OFF
            </div>
          )}
        </div>
      </Col>

      {/* detailss */}
      <Col md={6} className="d-flex flex-column justify-content-between py-2">
        <div>
          <h5 
            className="fw-bold mb-2" 
            style={{ 
              color: "#2a2a2a", 
              fontSize: "18px",
              lineHeight: "1.3"
            }}
          >
            {item.title}
          </h5>
          <p 
            className="text-muted mb-2 text-uppercase small fw-semibold" 
            style={{ letterSpacing: "0.5px" }}
          >
            {item.category}
          </p>

          {/* size */}
          {item.selectedSize && (
            <p className="mb-2" style={{ fontSize: "14px", color: "#666" }}>
              Size: <strong>{item.selectedSize}</strong>
            </p>
          )}

          {/* prc */}
          <div className="d-flex align-items-center gap-2 mt-3">
            <h5
              className="fw-bold mb-0"
              style={{ color: "#2a2a2a", fontSize: "20px" }}
            >
              ₹{item.price}
            </h5>
            {item.mrp && item.mrp > item.price && (
              <span
                style={{
                  textDecoration: "line-through",
                  fontSize: "16px",
                  color: "#999",
                  fontWeight: "500"
                }}
              >
                ₹{item.mrp}
              </span>
            )}
          </div>
        </div>

        {/* btn */}
        <div className="d-flex gap-3 mt-4">
          <Button
            variant="primary"
            className="px-4 py-2 fw-semibold d-flex align-items-center gap-2"
            onClick={addToCart}
            style={{ 
              borderRadius: "10px",
              background: "linear-gradient(135deg, #ff3e6c 0%, #ff7b9c 100%)",
              border: "none",
              fontSize: "14px",
              transition: "all 0.3s ease",
              boxShadow: "0 2px 8px rgba(255, 62, 108, 0.2)",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 4px 15px rgba(255, 62, 108, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 2px 8px rgba(255, 62, 108, 0.2)";
            }}
          >
            <Bag size={16} /> Move to Bag
          </Button>

          <Button
            variant="outline-danger"
            className="px-4 py-2 fw-semibold d-flex align-items-center gap-2"
            onClick={removeItem}
            style={{ 
              borderRadius: "10px",
              border: "2px solid #ff3e6c",
              color: "#ff3e6c",
              fontSize: "14px",
              background: "transparent",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#ff3e6c";
              e.target.style.color = "white";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.color = "#ff3e6c";
              e.target.style.transform = "translateY(0)";
            }}
          >
            <Trash size={16} /> Remove
          </Button>
        </div>
      </Col>

      {/* HOVER */}
      <style>{`
        .wishlist-item:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
        }

        .wishlist-item:hover .wishlist-img {
          transform: scale(1.08);
        }

        .wishlist-item:hover .remove-heart {
          transform: scale(1.1);
          background: rgba(255, 255, 255, 1);
        }
      `}</style>
    </Row>
  );
};

export default WishlistItem;
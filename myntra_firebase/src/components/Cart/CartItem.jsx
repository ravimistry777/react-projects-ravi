import { Button, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateCartAsync, removeFromCartAsync } from "../../services/actions/cartAction";
import { Trash } from "react-bootstrap-icons";
import { useAuth } from "../../context/AuthContext";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();

  const increaseQty = () => {
    if (!currentUser) {
      alert("Please login to update cart!");
      return;
    }
    dispatch(updateCartAsync(item.id, { quantity: item.quantity + 1 }, currentUser.uid));
  };

  const decreaseQty = () => {
    if (!currentUser) {
      alert("Please login to update cart!");
      return;
    }
    if (item.quantity > 1) {
      dispatch(updateCartAsync(item.id, { quantity: item.quantity - 1 }, currentUser.uid));
    }
  };

  const removeItem = () => {
    if (!currentUser) {
      alert("Please login to remove items!");
      return;
    }
    dispatch(removeFromCartAsync(item.id, currentUser.uid));
  };

  return (
    <Row
      className="mb-4 p-4 rounded-3"
      style={{
        border: "1px solid #f0f0f0",
        background: "#fff",
        transition: "all 0.3s ease",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.12)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* pic */}
      <Col md={3} className="position-relative">
        <img
          src={item.images?.[0] || item.image || "https://via.placeholder.com/200x200?text=Product"}
          width="100%"
          height="200"
          style={{
            objectFit: "cover",
            borderRadius: "12px",
            border: "1px solid #f5f5f5",
          }}
          alt={item.title || item.name || "Product"}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/200x200?text=Product";
          }}
        />
        <div 
          className="position-absolute top-0 start-0 m-2 bg-white rounded-pill px-2 py-1"
          style={{
            fontSize: "12px",
            fontWeight: "600",
            color: "#ff3e6c",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
          }}
        >
          {item.selectedSize || "M"}
        </div>
      </Col>

      {/* product info */}
      <Col md={6} className="d-flex flex-column justify-content-between pt-1">
        <div>
          <h5 className="fw-bold mb-2" style={{ color: "#2a2a2a", lineHeight: "1.3" }}>
            {item.title || item.name || "Product Name"}
          </h5>
          <p className="text-muted mb-2" style={{ fontSize: "14px" }}>
            Size: <strong className="text-dark">{item.selectedSize || "Medium"}</strong>
          </p>
          {item.category && (
            <p className="text-muted small mb-1">
              Category: <span className="text-dark">{item.category}</span>
            </p>
          )}
          <p className="fw-bold fs-5 mb-3" style={{ color: "#ff3e6c" }}>
            ₹{item.price || 0}
          </p>
        </div>

        {/* quantity controls */}
        <div className="d-flex align-items-center mt-3">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={decreaseQty}
            disabled={!currentUser || item.quantity <= 1}
            style={{ 
              width: "36px", 
              height: "36px", 
              padding: 0,
              border: "1.5px solid #e0e0e0",
              borderRadius: "8px 0 0 8px",
              fontWeight: "600",
              fontSize: "16px",
              opacity: !currentUser || item.quantity <= 1 ? 0.5 : 1,
              cursor: !currentUser || item.quantity <= 1 ? "not-allowed" : "pointer"
            }}
          >
            -
          </Button>

          <div
            className="fw-bold d-flex align-items-center justify-content-center bg-light"
            style={{
              width: "50px",
              height: "36px",
              border: "1.5px solid #e0e0e0",
              borderLeft: "none",
              borderRight: "none",
              fontSize: "15px",
              color: !currentUser ? "#999" : "#2a2a2a",
              background: "#fafafa"
            }}
          >
            {item.quantity || 1}
          </div>

          <Button
            variant="outline-secondary"
            size="sm"
            onClick={increaseQty}
            disabled={!currentUser}
            style={{ 
              width: "36px", 
              height: "36px", 
              padding: 0,
              border: "1.5px solid #e0e0e0",
              borderRadius: "0 8px 8px 0",
              fontWeight: "600",
              fontSize: "16px",
              opacity: !currentUser ? 0.5 : 1,
              cursor: !currentUser ? "not-allowed" : "pointer"
            }}
          >
            +
          </Button>
          
          {!currentUser && (
            <div className="ms-3">
              <small className="text-danger">
                <i>Login to update quantity</i>
              </small>
            </div>
          )}
        </div>

        {/* remove button */}
        <Button
          variant="outline-danger"
          className="mt-4 d-flex align-items-center gap-2 w-fit-content"
          onClick={removeItem}
          disabled={!currentUser}
          style={{
            border: "1.5px solid #ff3e6c",
            borderRadius: "8px",
            padding: "8px 16px",
            fontSize: "14px",
            fontWeight: "500",
            transition: "all 0.2s ease",
            width: "fit-content",
            opacity: !currentUser ? 0.5 : 1,
            cursor: !currentUser ? "not-allowed" : "pointer"
          }}
          onMouseEnter={(e) => {
            if (currentUser) {
              e.target.style.backgroundColor = "#ff3e6c";
              e.target.style.color = "white";
            }
          }}
          onMouseLeave={(e) => {
            if (currentUser) {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = "#ff3e6c";
            }
          }}
        >
          <Trash size={16} /> Remove
        </Button>
        
        {!currentUser && (
          <div className="mt-2">
            <small className="text-muted">
              <i>Login to remove items from cart</i>
            </small>
          </div>
        )}
      </Col>

      {/* amount total */}
      <Col md={3} className="text-end d-flex flex-column justify-content-between align-items-end">
        <div className="text-center">
          <p className="text-muted mb-1" style={{ fontSize: "14px" }}>Total</p>
          <h4 className="fw-bold" style={{ color: "#ff3e6c", margin: 0 }}>
            ₹{(item.price || 0) * (item.quantity || 1)}
          </h4>
          <p className="text-success small mt-1 fw-medium">
            You save ₹{Math.round((item.price || 0) * (item.quantity || 1) * 0.1)}
          </p>
        </div>
        
        {/* Firebase item ID (debugging ke liye, production mein hata dena) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-3">
            <small className="text-muted">
              ID: {item.id?.substring(0, 8)}...
            </small>
          </div>
        )}
      </Col>
    </Row>
  );
};

export default CartItem;
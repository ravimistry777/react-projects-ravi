import { Button, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateCartAsync, removeFromCartAsync } from "../../services/actions/cartAction";
import { Trash } from "react-bootstrap-icons";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const increaseQty = () => {
    dispatch(updateCartAsync(item.id, { ...item, quantity: item.quantity + 1 }));
  };

  const decreaseQty = () => {
    if (item.quantity > 1) {
      dispatch(updateCartAsync(item.id, { ...item, quantity: item.quantity - 1 }));
    }
  };

  const removeItem = () => dispatch(removeFromCartAsync(item.id));

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
          src={item.images?.[0] || item.image}
          width="100%"
          height="200"
          style={{
            objectFit: "cover",
            borderRadius: "12px",
            border: "1px solid #f5f5f5",
          }}
          alt={item.title}
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
          {item.selectedSize}
        </div>
      </Col>

      {/* product info */}
      <Col md={6} className="d-flex flex-column justify-content-between pt-1">

        <div>
          <h5 className="fw-bold mb-2" style={{ color: "#2a2a2a", lineHeight: "1.3" }}>
            {item.title}
          </h5>
          <p className="text-muted mb-2" style={{ fontSize: "14px" }}>
            Size: <strong className="text-dark">{item.selectedSize}</strong>
          </p>
          <p className="fw-bold fs-5 mb-3" style={{ color: "#ff3e6c" }}>
            ₹{item.price}
          </p>
        </div>

        {/* qua. */}
        <div className="d-flex align-items-center mt-3">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={decreaseQty}
            style={{ 
              width: "36px", 
              height: "36px", 
              padding: 0,
              border: "1.5px solid #e0e0e0",
              borderRadius: "8px 0 0 8px",
              fontWeight: "600",
              fontSize: "16px"
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
              color: "#2a2a2a",
              background: "#fafafa"
            }}
          >
            {item.quantity}
          </div>

          <Button
            variant="outline-secondary"
            size="sm"
            onClick={increaseQty}
            style={{ 
              width: "36px", 
              height: "36px", 
              padding: 0,
              border: "1.5px solid #e0e0e0",
              borderRadius: "0 8px 8px 0",
              fontWeight: "600",
              fontSize: "16px"
            }}
          >
            +
          </Button>
        </div>

        {/* remove */}
        <Button
          variant="outline-danger"
          className="mt-4 d-flex align-items-center gap-2 w-fit-content"
          onClick={removeItem}
          style={{
            border: "1.5px solid #ff3e6c",
            borderRadius: "8px",
            padding: "8px 16px",
            fontSize: "14px",
            fontWeight: "500",
            transition: "all 0.2s ease",
            width: "fit-content"
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#ff3e6c";
            e.target.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "#ff3e6c";
          }}
        >
          <Trash size={16} /> Remove
        </Button>
      </Col>

      {/* amt total */}
      <Col md={3} className="text-end d-flex flex-column justify-content-between align-items-end">
        <div className="text-center">
          <p className="text-muted mb-1" style={{ fontSize: "14px" }}>Total</p>
          <h4 className="fw-bold" style={{ color: "#ff3e6c", margin: 0 }}>
            ₹{item.price * item.quantity}
          </h4>
          <p className="text-success small mt-1 fw-medium">
            You save ₹{Math.round(item.price * item.quantity * 0.1)}
          </p>
        </div>
      </Col>
    </Row>
  );
};

export default CartItem;
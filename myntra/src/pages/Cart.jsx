import { useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/Cart/CartItem";
import { getCartAsync } from "../services/actions/cartAction";
import { BagCheck, Tag, Truck } from "react-bootstrap-icons";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCartAsync());
  }, []);

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const discount = Math.round(total * 0.1);
  const finalTotal = total - discount;

  return (
    <Container className="my-5">
      {/* HEADER */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <div 
          className="d-flex align-items-center justify-content-center"
          style={{
            width: "50px",
            height: "50px",
            background: "linear-gradient(135deg, #ff3e6c 0%, #ff7b9c 100%)",
            borderRadius: "12px",
          }}
        >
          <BagCheck size={24} color="white" />
        </div>
        <div>
          <h2 className="fw-bold mb-1" style={{ color: "#2a2a2a" }}>
            My Shopping Bag
          </h2>
          <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your bag
          </p>
        </div>
      </div>

      <Row>
        {/* CART ITEMS */}
        <Col lg={8}>
          {cartItems.length === 0 ? (
            <Card 
              className="text-center py-5 border-0"
              style={{
                background: "linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)",
                borderRadius: "20px",
              }}
            >
              <div 
                className="mx-auto mb-4 d-flex align-items-center justify-content-center"
                style={{
                  width: "80px",
                  height: "80px",
                  background: "rgba(255, 62, 108, 0.1)",
                  borderRadius: "20px",
                }}
              >
                <BagCheck size={32} color="#ff3e6c" />
              </div>
              <h4 className="fw-bold mb-3" style={{ color: "#2a2a2a" }}>
                Your Bag is Empty
              </h4>
              <p className="text-muted mb-4" style={{ fontSize: "16px" }}>
                Add some stylish products to your bag
              </p>
              <Button
                href="/"
                className="px-5 py-2 fw-bold"
                style={{
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #ff3e6c 0%, #ff7b9c 100%)",
                  border: "none",
                  fontSize: "15px",
                }}
              >
                Continue Shopping
              </Button>
            </Card>
          ) : (
            <div className="d-flex flex-column gap-4">
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </Col>

        {/* PRICE */}
        <Col lg={4}>
          <Card
            className="border-0 p-4"
            style={{
              borderRadius: "20px",
              background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.08)",
              position: "sticky",
              top: "100px",
            }}
          >
            <h5 className="fw-bold mb-4" style={{ color: "#2a2a2a", fontSize: "18px" }}>
              PRICE DETAILS
            </h5>

            <div className="d-flex justify-content-between align-items-center mb-3 pb-3" style={{ borderBottom: "1px solid #f0f0f0" }}>
              <span style={{ color: "#666", fontSize: "15px" }}>Total MRP</span>
              <span style={{ color: "#2a2a2a", fontSize: "15px", fontWeight: "500" }}>₹{total}</span>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3 pb-3" style={{ borderBottom: "1px solid #f0f0f0" }}>
              <span style={{ color: "#666", fontSize: "15px" }}>Discount on MRP</span>
              <span style={{ color: "#00a853", fontSize: "15px", fontWeight: "500" }}>- ₹{discount}</span>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3 pb-3" style={{ borderBottom: "1px solid #f0f0f0" }}>
              <span style={{ color: "#666", fontSize: "15px" }}>Convenience Fee</span>
              <span style={{ color: "#00a853", fontSize: "15px", fontWeight: "500" }}>FREE</span>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4 pt-3" style={{ borderTop: "2px solid #f0f0f0" }}>
              <span style={{ color: "#2a2a2a", fontSize: "18px", fontWeight: "700" }}>Total Amount</span>
              <span style={{ color: "#2a2a2a", fontSize: "18px", fontWeight: "700" }}>₹{finalTotal}</span>
            </div>

            <Button
              className="w-100 py-3 fw-bold"
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
              PLACE ORDER
            </Button>

            {/* DELIVERY INFO */}
            <div className="mt-4 p-3 rounded-3" style={{ background: "rgba(255, 62, 108, 0.05)", border: "1px solid rgba(255, 62, 108, 0.1)" }}>
              <div className="d-flex align-items-center gap-2 mb-2">
                <Truck size={16} color="#ff3e6c" />
                <span style={{ fontSize: "14px", fontWeight: "600", color: "#2a2a2a" }}>
                  Free Delivery
                </span>
              </div>
              <p className="mb-0 small" style={{ color: "#666", lineHeight: "1.4" }}>
                Your order will be delivered within 3-5 business days
              </p>
            </div>

            {/* OFFER INFO */}
            <div className="mt-3 p-3 rounded-3" style={{ background: "rgba(0, 168, 83, 0.05)", border: "1px solid rgba(0, 168, 83, 0.1)" }}>
              <div className="d-flex align-items-center gap-2 mb-2">
                <Tag size={16} color="#00a853" />
                <span style={{ fontSize: "14px", fontWeight: "600", color: "#2a2a2a" }}>
                  You Save ₹{discount}
                </span>
              </div>
              <p className="mb-0 small" style={{ color: "#666", lineHeight: "1.4" }}>
                Great discount applied on your order
              </p>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
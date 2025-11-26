import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartAsync, updateCartItemAsync, removeCartItemAsync } from "../services/actions/cartAction";
import { getAllProductsAsync } from "../services/actions/productAction";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../styles/cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((s) => s.cartState);
  const { products } = useSelector((s) => s.productsState);

  useEffect(() => {
    dispatch(getCartAsync());
    dispatch(getAllProductsAsync());
  }, []);

  const findProd = (id) => products.find((p) => p.id === id);

  const incQty = (item) => {
    dispatch(updateCartItemAsync(item.id, { ...item, qty: item.qty + 1 }));
  };

  const decQty = (item) => {
    if (item.qty > 1)
      dispatch(updateCartItemAsync(item.id, { ...item, qty: item.qty - 1 }));
  };

  const removeItem = (id) => dispatch(removeCartItemAsync(id));

  const total = cart.reduce((sum, c) => {
    const p = findProd(c.productId);
    return sum + (p ? p.price * c.qty : 0);
  }, 0);

  return (
    <Container className="mt-4">
      <h3>My Bag</h3>
      <Row>

        <Col md={8}>
          {cart.map((item) => {
            const p = findProd(item.productId);
            if (!p) return null;

            return (
              <div key={item.id} className="cart-item shadow-sm">
                <img src={p.images[0]} alt="" className="cart-img" />

                <div className="cart-info">
                  <h5>{p.title}</h5>
                  <p>Size: {item.size}</p>
                  <p>Price: ₹{p.price}</p>

                  <div className="qty-box">
                    <button onClick={() => decQty(item)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => incQty(item)}>+</button>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </Col>

        {/* TOTAL */}
        <Col md={4}>
          <div className="price-box shadow-sm">
            <h5>Total: ₹ {total}</h5>
            <Button className="w-100 mt-3" disabled>
              Place Order
            </Button>
          </div>
        </Col>

      </Row>
    </Container>
  );
};

export default Cart;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWishlistAsync, removeWishlistAsync } from "../services/actions/wishlistAction";
import { getAllProductsAsync } from "../services/actions/productAction";
import { addToCartAsync } from "../services/actions/cartAction";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../styles/wishlist.css";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { wishlist } = useSelector((s) => s.wishlistState);
  const { products } = useSelector((s) => s.productsState);

  useEffect(() => {
    dispatch(getWishlistAsync());
    dispatch(getAllProductsAsync());
  }, []);

  const findProd = (id) => products.find((p) => p.id === id);

  const addBag = (pId) => {
    dispatch(
      addToCartAsync({
        id: Date.now(),
        productId: pId,
        size: "M",
        qty: 1
      })
    );
    alert("Added to Bag");
  };

  return (
    <Container className="mt-4">
      <h3>My Wishlist</h3>

      <Row>
        {wishlist.map((item) => {
          const p = findProd(item.productId);
          if (!p) return null;

          return (
            <Col md={3} key={item.id} className="mb-4">
              <div className="wish-card shadow-sm">
                <img src={p.images[0]} alt="" className="wish-img" />

                <h6 className="mt-2">{p.title}</h6>
                <p>₹ {p.price}</p>

                <div className="d-flex gap-2">
                  <Button className="btn-sm" onClick={() => addBag(p.id)}>
                    Add to Bag
                  </Button>

                  <Button
                    className="btn-sm btn-danger"
                    onClick={() => dispatch(removeWishlistAsync(item.id))}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Wishlist;

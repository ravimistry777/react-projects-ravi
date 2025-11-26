import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductAsync } from "../services/actions/productAction";
import { addToCartAsync } from "../services/actions/cartAction";
import { addToWishlistAsync } from "../services/actions/wishlistAction";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../styles/details.css";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, isLoading } = useSelector(
    (state) => state.productsState
  );

  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    dispatch(getProductAsync(id));
  }, [id]);

  if (isLoading || !product) return <h3 className="text-center mt-5">Loading...</h3>;

  const addToCart = () => {
    if (!selectedSize) return alert("Select a size!");
    dispatch(
      addToCartAsync({
        id: Date.now(),
        productId: product.id,
        size: selectedSize,
        qty: 1
      })
    );
    alert("Added to Bag");
  };

  const addToWishlist = () => {
    dispatch(
      addToWishlistAsync({
        id: Date.now(),
        productId: product.id
      })
    );
    alert("Added to Wishlist");
  };

  return (
    <Container className="mt-4 details-page">
      <Row>

        {/* IMAGES */}
        <Col md={6}>
          <div className="big-image-box">
            <img src={product.images[0]} alt="" className="big-image" />
          </div>

          <Row className="mt-3">
            {product.images.map((img, index) => (
              <Col xs={3} key={index}>
                <img src={img} className="thumb-img" alt="" />
              </Col>
            ))}
          </Row>
        </Col>

        {/* DETAILS */}
        <Col md={6}>
          <h3 className="prod-title">{product.title}</h3>
          <p className="prod-desc">{product.desc}</p>

          <h4 className="prod-price">₹ {product.price}</h4>

          {/* SIZES */}
          <div className="sizes-box mt-3">
            <p>Select Size:</p>
            <div className="size-options">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`size-btn ${selectedSize === s ? "active" : ""}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* BUTTONS */}
          <div className="mt-4 d-flex gap-3">
            <Button onClick={addToCart} className="btn-bag">
              ADD TO BAG
            </Button>

            <Button onClick={addToWishlist} className="btn-wishlist">
              WISHLIST
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;

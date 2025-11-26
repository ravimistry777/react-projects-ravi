import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./productCard.css";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="prod-link">
      <Card className="prod-card shadow-sm">
        <Card.Img
          variant="top"
          src={product.images[0]}
          className="prod-img"
        />

        <Card.Body>
          <Card.Title className="prod-title">{product.title}</Card.Title>
          <Card.Text className="prod-price">₹ {product.price}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default ProductCard;

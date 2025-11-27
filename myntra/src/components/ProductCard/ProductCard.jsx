import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Heart, HeartFill, Star, StarFill, Bag } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { addToCartAsync } from "../../services/actions/cartAction";
import { addToWishlistAsync, removeFromWishlistAsync } from "../../services/actions/wishlistAction";
import { useState } from "react";
import { toast } from "react-toastify";

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();
  const [wishlistAdded, setWishlistAdded] = useState(false);

  const handleAddToBag = () => {
    dispatch(addToCartAsync({ 
      ...item, 
      quantity: 1, 
      selectedSize: item.selectedSize || "M" 
    }));
    
    toast.success("🛍️ Added to bag successfully!", {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    if (wishlistAdded) {
      dispatch(removeFromWishlistAsync(item.id));
      setWishlistAdded(false);
      toast.info("❤️ Removed from wishlist", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } else {
      dispatch(addToWishlistAsync(item));
      setWishlistAdded(true);
      toast.success("❤️ Added to wishlist!", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <Card
      className="mb-4 product-card border-0"
      style={{
        cursor: "pointer",
        borderRadius: "16px",
        overflow: "hidden",
        background: "#ffffff",
        transition: "all 0.4s ease",
      }}
    >
      <div style={{ position: "relative", overflow: "hidden" }}>
        <div
          onClick={handleWishlist}
          style={{
            position: "absolute",
            right: "12px",
            top: "12px",
            zIndex: 2,
            background: "rgba(255, 255, 255, 0.95)",
            borderRadius: "50%",
            padding: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            transition: "all 0.3s ease",
            cursor: "pointer",
            backdropFilter: "blur(10px)",
          }}
          className="heart-icon"
        >
          {wishlistAdded ? (
            <HeartFill size={20} color="#ff3e6c" />
          ) : (
            <Heart size={20} color="#ff3e6c" />
          )}
        </div>

        {/* Discount Badge */}
        {item.mrp && item.mrp > item.price && (
          <div
            style={{
              position: "absolute",
              left: "12px",
              top: "12px",
              zIndex: 2,
              background: "linear-gradient(135deg, #ff3e6c 0%, #ff7b9c 100%)",
              color: "white",
              borderRadius: "12px",
              padding: "4px 10px",
              fontSize: "12px",
              fontWeight: "700",
              boxShadow: "0 2px 8px rgba(255, 62, 108, 0.3)",
            }}
          >
            {Math.round(((item.mrp - item.price) / item.mrp) * 100)}% OFF
          </div>
        )}

        <Link to={`/product/${item.id}`} className="text-decoration-none text-dark">
          <Card.Img
            variant="top"
            src={item.images?.[0] || item.image}
            height="300px"
            style={{
              objectFit: "cover",
              transition: "transform 0.5s ease",
            }}
            className="product-img"
          />
        </Link>
      </div>

      <Card.Body className="p-4">
        {/* catog, */}
        <Card.Text 
          className="mb-2 text-uppercase small fw-semibold" 
          style={{ 
            color: "#ff3e6c", 
            letterSpacing: "0.5px" 
          }}
        >
          {item.category}
        </Card.Text>

        {/* Product Title */}
        <Card.Title 
          className="fw-bold mb-2" 
          style={{ 
            fontSize: "16px", 
            color: "#2a2a2a",
            lineHeight: "1.4",
            height: "44px",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {item.title}
        </Card.Title>

        {/* rating */}
        <div className="d-flex align-items-center gap-2 mb-3">
          <div className="d-flex align-items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              star <= (item.rating || 4) ? (
                <StarFill key={star} size={14} color="#ffc107" />
              ) : (
                <Star key={star} size={14} color="#ddd" />
              )
            ))}
          </div>
          <span style={{ fontSize: "13px", color: "#666", fontWeight: "500" }}>
            ({item.ratingCount || "1.2k"})
          </span>
        </div>

        {/* price */}
        <div className="d-flex align-items-center gap-2 mb-3">
          <span
            className="fw-bold"
            style={{ 
              color: "#2a2a2a", 
              fontSize: "18px",
              fontWeight: "700"
            }}
          >
            ₹{item.price}
          </span>

          {item.mrp && item.mrp > item.price && (
            <span
              style={{
                textDecoration: "line-through",
                fontSize: "14px",
                color: "#999",
                fontWeight: "500"
              }}
            >
              ₹{item.mrp}
            </span>
          )}
        </div>

        {/* Addd To Bag */}
        <Button
          variant="primary"
          className="w-100 fw-semibold py-2 d-flex align-items-center justify-content-center gap-2"
          onClick={handleAddToBag}
          style={{
            background: "linear-gradient(135deg, #ff3e6c 0%, #ff7b9c 100%)",
            border: "none",
            borderRadius: "10px",
            fontSize: "14px",
            fontWeight: "600",
            letterSpacing: "0.3px",
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
          <Bag size={16} />
          ADD TO BAG
        </Button>
      </Card.Body>

      {/* HOVER */}
      <style>{`
        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .product-card:hover .product-img {
          transform: scale(1.08);
        }

        .product-card:hover .heart-icon {
          transform: scale(1.1);
          background: rgba(255, 255, 255, 1);
        }
      `}</style>
    </Card>
  );
};

export default ProductCard;
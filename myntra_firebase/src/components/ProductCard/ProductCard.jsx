import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Heart, HeartFill, Star, StarFill, Bag } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAsync } from "../../services/actions/cartAction";
import { addToWishlistAsync, removeFromWishlistAsync } from "../../services/actions/wishlistAction";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  
  // Get wishlist items from redux to check if item is already in wishlist
  const { wishlistItems = [] } = useSelector((state) => state.wishlist || {});
  
  const [wishlistAdded, setWishlistAdded] = useState(false);

  // Check if product is already in wishlist
  useEffect(() => {
    if (currentUser && wishlistItems) {
      const isInWishlist = wishlistItems.some(wishlistItem => 
        wishlistItem.id === item.id || wishlistItem.productId === item.id
      );
      setWishlistAdded(isInWishlist);
    }
  }, [wishlistItems, item.id, currentUser]);

  const handleAddToBag = () => {
    if (!currentUser) {
      toast.error("🔐 Please login to add items to cart!", {
        position: "bottom-right",
        autoClose: 3000,
      });
      return;
    }

    const cartItem = {
      productId: item.id, // Store original product ID
      title: item.title || item.name,
      price: item.price || 0,
      images: item.images || [item.image || "https://via.placeholder.com/300"],
      quantity: 1,
      selectedSize: item.selectedSize || "M",
      category: item.category,
      description: item.desc || item.description,
      addedAt: new Date().toISOString()
    };

    dispatch(addToCartAsync(cartItem, currentUser.uid));
    
    toast.success("🛍️ Added to bag successfully!", {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    
    if (!currentUser) {
      toast.error("🔐 Please login to manage wishlist!", {
        position: "bottom-right",
        autoClose: 3000,
      });
      return;
    }

    if (wishlistAdded) {
      // Remove from wishlist
      dispatch(removeFromWishlistAsync(item.id, currentUser.uid));
      setWishlistAdded(false);
      toast.info("❤️ Removed from wishlist", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } else {
      // Add to wishlist
      const wishlistItem = {
        productId: item.id,
        title: item.title || item.name,
        price: item.price || 0,
        images: item.images || [item.image || "https://via.placeholder.com/300"],
        selectedSize: item.selectedSize || "M",
        category: item.category,
        description: item.desc || item.description,
        mrp: item.mrp || item.price,
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
            background: currentUser ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.7)",
            borderRadius: "50%",
            padding: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            transition: "all 0.3s ease",
            cursor: currentUser ? "pointer" : "not-allowed",
            backdropFilter: "blur(10px)",
            opacity: currentUser ? 1 : 0.7
          }}
          className="heart-icon"
          title={currentUser ? 
            (wishlistAdded ? "Remove from wishlist" : "Add to wishlist") : 
            "Login to add to wishlist"
          }
        >
          {wishlistAdded ? (
            <HeartFill size={20} color="#ff3e6c" />
          ) : (
            <Heart size={20} color={currentUser ? "#ff3e6c" : "#ccc"} />
          )}
        </div>

        {/* DISCOUNT BADGE */}
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
            src={item.images?.[0] || item.image || "https://via.placeholder.com/300x300?text=Product"}
            height="300px"
            style={{
              objectFit: "cover",
              transition: "transform 0.5s ease",
            }}
            className="product-img"
            alt={item.title || "Product"}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/300x300?text=Product";
            }}
          />
        </Link>
      </div>

      <Card.Body className="p-4">
        {/* CATEGORY */}
        <Card.Text 
          className="mb-2 text-uppercase small fw-semibold" 
          style={{ 
            color: "#ff3e6c", 
            letterSpacing: "0.5px" 
          }}
        >
          {item.category || "Category"}
        </Card.Text>

        {/* PRODUCT TITLE */}
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
          {item.title || item.name || "Product Name"}
        </Card.Title>

        {/* RATING */}
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

        {/* PRICE */}
        <div className="d-flex align-items-center gap-2 mb-3">
          <span
            className="fw-bold"
            style={{ 
              color: "#2a2a2a", 
              fontSize: "18px",
              fontWeight: "700"
            }}
          >
            ₹{item.price || 0}
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
          
          {item.mrp && item.mrp > item.price && (
            <span
              style={{
                fontSize: "12px",
                color: "#00a853",
                fontWeight: "600",
                background: "rgba(0, 168, 83, 0.1)",
                padding: "2px 6px",
                borderRadius: "4px"
              }}
            >
              Save ₹{item.mrp - item.price}
            </span>
          )}
        </div>

        {/* ADD TO BAG BUTTON */}
        <Button
          variant="primary"
          className="w-100 fw-semibold py-2 d-flex align-items-center justify-content-center gap-2"
          onClick={handleAddToBag}
          disabled={!currentUser}
          style={{
            background: currentUser 
              ? "linear-gradient(135deg, #ff3e6c 0%, #ff7b9c 100%)" 
              : "#ccc",
            border: "none",
            borderRadius: "10px",
            fontSize: "14px",
            fontWeight: "600",
            letterSpacing: "0.3px",
            transition: "all 0.3s ease",
            boxShadow: currentUser 
              ? "0 2px 8px rgba(255, 62, 108, 0.2)" 
              : "0 2px 8px rgba(0,0,0,0.1)",
            opacity: currentUser ? 1 : 0.7,
            cursor: currentUser ? "pointer" : "not-allowed"
          }}
          onMouseEnter={(e) => {
            if (currentUser) {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 4px 15px rgba(255, 62, 108, 0.4)";
            }
          }}
          onMouseLeave={(e) => {
            if (currentUser) {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 2px 8px rgba(255, 62, 108, 0.2)";
            }
          }}
          title={currentUser ? "Add to cart" : "Login to add to cart"}
        >
          <Bag size={16} />
          {currentUser ? "ADD TO BAG" : "LOGIN TO ADD"}
        </Button>

        {/* USER MESSAGE */}
        {!currentUser && (
          <div className="text-center mt-2">
            <small className="text-muted">
              <i>Login to add items to cart</i>
            </small>
          </div>
        )}
      </Card.Body>

      {/* HOVER EFFECTS */}
      <style>{`
        .product-card:hover {
          transform: translateY(-8px);
          boxShadow: 0 20px 40px rgba(0, 0, 0, 0.15);
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
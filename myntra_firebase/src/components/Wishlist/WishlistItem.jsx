import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlistAsync } from "../../services/actions/wishlistAction";
import { addToCartAsync } from "../../services/actions/cartAction";
import { HeartFill, Trash, Bag } from "react-bootstrap-icons";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const WishlistItem = ({ item }) => {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const { wishlistItems = [] } = useSelector((state) => state.wishlist || {});

  // DEBUG: Check item structure
  console.log("📦 WishlistItem Props:", item);
  console.log("🔑 Available wishlist items:", wishlistItems);

  const addToCart = () => {
    if (!currentUser) {
      toast.error("🔐 Please login to add items to cart!");
      return;
    }

    // Prepare cart item
    const cartItem = {
      productId: item.id || item.productId,
      title: item.title || item.name,
      price: item.price || 0,
      images: item.images || [item.image],
      quantity: 1,
      selectedSize: item.selectedSize || "M",
      category: item.category,
      addedAt: new Date().toISOString()
    };

    console.log("🛒 Adding to cart:", cartItem);

    // Add to cart
    dispatch(addToCartAsync(cartItem, currentUser.uid));
    
    // Remove from wishlist - USE item.id (Firebase document ID)
    const documentIdToRemove = item.id;
    console.log("🗑️ Removing from wishlist with ID:", documentIdToRemove);
    
    if (documentIdToRemove) {
      dispatch(removeFromWishlistAsync(documentIdToRemove, currentUser.uid));
      toast.success("✅ Moved to bag successfully!");
    } else {
      // If no Firebase ID, find by productId
      const wishlistItem = wishlistItems.find(w => 
        w.productId === item.productId || w.id === item.productId
      );
      
      if (wishlistItem && wishlistItem.id) {
        console.log("🔍 Found item by productId, removing with ID:", wishlistItem.id);
        dispatch(removeFromWishlistAsync(wishlistItem.id, currentUser.uid));
        toast.success("✅ Moved to bag!");
      } else {
        toast.error("❌ Cannot find item in wishlist");
        console.error("Item not found in wishlist:", item);
      }
    }
  };

  const removeItem = () => {
    if (!currentUser) {
      toast.error("🔐 Please login to remove items!");
      return;
    }
    
    const documentIdToRemove = item.id;
    console.log("❌ Remove button clicked for ID:", documentIdToRemove);
    
    if (documentIdToRemove) {
      dispatch(removeFromWishlistAsync(documentIdToRemove, currentUser.uid));
      toast.info("❤️ Removed from wishlist");
    } else {
      // Try to find by productId
      const wishlistItem = wishlistItems.find(w => 
        w.productId === item.productId || w.id === item.productId
      );
      
      if (wishlistItem && wishlistItem.id) {
        dispatch(removeFromWishlistAsync(wishlistItem.id, currentUser.uid));
        toast.info("❤️ Removed from wishlist");
      } else {
        toast.error("❌ Cannot find item in wishlist");
      }
    }
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
      {/* DEBUG INFO (Only in development) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mb-2 p-2 bg-light rounded small">
          <strong>Debug Info:</strong> ID: {item.id?.substring(0, 8)}... | 
          ProductID: {item.productId?.substring(0, 8)}... | 
          User: {currentUser?.uid?.substring(0, 8)}...
        </div>
      )}

      {/* IMAGE */}
      <Col md={3}>
        <div style={{ position: "relative", overflow: "hidden", borderRadius: "12px" }}>
          <img
            src={item.images?.[0] || item.image || "https://via.placeholder.com/300x240?text=Product"}
            width="100%"
            height="240"
            style={{
              objectFit: "cover",
              borderRadius: "12px",
              transition: "transform 0.4s ease",
            }}
            className="wishlist-img"
            alt={item.title || item.name || "Product"}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/300x240?text=Product";
            }}
          />

          {/* REMOVE HEART BUTTON */}
          <div
            onClick={removeItem}
            style={{
              position: "absolute",
              right: "12px",
              top: "12px",
              background: currentUser ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.7)",
              borderRadius: "50%",
              padding: "8px",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15)",
              cursor: currentUser ? "pointer" : "not-allowed",
              transition: "all 0.3s ease",
              backdropFilter: "blur(10px)",
              opacity: currentUser ? 1 : 0.7
            }}
            className="remove-heart"
            title={currentUser ? "Remove from wishlist" : "Login to remove"}
          >
            <HeartFill size={20} color="#ff3e6c" />
          </div>

          {/* DISCOUNT BADGE */}
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

      {/* DETAILS */}
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
            {item.title || item.name || "Product"}
          </h5>
          <p 
            className="text-muted mb-2 text-uppercase small fw-semibold" 
            style={{ letterSpacing: "0.5px" }}
          >
            {item.category || "Category"}
          </p>

          {/* SIZE */}
          {item.selectedSize && (
            <p className="mb-2" style={{ fontSize: "14px", color: "#666" }}>
              Size: <strong>{item.selectedSize}</strong>
            </p>
          )}

          {/* PRICE */}
          <div className="d-flex align-items-center gap-2 mt-3">
            <h5
              className="fw-bold mb-0"
              style={{ color: "#2a2a2a", fontSize: "20px" }}
            >
              ₹{item.price || 0}
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

        {/* BUTTONS */}
        <div className="d-flex gap-3 mt-4">
          <Button
            variant="primary"
            className="px-4 py-2 fw-semibold d-flex align-items-center gap-2"
            onClick={addToCart}
            disabled={!currentUser}
            style={{ 
              borderRadius: "10px",
              background: currentUser 
                ? "linear-gradient(135deg, #ff3e6c 0%, #ff7b9c 100%)" 
                : "#ccc",
              border: "none",
              fontSize: "14px",
              transition: "all 0.3s ease",
              boxShadow: "0 2px 8px rgba(255, 62, 108, 0.2)",
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
            title={currentUser ? "Move to cart" : "Login to add to cart"}
          >
            <Bag size={16} /> 
            {currentUser ? "MOVE TO BAG" : "LOGIN TO ADD"}
          </Button>

          <Button
            variant="outline-danger"
            className="px-4 py-2 fw-semibold d-flex align-items-center gap-2"
            onClick={removeItem}
            disabled={!currentUser}
            style={{ 
              borderRadius: "10px",
              border: `2px solid ${currentUser ? "#ff3e6c" : "#ccc"}`,
              color: currentUser ? "#ff3e6c" : "#999",
              fontSize: "14px",
              background: "transparent",
              transition: "all 0.3s ease",
              opacity: currentUser ? 1 : 0.7,
              cursor: currentUser ? "pointer" : "not-allowed"
            }}
            onMouseEnter={(e) => {
              if (currentUser) {
                e.target.style.background = "#ff3e6c";
                e.target.style.color = "white";
                e.target.style.transform = "translateY(-2px)";
              }
            }}
            onMouseLeave={(e) => {
              if (currentUser) {
                e.target.style.background = "transparent";
                e.target.style.color = "#ff3e6c";
                e.target.style.transform = "translateY(0)";
              }
            }}
            title={currentUser ? "Remove from wishlist" : "Login to remove"}
          >
            <Trash size={16} /> 
            {currentUser ? "REMOVE" : "LOGIN"}
          </Button>
        </div>
      </Col>

      {/* HOVER EFFECTS */}
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
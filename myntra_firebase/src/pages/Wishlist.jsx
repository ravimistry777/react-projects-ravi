import { useEffect } from "react";
import { Container, Card, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import WishlistItem from "../components/Wishlist/WishlistItem";
import { getWishlistAsync } from "../services/actions/wishlistAction";
import { Heart, ArrowLeft, PersonPlus } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { wishlistItems = [], loading, error } = useSelector((state) => state.wishlist || {});

  useEffect(() => {
    if (currentUser) {
      dispatch(getWishlistAsync(currentUser.uid));
    }
  }, [dispatch, currentUser]);

  if (!currentUser) {
    return (
      <Container className="my-5">
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
              width: "100px",
              height: "100px",
              background: "linear-gradient(135deg, rgba(255, 62, 108, 0.1) 0%, rgba(255, 123, 156, 0.1) 100%)",
              borderRadius: "50%",
            }}
          >
            <PersonPlus size={40} color="#ff3e6c" />
          </div>
          <h4 className="fw-bold mb-3">Please Login First</h4>
          <p className="text-muted mb-4">
            Login to view your wishlist items
          </p>
          <Button
            onClick={() => navigate("/")}
            className="px-5 py-2 fw-bold"
            style={{
              borderRadius: "12px",
              background: "linear-gradient(135deg, #ff3e6c 0%, #ff7b9c 100%)",
              border: "none",
            }}
          >
            Go to Homepage
          </Button>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      {/* HEADER SECTION */}
      <div className="d-flex align-items-center gap-4 mb-5">
        <Button
          variant="outline-dark"
          className="d-flex align-items-center gap-2"
          onClick={() => navigate(-1)}
          style={{
            borderRadius: "12px",
            border: "2px solid #e0e0e0",
            padding: "10px 20px",
          }}
        >
          <ArrowLeft size={16} />
          Back
        </Button>

        <div className="flex-grow-1">
          <div className="d-flex align-items-center gap-3">
            <div 
              className="d-flex align-items-center justify-content-center"
              style={{
                width: "50px",
                height: "50px",
                background: "linear-gradient(135deg, #ff3e6c 0%, #ff7b9c 100%)",
                borderRadius: "12px",
              }}
            >
              <Heart size={20} color="white" />
            </div>
            <div>
              <h1 className="fw-bold mb-1" style={{ color: "#2a2a2a" }}>
                My Wishlist
              </h1>
              <p className="text-muted mb-0">
                {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} you love
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <Alert variant="danger" className="mb-4">
          Error loading wishlist: {error}
        </Alert>
      )}

      {/* LOADING STATE */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading your wishlist...</p>
        </div>
      ) : (
        <>
          {/* EMPTY STATE */}
          {wishlistItems.length === 0 ? (
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
                  width: "120px",
                  height: "120px",
                  background: "rgba(255, 62, 108, 0.1)",
                  borderRadius: "30px",
                }}
              >
                <Heart size={40} color="#ff3e6c" />
              </div>
              <h3 className="fw-bold mb-3" style={{ color: "#2a2a2a" }}>
                Your Wishlist is Empty
              </h3>
              <p className="text-muted mb-4">
                Save your favorite items here for later
              </p>
              <Button
                onClick={() => navigate('/')}
                className="px-4 py-2 fw-bold"
                style={{
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #ff3e6c 0%, #ff7b9c 100%)",
                  border: "none",
                }}
              >
                Start Shopping
              </Button>
            </Card>
          ) : (
            <div className="d-flex flex-column gap-4">
              {wishlistItems.map((item) => (
                <div className="fade-in" key={item.id}>
                  <WishlistItem item={item} userId={currentUser.uid} />
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* ANIMATION */}
      <style>{`
        .fade-in {
          animation: fade 0.4s ease-in;
        }
        @keyframes fade {
          from { 
            opacity: 0; 
            transform: translateY(10px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
      `}</style>
    </Container>
  );
};

export default Wishlist;
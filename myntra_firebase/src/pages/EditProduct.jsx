import { useEffect, useState } from "react";
import { Container, Form, Button, Card, Row, Col, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductAsync, updateProductAsync } from "../services/actions/productAction";
import { Pencil, Image } from "react-bootstrap-icons";
import { useAuth } from "../context/AuthContext";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const { product, loading, error } = useSelector((state) => state.products);

  const [input, setInput] = useState({
    id: "",
    title: "",
    desc: "",
    price: "",
    category: "",
    images: ["", "", "", ""],
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
      return;
    }
    dispatch(getProductAsync(id));
  }, [id, dispatch, currentUser, navigate]);

  useEffect(() => {
    if (product) {
      setInput({
        id: product.id,
        title: product.title || "",
        desc: product.desc || "",
        price: product.price || "",
        category: product.category || "Men",
        images: product.images || ["", "", "", ""],
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleImageChange = (i, value) => {
    const newImgs = [...input.images];
    newImgs[i] = value;
    setInput({ ...input, images: newImgs });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      setMessage("Please login to edit products");
      return;
    }

    if (!input.title || !input.price || !input.category) {
      setMessage("Please fill all required fields");
      return;
    }

    const updateData = {
      id: input.id,
      title: input.title,
      desc: input.desc,
      price: parseFloat(input.price),
      category: input.category,
      images: input.images.filter(img => img.trim() !== ""),
      updatedAt: new Date().toISOString(),
    };

    dispatch(updateProductAsync(updateData));
    setMessage("");
    
    setTimeout(() => {
      navigate("/admin/products");
    }, 1500);
  };

  if (!currentUser) {
    return (
      <Container className="my-5">
        <Card className="text-center py-5 border-0">
          <div className="alert alert-danger">
            <h4>Access Denied</h4>
            <p>Please login to access admin panel</p>
            <Button onClick={() => navigate("/")}>Go to Home</Button>
          </div>
        </Card>
      </Container>
    );
  }

  if (loading && !product) {
    return (
      <Container className="my-5">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading product...</p>
        </div>
      </Container>
    );
  }

  if (error && !product) {
    return (
      <Container className="my-5">
        <Alert variant="danger">
          <h4>Error Loading Product</h4>
          <p>{error}</p>
          <Button onClick={() => navigate("/admin/products")}>
            Back to Products
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Card
        className="border-0 p-4"
        style={{
          borderRadius: "20px",
          background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.08)",
        }}
      >
        {/* HEADER */}
        <div className="text-center mb-5">
          <div 
            className="mx-auto mb-3 d-flex align-items-center justify-content-center"
            style={{
              width: "60px",
              height: "60px",
              background: "linear-gradient(135deg, #ff3e6c 0%, #ff7b9c 100%)",
              borderRadius: "16px",
            }}
          >
            <Pencil size={24} color="white" />
          </div>
          <h2 className="fw-bold mb-2" style={{ color: "#2a2a2a" }}>
            Edit Product
          </h2>
          <p className="text-muted" style={{ fontSize: "16px" }}>
            Update the product details below
          </p>
        </div>

        {/* MESSAGES */}
        {message && (
          <Alert variant="danger" className="mb-4">
            {message}
          </Alert>
        )}
        
        {error && (
          <Alert variant="danger" className="mb-4">
            Error: {error}
          </Alert>
        )}

        <Form onSubmit={submitHandler}>
          <Row>
            {/* BASIC INFO */}
            <Col md={6}>
              {/* TITLE */}
              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold mb-3 d-block" style={{ color: "#2a2a2a", fontSize: "14px" }}>
                  Product Title *
                </Form.Label>
                <Form.Control 
                  name="title" 
                  value={input.title} 
                  onChange={handleChange}
                  className="py-3"
                  required
                  style={{
                    borderRadius: "12px",
                    border: "2px solid #f0f0f0",
                    background: "#ffffff",
                    fontSize: "15px",
                    transition: "all 0.3s ease",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#ff3e6c";
                    e.target.style.boxShadow = "0 0 0 3px rgba(255, 62, 108, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#f0f0f0";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </Form.Group>

              {/* DESCRIPTION */}
              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold mb-3 d-block" style={{ color: "#2a2a2a", fontSize: "14px" }}>
                  Description
                </Form.Label>
                <Form.Control 
                  as="textarea"
                  rows={4}
                  name="desc" 
                  value={input.desc} 
                  onChange={handleChange}
                  className="py-3"
                  style={{
                    borderRadius: "12px",
                    border: "2px solid #f0f0f0",
                    background: "#ffffff",
                    fontSize: "15px",
                    resize: "none",
                    transition: "all 0.3s ease",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#ff3e6c";
                    e.target.style.boxShadow = "0 0 0 3px rgba(255, 62, 108, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#f0f0f0";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </Form.Group>

              {/* CATEGORY */}
              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold mb-3 d-block" style={{ color: "#2a2a2a", fontSize: "14px" }}>
                  Category *
                </Form.Label>
                <Form.Select 
                  name="category" 
                  value={input.category} 
                  onChange={handleChange}
                  className="py-3"
                  required
                  style={{
                    borderRadius: "12px",
                    border: "2px solid #f0f0f0",
                    background: "#ffffff",
                    fontSize: "15px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#ff3e6c";
                    e.target.style.boxShadow = "0 0 0 3px rgba(255, 62, 108, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#f0f0f0";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                </Form.Select>
              </Form.Group>

              {/* PRICE */}
              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold mb-3 d-block" style={{ color: "#2a2a2a", fontSize: "14px" }}>
                  Price (₹) *
                </Form.Label>
                <Form.Control 
                  type="number" 
                  name="price" 
                  value={input.price} 
                  onChange={handleChange}
                  min="1"
                  className="py-3"
                  required
                  style={{
                    borderRadius: "12px",
                    border: "2px solid #f0f0f0",
                    background: "#ffffff",
                    fontSize: "15px",
                    transition: "all 0.3s ease",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#ff3e6c";
                    e.target.style.boxShadow = "0 0 0 3px rgba(255, 62, 108, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#f0f0f0";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </Form.Group>
            </Col>

            {/* IMAGES */}
            <Col md={6}>
              <div className="ps-md-4">
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div 
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      width: "40px",
                      height: "40px",
                      background: "linear-gradient(135deg, #ff3e6c 0%, #ff7b9c 100%)",
                      borderRadius: "10px",
                    }}
                  >
                    <Image size={18} color="white" />
                  </div>
                  <h5 className="fw-bold mb-0" style={{ color: "#2a2a2a" }}>
                    Product Images
                  </h5>
                </div>

                {input.images?.map((img, index) => (
                  <Form.Group className="mb-4" key={index}>
                    <Form.Label className="fw-semibold mb-3 d-block" style={{ color: "#2a2a2a", fontSize: "14px" }}>
                      Image {index + 1}
                    </Form.Label>
                    <Form.Control
                      value={img}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      placeholder="Enter image URL"
                      className="py-3"
                      style={{
                        borderRadius: "12px",
                        border: "2px solid #f0f0f0",
                        background: "#ffffff",
                        fontSize: "15px",
                        transition: "all 0.3s ease",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#ff3e6c";
                        e.target.style.boxShadow = "0 0 0 3px rgba(255, 62, 108, 0.1)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#f0f0f0";
                        e.target.style.boxShadow = "none";
                      }}
                    />

                    {/* IMAGE PREVIEW */}
                    {img && (
                      <div className="mt-3 p-3 rounded-3" style={{ background: "#f8f9fa", border: "1px solid #e9ecef" }}>
                        <img
                          src={img}
                          alt="preview"
                          width="100%"
                          height="120"
                          style={{
                            borderRadius: "8px",
                            objectFit: "cover",
                            border: "2px solid #fff",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                          }}
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/300x120?text=Invalid+URL";
                          }}
                        />
                      </div>
                    )}
                  </Form.Group>
                ))}
              </div>
            </Col>
          </Row>

          {/* BUTTONS */}
          <div className="d-flex gap-3 justify-content-center mt-4 pt-3">
            <Button
              type="button"
              variant="outline-dark"
              className="px-5 py-2 fw-bold"
              style={{
                borderRadius: "12px",
                border: "2px solid #2a2a2a",
                background: "transparent",
                color: "#2a2a2a",
                fontSize: "15px",
                transition: "all 0.3s ease",
              }}
              onClick={() => navigate("/admin/products")}
              onMouseEnter={(e) => {
                e.target.style.background = "#2a2a2a";
                e.target.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = "#2a2a2a";
              }}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="px-5 py-2 fw-bold"
              disabled={loading}
              style={{
                borderRadius: "12px",
                background: loading ? "#ccc" : "linear-gradient(135deg, #ff3e6c 0%, #ff7b9c 100%)",
                border: "none",
                fontSize: "15px",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(255, 62, 108, 0.3)",
                opacity: loading ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 8px 25px rgba(255, 62, 108, 0.4)";
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 4px 15px rgba(255, 62, 108, 0.3)";
                }
              }}
            >
              {loading ? "Updating..." : "Update Product"}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default EditProduct;
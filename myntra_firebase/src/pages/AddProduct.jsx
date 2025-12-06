import { useEffect, useState } from "react";
import { Container, Form, Button, Card, Row, Col, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addProductAsync } from "../services/actions/productAction";
import { useNavigate } from "react-router-dom";
import { Plus, Image } from "react-bootstrap-icons";
import { useAuth } from "../context/AuthContext";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { isCreated, loading, error } = useSelector((state) => state.products);

  const [input, setInput] = useState({
    title: "",
    desc: "",
    price: "",
    category: "",
    images: ["", "", "", ""],
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    // Redirect if not logged in
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleImageChange = (index, value) => {
    const updated = [...input.images];
    updated[index] = value;
    setInput({ ...input, images: updated });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      setMessage("Please login to add products");
      return;
    }

    // Validate required fields
    if (!input.title || !input.price || !input.category) {
      setMessage("Please fill all required fields");
      return;
    }

    // Prepare product data for Firebase
    const productData = {
      title: input.title,
      desc: input.desc,
      price: parseFloat(input.price),
      category: input.category,
      images: input.images.filter(img => img.trim() !== ""), // Remove empty image URLs
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: currentUser.uid
    };

    dispatch(addProductAsync(productData));
    setMessage("");
  };

  useEffect(() => {
    if (isCreated) {
      setTimeout(() => {
        navigate("/admin/products");
      }, 1500);
    }
  }, [isCreated, navigate]);

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
            <Plus size={24} color="white" />
          </div>
          <h2 className="fw-bold mb-2" style={{ color: "#2a2a2a" }}>
            Add New Product
          </h2>
          <p className="text-muted" style={{ fontSize: "16px" }}>
            Fill in the details to add a new product to your store
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
        
        {loading && (
          <Alert variant="info" className="mb-4">
            Adding product...
          </Alert>
        )}
        
        {isCreated && (
          <Alert variant="success" className="mb-4">
            Product added successfully! Redirecting...
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
                  placeholder="Enter product title"
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
                  placeholder="Enter product description"
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
                  <option value="">Select Category</option>
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
                  name="price"
                  type="number"
                  min="1"
                  value={input.price}
                  onChange={handleChange}
                  placeholder="Enter price"
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
                    Product Images (Optional)
                  </h5>
                </div>

                {input.images.map((img, index) => (
                  <Form.Group className="mb-4" key={index}>
                    <Form.Label className="fw-semibold mb-3 d-block" style={{ color: "#2a2a2a", fontSize: "14px" }}>
                      Image {index + 1}
                    </Form.Label>
                    <Form.Control
                      value={img}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      placeholder="Enter image URL (optional)"
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

          {/* SUBMIT BUTTON */}
          <div className="text-center mt-4">
            <Button
              type="submit"
              className="px-5 py-3 fw-bold"
              disabled={loading}
              style={{
                borderRadius: "12px",
                background: loading ? "#ccc" : "linear-gradient(135deg, #ff3e6c 0%, #ff7b9c 100%)",
                border: "none",
                fontSize: "16px",
                minWidth: "200px",
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
              {loading ? "Adding..." : "Add Product"}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default AddProduct;
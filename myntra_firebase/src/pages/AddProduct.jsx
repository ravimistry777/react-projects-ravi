import { useEffect, useState } from "react";
import { Container, Form, Button, Card, Row, Col, Alert, ProgressBar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addProductAsync } from "../services/actions/productAction";
import { useNavigate } from "react-router-dom";
import { Plus, Image, Upload, X } from "react-bootstrap-icons";
import { useAuth } from "../context/AuthContext";
import { uploadFile } from "../services/uploadFile";
import { resetProductCreation } from "../services/actions/productAction";

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
    images: [],
  });

  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrls, setPreviewUrls] = useState([]);

  useEffect(() => {
    dispatch(resetProductCreation());
    if (!currentUser) {
      navigate("/");
    }
  }, [dispatch, currentUser, navigate]);

  // Handle file upload
  const handleFileUpload = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    // File validation
    const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setMessage("Please upload only JPG, PNG or WebP images");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage("Image size should be less than 5MB");
      return;
    }

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    const newPreviewUrls = [...previewUrls];
    newPreviewUrls[index] = previewUrl;
    setPreviewUrls(newPreviewUrls);

    setUploading(true);
    setUploadProgress(30);

    try {
      // Upload to Cloudinary
      const imageUrl = await uploadFile(file);
      setUploadProgress(70);

      // images array
      const updatedImages = [...input.images];
      updatedImages[index] = imageUrl;
      setInput({ ...input, images: updatedImages });

      setUploadProgress(100);
      setTimeout(() => {
        setUploading(false);
        setUploadProgress(0);
      }, 500);

    } catch (error) {
      console.error("Upload error:", error);
      setMessage("Image upload failed. Please try again.");
      setUploading(false);
      setUploadProgress(0);
    }
  };

  // Remove image
  const removeImage = (index) => {
    const updatedImages = [...input.images];
    updatedImages[index] = "";
    setInput({ ...input, images: updatedImages });

    const updatedPreviews = [...previewUrls];
    if (updatedPreviews[index]) {
      URL.revokeObjectURL(updatedPreviews[index]);
    }
    updatedPreviews[index] = "";
    setPreviewUrls(updatedPreviews);
  };

  // Handle text input for image url
  const handleImageUrlChange = (index, value) => {
    const updatedImages = [...input.images];
    updatedImages[index] = value;
    setInput({ ...input, images: updatedImages });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      setMessage("Please login to add products");
      return;
    }

    if (!input.title || !input.price || !input.category) {
      setMessage("Please fill all required fields");
      return;
    }

    // Filterout empty images
    const validImages = input.images.filter(img => img && img.trim() !== "");

    const productData = {
      title: input.title,
      desc: input.desc,
      price: parseFloat(input.price),
      category: input.category,
      images: validImages,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: currentUser.uid
    };

    dispatch(addProductAsync(productData));
    setMessage("");
  };

  useEffect(() => {
    if (isCreated) {
      const timer = setTimeout(() => {
        navigate("/admin/products");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isCreated, navigate]);

  useEffect(() => {
    return () => {
      previewUrls.forEach(url => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, []);

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
          <Alert variant="danger" className="mb-4" onClose={() => setMessage("")} dismissible>
            {message}
          </Alert>
        )}
        
        {error && (
          <Alert variant="danger" className="mb-4">
            Error: {error}
          </Alert>
        )}
        
        {uploading && (
          <Alert variant="info" className="mb-4">
            <div className="d-flex align-items-center gap-2">
              <div className="spinner-border spinner-border-sm" role="status"></div>
              <span>Uploading image... {uploadProgress}%</span>
            </div>
            <ProgressBar now={uploadProgress} className="mt-2" />
          </Alert>
        )}
        
        {loading && (
          <Alert variant="info" className="mb-4">
            <div className="d-flex align-items-center gap-2">
              <div className="spinner-border spinner-border-sm" role="status"></div>
              <span>Adding product to database...</span>
            </div>
          </Alert>
        )}
        
        {isCreated && (
          <Alert variant="success" className="mb-4">
            ✅ Product added successfully! Redirecting...
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

            {/* IMAGES UPDATED - CLOUDINARY */}
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
                    Product Images (Max 4)
                  </h5>
                </div>

                {/* Instructions */}
                <div className="alert alert-info mb-4 small">
                  <strong>Instructions:</strong> You can either upload images from your device or paste image URLs. Recommended size: 500x500px, max 5MB.
                </div>

                {/* Image upload sections */}
                {[0, 1, 2, 3].map((index) => (
                  <Form.Group className="mb-4" key={index}>
                    <Form.Label className="fw-semibold mb-3 d-block" style={{ color: "#2a2a2a", fontSize: "14px" }}>
                      Image {index + 1} {index === 0 && <span className="text-danger">*</span>}
                    </Form.Label>

                    {/* UPLOAD OPTIONS */}
                    <div className="d-flex gap-2 mb-2">
                      {/* File Upload */}
                      <div className="position-relative" style={{ flex: 1 }}>
                        <Form.Control
                          type="file"
                          accept="image/jpeg, image/png, image/jpg, image/webp"
                          onChange={(e) => handleFileUpload(e, index)}
                          disabled={uploading}
                          className="py-2"
                          style={{
                            borderRadius: "10px",
                            cursor: uploading ? "not-allowed" : "pointer",
                            opacity: uploading ? 0.7 : 1
                          }}
                        />
                        <div className="position-absolute top-50 end-0 translate-middle-y me-3">
                          <Upload size={16} color="#666" />
                        </div>
                      </div>

                      {/* OR Separator */}
                      <div className="d-flex align-items-center px-2">
                        <span className="text-muted small">OR</span>
                      </div>

                      {/* URL Input */}
                      <div className="position-relative" style={{ flex: 2 }}>
                        <Form.Control
                          type="text"
                          value={input.images[index] || ""}
                          onChange={(e) => handleImageUrlChange(index, e.target.value)}
                          placeholder="Paste image URL"
                          className="py-2"
                          style={{
                            borderRadius: "10px",
                            border: "2px solid #f0f0f0"
                          }}
                        />
                        {input.images[index] && (
                          <Button
                            variant="link"
                            className="position-absolute top-50 end-0 translate-middle-y p-0 me-2"
                            onClick={() => removeImage(index)}
                            style={{ minWidth: "auto" }}
                          >
                            <X size={16} color="#dc3545" />
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* PREVIEW */}
                    {(previewUrls[index] || input.images[index]) && (
                      <div className="mt-3 p-3 rounded-3" style={{ 
                        background: "#f8f9fa", 
                        border: "1px solid #e9ecef",
                        position: "relative"
                      }}>
                        <img
                          src={previewUrls[index] || input.images[index]}
                          alt={`Preview ${index + 1}`}
                          width="100%"
                          height="150"
                          style={{
                            borderRadius: "8px",
                            objectFit: "contain",
                            border: "2px solid #fff",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                            background: "#fff"
                          }}
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/300x150?text=Invalid+Image";
                            e.target.style.objectFit = "cover";
                          }}
                        />
                        
                        {/* Image Status */}
                        <div className="mt-2 d-flex justify-content-between align-items-center">
                          <span className="small text-muted">
                            {previewUrls[index] ? "Local preview" : "External URL"}
                          </span>
                          <span className="small">
                            {input.images[index]?.startsWith("http") ? 
                              <span className="text-success">✓ Uploaded</span> : 
                              <span className="text-warning">Local file</span>
                            }
                          </span>
                        </div>
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
              disabled={loading || uploading || !input.images[0]}
              style={{
                borderRadius: "12px",
                background: (loading || uploading || !input.images[0]) ? 
                  "#ccc" : "linear-gradient(135deg, #ff3e6c 0%, #ff7b9c 100%)",
                border: "none",
                fontSize: "16px",
                minWidth: "200px",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(255, 62, 108, 0.3)",
                opacity: (loading || uploading || !input.images[0]) ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                if (!loading && !uploading && input.images[0]) {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 8px 25px rgba(255, 62, 108, 0.4)";
                }
              }}
              onMouseLeave={(e) => {
                if (!loading && !uploading && input.images[0]) {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 4px 15px rgba(255, 62, 108, 0.3)";
                }
              }}
            >
              {uploading ? "Uploading..." : loading ? "Adding..." : "Add Product"}
            </Button>
            
            {!input.images[0] && (
              <div className="mt-2">
                <small className="text-danger">
                  <i>At least one image is required (Image 1)</i>
                </small>
              </div>
            )}
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default AddProduct;
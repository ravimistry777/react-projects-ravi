import { Card, Form, Button } from "react-bootstrap";

const Filters = ({ setCategory, setSort, setPriceRange, resetFilters }) => {
  return (
    <Card
      className="p-4"
      style={{
        border: "none",
        borderRadius: "16px",
        background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 6px 25px rgba(0, 0, 0, 0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.08)";
      }}
    >
      {/* header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5
          className="fw-bold mb-0"
          style={{
            color: "#2a2a2a",
            fontSize: "1.25rem",
          }}
        >
          Filters
        </h5>
        <div
          style={{
            width: "24px",
            height: "24px",
            background: "linear-gradient(135deg, #ff3e6c 0%, #ff7b9c 100%)",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              color: "white",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            3
          </span>
        </div>
      </div>

      {/* cate. */}
      <Form.Group className="mb-4">
        <Form.Label className="fw-semibold mb-3 d-block" style={{ color: "#2a2a2a", fontSize: "14px", letterSpacing: "0.5px" }}>
          CATEGORY
        </Form.Label>
        <Form.Select
          onChange={(e) => setCategory(e.target.value)}
          className="py-3"
          style={{
            borderRadius: "12px",
            cursor: "pointer",
            border: "2px solid #f0f0f0",
            background: "#ffffff",
            fontSize: "14px",
            fontWeight: "500",
            transition: "all 0.2s ease",
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
          <option value="">All Categories</option>
          <option value="Men">Men's Fashion</option>
          <option value="Women">Women's Fashion</option>
          <option value="Kids">Kids Fashion</option>
        </Form.Select>
      </Form.Group>

      {/* sorting */}
      <Form.Group className="mb-4">
        <Form.Label className="fw-semibold mb-3 d-block" style={{ color: "#2a2a2a", fontSize: "14px", letterSpacing: "0.5px" }}>
          SORT BY
        </Form.Label>
        <Form.Select
          onChange={(e) => setSort(e.target.value)}
          className="py-3"
          style={{
            borderRadius: "12px",
            cursor: "pointer",
            border: "2px solid #f0f0f0",
            background: "#ffffff",
            fontSize: "14px",
            fontWeight: "500",
            transition: "all 0.2s ease",
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
          <option value="">Recommended</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
          <option value="rating">Customer Ratings</option>
          <option value="newest">Newest First</option>
        </Form.Select>
      </Form.Group>

      {/* price range */}
      <Form.Group className="mb-4">
        <Form.Label className="fw-semibold mb-3 d-block" style={{ color: "#2a2a2a", fontSize: "14px", letterSpacing: "0.5px" }}>
          PRICE RANGE
        </Form.Label>
        <Form.Select
          onChange={(e) => setPriceRange(e.target.value)}
          className="py-3"
          style={{
            borderRadius: "12px",
            cursor: "pointer",
            border: "2px solid #f0f0f0",
            background: "#ffffff",
            fontSize: "14px",
            fontWeight: "500",
            transition: "all 0.2s ease",
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
          <option value="">All Price Ranges</option>
          <option value="0-500">Under ₹500</option>
          <option value="500-1000">₹500 - ₹1000</option>
          <option value="1000-2000">₹1000 - ₹2000</option>
          <option value="2000-5000">₹2000 - ₹5000</option>
          <option value="5000-10000">₹5000 - ₹10000</option>
        </Form.Select>
      </Form.Group>

      {/* reset btn */}
      <Button
        variant="outline-dark"
        className="w-100 fw-semibold py-3"
        onClick={resetFilters}
        style={{
          borderRadius: "12px",
          border: "2px solid #2a2a2a",
          background: "transparent",
          color: "#2a2a2a",
          fontSize: "14px",
          letterSpacing: "0.5px",
          transition: "all 0.3s ease",
          marginTop: "8px",
        }}
        onMouseEnter={(e) => {
          e.target.style.background = "#2a2a2a";
          e.target.style.color = "white";
          e.target.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "transparent";
          e.target.style.color = "#2a2a2a";
          e.target.style.transform = "translateY(0)";
        }}
      >
        RESET FILTERS
      </Button>

      {/* badge */}
      <div className="mt-4 p-3 rounded-3" style={{ background: "rgba(255, 62, 108, 0.05)", border: "1px solid rgba(255, 62, 108, 0.1)" }}>
        <p className="small fw-semibold mb-2" style={{ color: "#ff3e6c" }}>Active Filters</p>
        <div className="d-flex gap-2 flex-wrap">
          <span className="badge bg-light text-dark px-3 py-2 small">Men's</span>
          <span className="badge bg-light text-dark px-3 py-2 small">₹500-1000</span>
          <span className="badge bg-light text-dark px-3 py-2 small">Popular</span>
        </div>
      </div>
    </Card>
  );
};

export default Filters;
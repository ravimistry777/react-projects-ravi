import { useEffect } from "react";
import { Container, Table, Button, Card, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProductsAsync,
  deleteProductAsync,
} from "../services/actions/productAction";
import { Link } from "react-router-dom";
import { PencilSquare, Trash, Plus, BoxSeam } from "react-bootstrap-icons";

const AdminProducts = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllProductsAsync());
  }, []);

  const deleteHandler = (id) => {
    if (confirm("Delete this product?")) {
      dispatch(deleteProductAsync(id));
    }
  };

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
        <div className="d-flex justify-content-between align-items-center mb-5">
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
              <BoxSeam size={24} color="white" />
            </div>
            <div>
              <h2 className="fw-bold mb-1" style={{ color: "#2a2a2a" }}>
                Manage Products
              </h2>
              <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
                Total {products.length} products in your store
              </p>
            </div>
          </div>

          <Button
            as={Link}
            to="/admin/add"
            className="px-4 py-2 fw-bold d-flex align-items-center gap-2"
            style={{
              borderRadius: "12px",
              background: "linear-gradient(135deg, #ff3e6c 0%, #ff7b9c 100%)",
              border: "none",
              fontSize: "14px",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 15px rgba(255, 62, 108, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 8px 25px rgba(255, 62, 108, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(255, 62, 108, 0.3)";
            }}
          >
            <Plus size={18} /> Add Product
          </Button>
        </div>

        {/* PRODUCTS TABLE */}
        <div className="rounded-3 overflow-hidden border-0">
          <Table hover responsive className="mb-0 admin-table">
            <thead>
              <tr style={{
                background: "linear-gradient(135deg, #2a2a2a 0%, #404040 100%)",
                color: "white"
              }}>
                <th className="py-4 px-4 fw-semibold" style={{ fontSize: "14px", border: "none" }}>Product</th>
                <th className="py-4 px-4 fw-semibold" style={{ fontSize: "14px", border: "none" }}>Title</th>
                <th className="py-4 px-4 fw-semibold" style={{ fontSize: "14px", border: "none" }}>Price</th>
                <th className="py-4 px-4 fw-semibold" style={{ fontSize: "14px", border: "none" }}>Category</th>
                <th className="py-4 px-4 fw-semibold text-center" style={{ fontSize: "14px", border: "none", width: "140px" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p) => (
                <tr
                  key={p.id}
                  className="table-row-hover"
                  style={{
                    borderBottom: "1px solid #f0f0f0",
                    transition: "all 0.3s ease"
                  }}
                >
                  {/* PRODUCT IMAGE */}
                  <td className="px-4 py-3">
                    <div className="position-relative">
                      <img
                        src={p.images?.[0]}
                        width="60"
                        height="60"
                        style={{
                          objectFit: "cover",
                          borderRadius: "12px",
                          border: "2px solid #fff",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        }}
                      />
                      {p.images?.length > 1 && (
                        <Badge
                          bg="light"
                          className="position-absolute top-0 start-100 translate-middle small text-dark"
                          style={{
                            fontSize: "10px",
                            fontWeight: "600",
                            padding: "2px 4px"
                          }}
                        >
                          +{p.images.length - 1}
                        </Badge>
                      )}
                    </div>
                  </td>

                  {/* PRODUCT TITLE */}
                  <td className="px-4 py-3">
                    <div>
                      <div style={{ fontWeight: "600", color: "#2a2a2a", fontSize: "14px" }}>
                        {p.title}
                      </div>
                      {p.desc && (
                        <div style={{ color: "#666", fontSize: "12px", marginTop: "2px" }}>
                          {p.desc.substring(0, 40)}...
                        </div>
                      )}
                    </div>
                  </td>

                  {/* PRICE */}
                  <td className="px-4 py-3">
                    <div style={{ fontWeight: "700", color: "#ff3e6c", fontSize: "16px" }}>
                      ₹{p.price}
                    </div>
                  </td>

                  {/* CATEGORY */}
                  <td className="px-4 py-3">
                    <Badge
                      style={{
                        background: p.category === "Men" ? "#e3f2fd" :
                          p.category === "Women" ? "#fce4ec" : "#f3e5f5",
                        color: p.category === "Men" ? "#ffffffff" :
                          p.category === "Women" ? "#ffffffff" : "#fefefeff",
                        fontSize: "12px",
                        fontWeight: "600",
                        padding: "6px 12px",
                        borderRadius: "8px"
                      }}
                    >
                      {p.category}
                    </Badge>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-4 py-3">
                    <div className="d-flex gap-2 justify-content-center">
                      {/* EDIT BUTTON */}
                      <Button
                        size="sm"
                        as={Link}
                        to={`/admin/edit/${p.id}`}
                        className="d-flex align-items-center gap-2 px-3"
                        style={{
                          borderRadius: "8px",
                          background: "rgba(255, 62, 108, 0.1)",
                          border: "1px solid rgba(255, 62, 108, 0.2)",
                          color: "#ff3e6c",
                          fontSize: "12px",
                          fontWeight: "600",
                          transition: "all 0.2s ease"
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = "#ff3e6c";
                          e.target.style.color = "white";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = "rgba(255, 62, 108, 0.1)";
                          e.target.style.color = "#ff3e6c";
                        }}
                      >
                        <PencilSquare size={14} />
                        Edit
                      </Button>

                      {/* DELETE BUTTON */}
                      <Button
                        size="sm"
                        className="d-flex align-items-center gap-2 px-3"
                        style={{
                          borderRadius: "8px",
                          background: "rgba(220, 53, 69, 0.1)",
                          border: "1px solid rgba(220, 53, 69, 0.2)",
                          color: "#dc3545",
                          fontSize: "12px",
                          fontWeight: "600",
                          transition: "all 0.2s ease"
                        }}
                        onClick={() => deleteHandler(p.id)}
                        onMouseEnter={(e) => {
                          e.target.style.background = "#dc3545";
                          e.target.style.color = "white";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = "rgba(220, 53, 69, 0.1)";
                          e.target.style.color = "#dc3545";
                        }}
                      >
                        <Trash size={14} />
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {/* EMPTY STATE */}
        {products.length === 0 && (
          <div className="text-center py-5">
            <div
              className="mx-auto mb-3 d-flex align-items-center justify-content-center"
              style={{
                width: "80px",
                height: "80px",
                background: "rgba(255, 62, 108, 0.1)",
                borderRadius: "20px",
              }}
            >
              <BoxSeam size={32} color="#ff3e6c" />
            </div>
            <h5 className="fw-bold mb-2" style={{ color: "#2a2a2a" }}>No Products Found</h5>
            <p className="text-muted mb-4">Get started by adding your first product</p>
            <Button
              as={Link}
              to="/admin/add"
              className="px-4 py-2 fw-bold"
              style={{
                borderRadius: "10px",
                background: "linear-gradient(135deg, #ff3e6c 0%, #ff7b9c 100%)",
                border: "none",
              }}
            >
              <Plus size={16} className="me-2" />
              Add First Product
            </Button>
          </div>
        )}

        {/* HOVER */}
        <style>{`
          .admin-table tbody tr.table-row-hover:hover {
            background: rgba(255, 62, 108, 0.03) !important;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          }
        `}</style>
      </Card>
    </Container>
  );
};

export default AdminProducts;
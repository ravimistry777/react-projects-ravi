import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsAsync } from "../services/actions/productAction";
import ProductCard from "../components/ProductCard/ProductCard";
import Filters from "../components/Filters/Filters";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.products);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [priceRange, setPriceRange] = useState("");

  useEffect(() => {
    dispatch(getAllProductsAsync());
  }, []);

  let filtered = [...products];

  if (category) {
    filtered = filtered.filter((item) => item.category === category);
  }

  if (priceRange) {
    const [min, max] = priceRange.split("-");
    filtered = filtered.filter(
      (item) => item.price >= Number(min) && item.price <= Number(max)
    );
  }

  if (sort === "low-high") filtered.sort((a, b) => a.price - b.price);
  if (sort === "high-low") filtered.sort((a, b) => b.price - a.price);

  const resetFilters = () => {
    setCategory("");
    setSort("");
    setPriceRange("");
  };

  return (
    <Container fluid className="mt-4">

      {/* BANNER */}
      <div
        className="mb-4 hero-banner"
        style={{
          width: "100%",
          height: "300px",
          borderRadius: "12px",
          background:
            "url('https://www.bandhan.bank.in/sites/default/files/2021-04/Bandhan_Myntra_Offer_Banner_02.jpg') no-repeat center/cover",
        }}
      ></div>

      <Container>
        <Row>
          <Col md={3}>
            <Filters
              setCategory={setCategory}
              setSort={setSort}
              setPriceRange={setPriceRange}
              resetFilters={resetFilters}
            />
          </Col>
          <Col md={9}>
            <Row className="mb-4">

              {/* MEN */}
              <Col md={4} className="mb-3">
                <Link to="/men" className="text-decoration-none text-dark">
                  <Card
                    className="shadow-sm category-card"
                    style={{
                      cursor: "pointer",
                      borderRadius: "12px",
                      overflow: "hidden",
                    }}
                  >
                    <Card.Img
                      src="https://jadeblue.com/cdn/shop/files/CASUAL.webp?v=1759215793&width=2560"
                      height="160"
                      style={{ objectFit: "cover" }}
                    />
                    <Card.Body className="text-center fw-bold">MEN</Card.Body>
                  </Card>
                </Link>
              </Col>

              {/* WOMEN */}
              <Col md={4} className="mb-3">
                <Link to="/women" className="text-decoration-none text-dark">
                  <Card
                    className="shadow-sm category-card"
                    style={{
                      cursor: "pointer",
                      borderRadius: "12px",
                      overflow: "hidden",
                    }}
                  >
                    <Card.Img
                      src="https://rangita.com/cdn/shop/articles/ethnic_wear_blog_banner_e8ea06d7-94ef-4dba-9cc2-f5f6420840a5.png?v=1748513115&width=1780"
                      height="160"
                      style={{ objectFit: "cover" }}
                    />
                    <Card.Body className="text-center fw-bold">WOMEN</Card.Body>
                  </Card>
                </Link>
              </Col>

              {/* KIDS */}
              <Col md={4} className="mb-3">
                <Link to="/kids" className="text-decoration-none text-dark">
                  <Card
                    className="shadow-sm category-card"
                    style={{
                      cursor: "pointer",
                      borderRadius: "12px",
                      overflow: "hidden",
                    }}
                  >
                    <Card.Img
                      src="https://littlemuffet.com/cdn/shop/files/LM_Aug_2335829_84fb25b2-3986-4351-a3b9-251a9108f077.jpg?v=1715598188"
                      height="160"
                      style={{ objectFit: "cover" }}
                    />
                    <Card.Body className="text-center fw-bold">KIDS</Card.Body>
                  </Card>
                </Link>
              </Col>

            </Row>

            {/* PRODUCTS */}
            {isLoading ? (
              <div className="text-center py-5">
                <Spinner animation="border" />
              </div>
            ) : (
              <Row>
                {filtered.map((item) => (
                  <Col md={4} key={item.id} className="mb-4">
                    <ProductCard item={item} />
                  </Col>
                ))}
              </Row>
            )}
          </Col>
        </Row>
      </Container>

      {/* HOVER CSS */}
      <style>{`
        .category-card:hover {
          transform: translateY(-4px);
          transition: 0.3s;
          box-shadow: 0px 6px 18px rgba(0,0,0,0.12);
        }
      `}</style>

    </Container>
  );
};

export default Home;

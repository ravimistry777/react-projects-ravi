import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Card, Button } from "react-bootstrap";
import { Filter } from "react-bootstrap-icons";
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
  const [showFilters, setShowFilters] = useState(false);

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
        className="mb-4 hero-banner shadow-sm"
        style={{
          width: "100%",
          minHeight: "180px",
          height: "auto",
          aspectRatio: "3/1",
          borderRadius: "12px",
          background:
            "url('https://www.bandhan.bank.in/sites/default/files/2021-04/Bandhan_Myntra_Offer_Banner_02.jpg') no-repeat center/cover",
        }}
      ></div>

      <Container>
        {/* Mobile Filter Toggle */}
        <div className="d-md-none mb-3">
          <Button 
            variant="outline-dark" 
            className="w-100 d-flex align-items-center justify-content-center gap-2"
            onClick={() => setShowFilters(!showFilters)}
            style={{ borderRadius: "8px" }}
          >
            <Filter size={18} /> {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>

        <Row className="g-4">
          <Col lg={3} md={4} className={`mb-3 ${showFilters ? 'd-block' : 'd-none d-md-block'}`}>
            <Filters
              setCategory={setCategory}
              setSort={setSort}
              setPriceRange={setPriceRange}
              resetFilters={resetFilters}
            />
          </Col>
          {/* Mobile Filter Toggle could go here, but for now we hide filters on mobile or keep them stacked. 
              Let's keep them stacked but visible for now by removing d-none if user wants them.
              Actually, usually filters on mobile are hidden behind a button. 
              For this task, I will make them stack normally but ensure layout is clean.
           */}
           
           {/* Let's try a better layout: Filters on top for mobile? No, sidebar is standard. 
               I'll use the standard stacking: Filters on top on mobile. 
           */}
           
          <Col lg={9} md={8}>
            <Row className="mb-4 g-2 g-md-3">

              {/* MEN */}
              <Col xs={4} sm={4}>
                <Link to="/men" className="text-decoration-none text-dark">
                  <Card
                    className="shadow-sm category-card border-0 h-100"
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
                    <Card.Body className="text-center fw-bold py-1 px-1 small">MEN</Card.Body>
                  </Card>
                </Link>
              </Col>

              {/* WOMEN */}
              <Col xs={4} sm={4}>
                <Link to="/women" className="text-decoration-none text-dark">
                  <Card
                    className="shadow-sm category-card border-0 h-100"
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
                    <Card.Body className="text-center fw-bold py-1 px-1 small">WOMEN</Card.Body>
                  </Card>
                </Link>
              </Col>

              {/* KIDS */}
              <Col xs={4} sm={4}>
                <Link to="/kids" className="text-decoration-none text-dark">
                  <Card
                    className="shadow-sm category-card border-0 h-100"
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
                    <Card.Body className="text-center fw-bold py-1 px-1 small">KIDS</Card.Body>
                  </Card>
                </Link>
              </Col>

            </Row>

            {/* PRODUCTS */}
            {isLoading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="danger" />
              </div>
            ) : (
              <Row className="g-2 g-md-4">
                {filtered.map((item) => (
                  <Col xs={6} sm={6} lg={4} xl={3} key={item.id}>
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

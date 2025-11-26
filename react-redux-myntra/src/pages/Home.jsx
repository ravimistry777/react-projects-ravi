import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsAsync } from "../services/actions/productAction";
import ProductCard from "../components/ProductCard/ProductCard";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/home.css";

const Home = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector(
    (state) => state.productsState
  );

  useEffect(() => {
    dispatch(getAllProductsAsync());
  }, []);

  return (
    <Container className="mt-4">

      <h3 className="mb-3">Trending Products</h3>

      {isLoading && <h4>Loading...</h4>}

      <Row>
        {products.map((p) => (
          <Col md={3} sm={6} xs={12} key={p.id} className="mb-4">
            <ProductCard product={p} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;

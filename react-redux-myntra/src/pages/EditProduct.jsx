import React, { useEffect, useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  getProductAsync,
  updateProductAsync
} from "../services/actions/productAction";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product, isUpdated } = useSelector((s) => s.productsState);

  const [form, setForm] = useState(null);

  useEffect(() => {
    dispatch(getProductAsync(id));
  }, [id]);

  useEffect(() => {
    if (product) setForm(product);
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (index, value) => {
    let imgs = [...form.images];
    imgs[index] = value;
    setForm({ ...form, images: imgs });
  };

  const toggleSize = (size) => {
    let sizes = [...form.sizes];
    if (sizes.includes(size)) {
      sizes = sizes.filter((s) => s !== size);
    } else sizes.push(size);
    setForm({ ...form, sizes });
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(updateProductAsync(id, form));
  };

  useEffect(() => {
    if (isUpdated) {
      navigate("/");
    }
  }, [isUpdated]);

  if (!form) return <h3>Loading...</h3>;

  return (
    <Container className="mt-4">
      <h3>Edit Product</h3>

      <Form onSubmit={submit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            value={form.title}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="desc"
            value={form.desc}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </Form.Select>
        </Form.Group>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* 4 Images */}
        <h5>Images</h5>
        <Row>
          {form.images.map((img, idx) => (
            <Col md={3} key={idx}>
              <Form.Control
                className="mb-3"
                value={img}
                placeholder={`Image ${idx + 1}`}
                onChange={(e) => handleImageChange(idx, e.target.value)}
              />
            </Col>
          ))}
        </Row>

        {/* Sizes */}
        <h5>Sizes</h5>
        <div className="d-flex gap-3 mb-3">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div key={size}>
              <input
                type="checkbox"
                checked={form.sizes.includes(size)}
                onChange={() => toggleSize(size)}
              />{" "}
              {size}
            </div>
          ))}
        </div>

        <Button type="submit">Update Product</Button>
      </Form>
    </Container>
  );
};

export default EditProduct;

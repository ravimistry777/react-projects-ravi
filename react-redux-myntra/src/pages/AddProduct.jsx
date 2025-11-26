import React, { useState, useEffect } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addProductAsync } from "../services/actions/productAction";
import { useNavigate } from "react-router-dom";
import generateUniqueId from "generate-unique-id";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isCreated } = useSelector((s) => s.productsState);

  const initial = {
    id: "",
    title: "",
    desc: "",
    price: "",
    quantity: "",
    category: "",
    images: ["", "", "", ""],
    sizes: []
  };

  const [form, setForm] = useState(initial);

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
    const data = { ...form, id: generateUniqueId({ length: 6 }) };
    dispatch(addProductAsync(data));
  };

  useEffect(() => {
    if (isCreated) {
      navigate("/");
    }
  }, [isCreated]);

  return (
    <Container className="mt-4">
      <h3>Add Product</h3>

      <Form onSubmit={submit}>

        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control name="desc" onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select name="category" onChange={handleChange}>
            <option>Select</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </Form.Select>
        </Form.Group>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" name="price" onChange={handleChange} />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="number" name="quantity" onChange={handleChange} />
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
                onChange={() => toggleSize(size)}
              />{" "}
              {size}
            </div>
          ))}
        </div>

        <Button type="submit">Add Product</Button>
      </Form>
    </Container>
  );
};

export default AddProduct;

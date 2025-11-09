import React, { useState } from 'react'
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap'

const AddCar = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    details: '',
    image: '',
    features: '',
    brand: '',
    category: ''
  })
  const [showAlert, setShowAlert] = useState(false)

  const brands = {
    sedan: ['mercedes', 'audi', 'bmw', 'jaguar'],
    suv: ['range', 'volvo', 'audi', 'bmw'],
    sports: ['porsche', 'lamborghini', 'ferrari', 'audi']
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const featuresArray = formData.features.split(',').map(feature => feature.trim())
    
    const newCar = {
      id: Date.now(),
      name: formData.name,
      price: formData.price,
      details: formData.details,
      image: formData.image,
      features: featuresArray,
      brand: formData.brand,
      category: formData.category,
      timestamp: new Date().toLocaleString()
    }

    const existingCars = JSON.parse(localStorage.getItem('userAddedCars') || '{}')
    
    if (!existingCars[formData.category]) {
      existingCars[formData.category] = {}
    }
    if (!existingCars[formData.category][formData.brand]) {
      existingCars[formData.category][formData.brand] = {
        name: formData.brand.charAt(0).toUpperCase() + formData.brand.slice(1),
        cars: []
      }
    }

    existingCars[formData.category][formData.brand].cars.push(newCar)
    localStorage.setItem('userAddedCars', JSON.stringify(existingCars))

    setShowAlert(true)
    setFormData({ 
      name: '', 
      price: '', 
      details: '', 
      image: '', 
      features: '',
      brand: '',
      category: ''
    })

    setTimeout(() => setShowAlert(false), 5000)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="contact-section-premium" style={{ paddingTop: '120px' }}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            {showAlert && (
              <Alert 
                variant="success" 
                className="text-center fade-in"
                style={{
                  borderRadius: '8px',
                  border: 'none',
                  background: 'var(--success)',
                  color: 'white'
                }}
              >
                Car Added Successfully! It will appear in the respective brand section.
              </Alert>
            )}
            
            <div className="contact-form-premium">
              <div className="text-center mb-5">
                <h2 className="section-title mb-3">Add New Car</h2>
                <p className="section-subtitle">
                  Add your car to the premium collection
                </p>
              </div>
              
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">Car Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="e.g., Mercedes-Benz C-Class"
                        className="form-control-premium"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">Price *</Form.Label>
                      <Form.Control
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        placeholder="e.g., ₹ 57.89-64.30 Lakh"
                        className="form-control-premium"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Car Details *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    required
                    placeholder="Detailed description about the car..."
                    className="form-control-premium"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Image URL *</Form.Label>
                  <Form.Control
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    required
                    placeholder="https://fortunertoyota.com/car-image.jpg"
                    className="form-control-premium"
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">Category *</Form.Label>
                      <Form.Select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="form-control-premium"
                      >
                        <option value="">Select Category</option>
                        <option value="sedan">Sedan</option>
                        <option value="suv">SUV</option>
                        <option value="sports">Sports</option>
                        <option value="hatchback">Hatchback</option>
                        <option value="coupe">Coupe</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">Brand *</Form.Label>
                      <Form.Select
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        required
                        className="form-control-premium"
                      >
                        <option value="">Select Brand</option>
                        {formData.category && brands[formData.category]?.map((brand, index) => (
                          <option key={index} value={brand}>
                            {brand.charAt(0).toUpperCase() + brand.slice(1)}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-bold">Features (separate features with commas) *</Form.Label>
                  <Form.Control
                    type="text"
                    name="features"
                    value={formData.features}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Hybrid, 1496cc, 197bhp, 245 kmph"
                    className="form-control-premium"
                  />
                  <Form.Text className="text-muted">
                    Separate multiple features with commas else it will not show properly , thank you.
                  </Form.Text>
                </Form.Group>

                <div className="text-center">
                  <Button 
                    type="submit"
                    className="btn-success px-5"
                  >
                    <i className="fas fa-plus me-2"></i>
                    Add Car
                  </Button>
                </div>
              </Form>
            </div>

            <Row className="mt-5">
              <Col>
                <Card className="feature-card">
                  <div className="text-center">
                    <div className="feature-icon-premium">
                      <i className="fas fa-info-circle"></i>
                    </div>
                    <h4>How It Works</h4>
                    <p className="text-muted">
                      After adding a car, it will automatically appear in the respective brand section. 
                      For example: Sedan → Mercedes → Your added car will show here.
                    </p>
                  </div>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default AddCar
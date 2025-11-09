import React, { useState } from 'react'
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    car: '',
    message: '',
    enquiryType: 'testDrive'
  })
  const [showAlert, setShowAlert] = useState(false)

  const cars = [
    'Mercedes E-Class - Executive Sedan',
    'BMW 5 Series - Executive Sedan', 
    'Audi A6 - Executive Sedan',
    'Range Rover Velar - Luxury SUV',
    'Volvo XC90 - Luxury SUV',
    'Porsche 911 - Performance Sports'
  ]

  const enquiryTypes = [
    { value: 'testDrive', label: 'Test Drive', icon: 'fas fa-calendar' },
    { value: 'price', label: 'Pricing', icon: 'fas fa-tag' },
    { value: 'finance', label: 'Finance', icon: 'fas fa-hand-holding-usd' },
    { value: 'general', label: 'General', icon: 'fas fa-comments' }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Save to localStorage
    
    const submissions = JSON.parse(localStorage.getItem('enquiries') || '[]')
    const enquiryData = {
      ...formData,
      id: Date.now(),
      timestamp: new Date().toLocaleString()
    }
    submissions.push(enquiryData)
    localStorage.setItem('enquiries', JSON.stringify(submissions))
    
    setShowAlert(true)
    setFormData({ 
      name: '', 
      mobile: '', 
      email: '', 
      car: '', 
      message: '',
      enquiryType: 'testDrive'
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
                  background: 'var(--gold)',
                  color: 'white'
                }}
              >
                Enquiry Submitted Successfully , we will reach you shortly.
              </Alert>
            )}
            
            <div className="contact-form-premium">
              <div className="text-center mb-5">
                <h2 className="section-title mb-3">Enquire Now</h2>
                <p className="section-subtitle">
                  Let us assist you in finding your perfect vehicle
                </p>
              </div>
              
              <Form onSubmit={handleSubmit}>
                <Row className="mb-4">
                  <Col>
                    <Form.Label className="fw-bold">Enquiry Type</Form.Label>
                    <div className="d-flex flex-wrap gap-2">
                      {enquiryTypes.map((type, index) => (
                        <Button
                          key={index}
                          type="button"
                          variant={formData.enquiryType === type.value ? "success" : "outline-dark"}
                          className="d-flex align-items-center"
                          onClick={() => setFormData({...formData, enquiryType: type.value})}
                          style={{
                            borderRadius: '6px',
                            padding: '8px 16px',
                            borderWidth: '1px',
                            fontSize: '0.9rem'
                          }}
                        >
                          <i className={`${type.icon} me-2`}></i>
                          {type.label}
                        </Button>
                      ))}
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">Full Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                        className="form-control-premium"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">Mobile Number *</Form.Label>
                      <Form.Control
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                        placeholder="Your mobile number"
                        className="form-control-premium"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Email Address *</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Your email address"
                    className="form-control-premium"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Vehicle Interest</Form.Label>
                  <Form.Select
                    name="car"
                    value={formData.car}
                    onChange={handleChange}
                    className="form-control-premium"
                  >
                    <option value="">Select a vehicle...</option>
                    {cars.map((car, index) => (
                      <option key={index} value={car}>{car}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-bold">Additional Requirements</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Specific requirements or questions..."
                    className="form-control-premium"
                    style={{ resize: 'none' }}
                  />
                </Form.Group>

                <div className="text-center">
                  <Button 
                    type="submit" 
                    className="btn-success px-5"
                  >
                    Submit Enquiry
                  </Button>
                </div>
              </Form>
            </div>

            {/* Contact Info */}
            
            <Row className="mt-5">
              <Col md={4} className="mb-3">
                <Card className="feature-card text-center h-100">
                  <div className="feature-icon-premium">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <h5>Call Us</h5>
                  <a href="tel:+917069695001" className="text-danger text-decoration-none">+91 70696 95001</a>
                </Card>
              </Col>
              <Col md={4} className="mb-3">
                <Card className="feature-card text-center h-100">
                  <div className="feature-icon-premium">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <h5>Email Us</h5>
                  <a href="mailto:ravisiddhapura777@gmail.com" className="text-danger text-decoration-none" >
                  ravisiddhapura777@gmail.com
                  </a>
                </Card>
              </Col>
              <Col md={4} className="mb-3">
                <Card className="feature-card text-center h-100">
                  <div className="feature-icon-premium">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <h5>Showroom (Click down below*)</h5>
                  <a href="https://www.google.com/maps?q=Surat+Gujarat" target="_blank" className="text-danger text-decoration-none">Surat, Gujarat</a>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Contact
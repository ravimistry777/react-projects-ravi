import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './Home.css'

const Home = () => {
  const navigate = useNavigate()

  const features = [
    {
      icon: 'fas fa-car',
      title: 'Premium Collection',
      description: 'Discover our extensive range of luxury and performance vehicles from top brands worldwide.'
    },
    {
      icon: 'fas fa-tag',
      title: 'Best Value Deals',
      description: 'Get the most competitive prices with complete transparency and exclusive offers.'
    },
    {
      icon: 'fas fa-headset',
      title: '24/7 Expert Support',
      description: 'Our dedicated team is available round the clock to assist you with all your needs.'
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Quality Assurance',
      description: 'Every vehicle undergoes rigorous inspection and comes with comprehensive warranty.'
    },
    {
      icon: 'fas fa-bolt',
      title: 'Quick Delivery',
      description: 'Experience fast and hassle-free delivery with our streamlined process.'
    },
    {
      icon: 'fas fa-star',
      title: 'Premium Service',
      description: 'Enjoy white-glove service from consultation to after-sales support.'
    }
  ]

  const stats = [
    { number: '500+', label: 'Premium Cars' },
    { number: '5K+', label: 'Happy Customers' },
    { number: '30+', label: 'Brands' },
    { number: '10+', label: 'Cities' }
  ]

  return (
    <div className="home-classic">

      <section className="hero-classic">
        <Container>
          <Row className="align-items-center min-vh-100">
            <Col lg={6} className="hero-content">
              <div className="hero-badge">Since 2018</div>
              <h1 className="hero-title">
                RAVI'S CARZ HUB
              </h1>
              <p className="hero-subtitle">
                Where automotive excellence meets unparalleled service. Discover the perfect vehicle that reflects your style and ambition.
              </p>
              <div className="hero-buttons">
                <Button
                  className="btn-classic primary"
                  onClick={() => navigate('/find-cars')}
                >
                  Explore Collection
                </Button>
                <Button
                  className="btn-classic outline"
                  onClick={() => navigate('/contact')}
                >
                  Book Consultation
                </Button>
              </div>

              {/* Stats */}
              
              <Row className="hero-stats mt-5">
                {stats.map((stat, index) => (
                  <Col key={index} className="stat-col">
                    <div className="stat-number">{stat.number}</div>
                    <div className="stat-label">{stat.label}</div>
                  </Col>
                ))}
              </Row>
            </Col>
            <Col lg={6} className="hero-image">
              <div className="image-container">
                <video className="main-video" autoPlay muted loop playsInline>
                  <source src="../../public/tata.mp4" type="video/mp4" />
                  Your browser does not support the video!
                </video>
                <div className="floating-badge">
                  <i className="fas fa-award"></i>
                  <span>Premium Dealer</span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      
      <section className="features-classic">
        <Container>
          <Row className="text-center section-header">
            <Col lg={8} className="mx-auto">
              <h2>Why Choose Ravi's CARZ HUB ? 😁</h2>
              <p className="section-subtitle">
                Excellence in every detail, commitment in every service
              </p>
            </Col>
          </Row>
          <Row>
            {features.map((feature, index) => (
              <Col lg={4} md={6} key={index} className="mb-4">
                <div className="feature-card-classic">
                  <div className="feature-icon">
                    <i className={feature.icon}></i>
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="cta-classic">
        <video className="cta-video-bg" autoPlay muted loop playsInline>
          <source src="../../public/mahindra.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h2>Begin Your Journey</h2>
              <p>Experience the difference that comes with decades of expertise and passion for automobiles</p>
              <Button
                className="btn-classic primary large"
                onClick={() => navigate('/find-cars')}
              >
                Discover Our Collection
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  )
}

export default Home
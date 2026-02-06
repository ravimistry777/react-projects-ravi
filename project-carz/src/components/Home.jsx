import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaCar, FaTag, FaHeadset, FaShieldAlt, FaBolt, FaStar } from 'react-icons/fa'
import './Home.css'

const Home = () => {
  const navigate = useNavigate()

  const features = [
    {
      icon: <FaCar />,
      title: 'Premium Collection',
      description: 'Discover our extensive range of luxury and performance vehicles from top brands worldwide.'
    },
    {
      icon: <FaTag />,
      title: 'Best Value Deals',
      description: 'Get the most competitive prices with complete transparency and exclusive offers.'
    },
    {
      icon: <FaHeadset />,
      title: '24/7 Expert Support',
      description: 'Our dedicated team is available round the clock to assist you with all your needs.'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Quality Assurance',
      description: 'Every vehicle undergoes rigorous inspection and comes with comprehensive warranty.'
    },
    {
      icon: <FaBolt />,
      title: 'Quick Delivery',
      description: 'Experience fast and hassle-free delivery with our streamlined process.'
    },
    {
      icon: <FaStar />,
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <div className="home-classic">

      <section className="hero-classic">
        <Container>
          <Row className="align-items-center min-vh-100">
            <Col lg={6} className="hero-content">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="hero-badge">Since 2018</div>
                <h1 className="hero-title">
                  RAVI'S <span>CARZ HUB</span>
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
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <Row className="hero-stats mt-5">
                  {stats.map((stat, index) => (
                    <Col key={index} className="stat-col" xs={6} md={3}>
                      <div className="stat-number">{stat.number}</div>
                      <div className="stat-label">{stat.label}</div>
                    </Col>
                  ))}
                </Row>
              </motion.div>
            </Col>
            
            <Col lg={6} className="hero-image">
              <motion.div 
                className="image-container"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <video className="main-video" autoPlay muted loop playsInline>
                  <source src="/tata.mp4" type="video/mp4" />
                  Your browser does not support the video!
                </video>
                <div className="floating-badge">
                  <FaStar />
                  <span>Premium Dealer</span>
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="features-classic">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <Row className="text-center section-header">
              <Col lg={8} className="mx-auto">
                <motion.h2 variants={itemVariants}>Why Choose Ravi's CARZ HUB?</motion.h2>
                <motion.p className="section-subtitle" variants={itemVariants}>
                  Excellence in every detail, commitment in every service
                </motion.p>
              </Col>
            </Row>
            <Row>
              {features.map((feature, index) => (
                <Col lg={4} md={6} key={index} className="mb-4">
                  <motion.div className="feature-card-classic" variants={itemVariants}>
                    <div className="feature-icon">
                      {feature.icon}
                    </div>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </motion.div>
        </Container>
      </section>

      <section className="cta-classic">
        <video className="cta-video-bg" autoPlay muted loop playsInline>
          <source src="/mahindra.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="cta-overlay"></div>
        <Container style={{ position: 'relative', zIndex: 2 }}>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2>Begin Your Journey</h2>
                <p>Experience the difference that comes with decades of expertise and passion for automobiles</p>
                <Button
                  className="btn-classic primary large"
                  onClick={() => navigate('/find-cars')}
                  style={{ background: 'white', color: 'var(--text-primary)', border: 'none' }}
                >
                  Discover Our Collection
                </Button>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  )
}

export default Home
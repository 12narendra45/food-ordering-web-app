import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();
  const { user } = useContext(CartContext);

  const features = [
    { icon: '⚡', title: 'Fast Delivery', desc: 'Quick and reliable service' },
    { icon: '🎯', title: 'Best Prices', desc: 'Competitive pricing guaranteed' },
    { icon: '👨‍🍳', title: 'Quality Food', desc: 'Fresh and delicious meals' },
    { icon: '📱', title: 'Easy Ordering', desc: 'Simple and intuitive interface' },
  ];

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <Container fluid className="hero-section">
        <Container className="text-center">
          <div className="hero-content">
            <h1 className="hero-title">DineDirect</h1>
            <p className="hero-subtitle">Seamless Dining at Your Fingertips</p>
            <p className="hero-description">
              Order delicious food from your favorite restaurants with just a few clicks
            </p>
            <div className="mt-4">
              {user ? (
                <Button
                  variant="success"
                  size="lg"
                  as={Link}
                  to="/menu"
                  className="me-3"
                >
                  Order Now
                </Button>
              ) : (
                <>
                  <Button
                    variant="success"
                    size="lg"
                    as={Link}
                    to="/menu"
                    className="me-3"
                  >
                    Order Now
                  </Button>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => navigate('/login')}
                  >
                    Login to Account
                  </Button>
                </>
              )}
            </div>
          </div>
        </Container>
      </Container>

      {/* Features Section */}
      <Container className="features-section py-5">
        <h2 className="text-center mb-5">Why Choose DineDirect?</h2>
        <Row>
          {features.map((feature, index) => (
            <Col key={index} md={6} lg={3} className="mb-4">
              <Card className="feature-card h-100 text-center">
                <Card.Body>
                  <div className="feature-icon">{feature.icon}</div>
                  <Card.Title>{feature.title}</Card.Title>
                  <Card.Text>{feature.desc}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* CTA Section */}
      <Container fluid className="cta-section">
        <Container className="text-center py-5">
          <h2>Ready to Order?</h2>
          <p className="lead">Join thousands of happy customers</p>
          {!user && (
            <Button
              variant="light"
              size="lg"
              onClick={() => navigate('/register')}
              className="mt-3"
            >
              Create New Account
            </Button>
          )}
        </Container>
      </Container>
    </div>
  );
}

export default LandingPage;
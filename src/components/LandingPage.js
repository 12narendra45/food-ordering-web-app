import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

function LandingPage() {
  return (
    <Container className="text-center mt-5">
      <h1>Welcome to Healthy Bites</h1>
      <p>Order fresh and healthy food at your convenience.</p>
      <Link to="/menu"><Button variant="success">Order Now</Button></Link>
      <Link to="/login" className="ms-3"><Button variant="primary">Login</Button></Link>
    </Container>
  );
}
export default LandingPage;
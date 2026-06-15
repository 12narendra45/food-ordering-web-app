import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { CartContext } from '../../context/CartContext';
import './Auth.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(CartContext);

  useEffect(() => {
    // If already logged in, redirect to menu
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      navigate('/menu');
    }
  }, [navigate]);

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (name.length < 2) {
      setError('Name must be at least 2 characters');
      setLoading(false);
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email');
      setLoading(false);
      return;
    }

    if (password.length < 3) {
      setError('Password must be at least 3 characters');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      // Store user data in localStorage
      const userData = {
        id: Date.now(),
        name,
        email,
        password: password, // In production, never store passwords!
        registrationTime: new Date().toISOString(),
      };

      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('userEmail', email);
      setUser(userData);

      setSuccess('Registration successful! Redirecting...');
      setLoading(false);

      setTimeout(() => {
        navigate('/menu');
      }, 1500);
    }, 500);
  };

  return (
    <Container className="auth-container">
      <Card className="auth-card">
        <Card.Body className="p-5">
          <h2 className="text-center mb-2 auth-title">Join DineDirect!</h2>
          <p className="text-center text-muted mb-4 auth-subtitle">
            Create an account and start ordering amazing food
          </p>

          {error && <Alert variant="danger" className="alert-custom">{error}</Alert>}
          {success && <Alert variant="success" className="alert-custom">{success}</Alert>}

          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label className="fw-bold">Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control-lg input-modern"
                disabled={loading}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label className="fw-bold">Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control-lg input-modern"
                disabled={loading}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label className="fw-bold">🔐 Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password (min 3 chars)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control-lg input-modern"
                disabled={loading}
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="confirmPassword">
              <Form.Label className="fw-bold">🔐 Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-control-lg input-modern"
                disabled={loading}
              />
            </Form.Group>

            <Button
              variant="success"
              className="w-100 mb-3 btn-lg btn-modern fw-bold"
              type="submit"
              disabled={loading}
            >
              {loading ? '⏳ Creating Account...' : '✨ Create Account'}
            </Button>
          </Form>

          <hr className="my-4" />

          <div className="text-center">
            <p className="mb-2">
              Already have an account?{' '}
              <Button
                variant="link"
                className="p-0 text-decoration-none link-modern"
                onClick={() => navigate('/login')}
                disabled={loading}
              >
                Login here
              </Button>
            </p>
            <Button
              variant="outline-secondary"
              className="w-100 btn-outline-modern"
              onClick={() => navigate('/')}
              disabled={loading}
            >
              ← Back to Home
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Register;
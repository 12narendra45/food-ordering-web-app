import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import './Auth.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
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

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!email || !password) {
      setError('Please fill in all fields');
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

    // Simulate API call
    setTimeout(() => {
      // Store user data in localStorage
      const userData = {
        id: Date.now(),
        email,
        name: email.split('@')[0],
        password: password, // In production, never store passwords!
        loginTime: new Date().toISOString(),
      };

      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('userEmail', email); // For quick reference
      setUser(userData);

      setLoading(false);
      navigate('/menu');
    }, 500);
  };

  return (
    <Container className="auth-container">
      <Card className="auth-card">
        <Card.Body className="p-5">
          <h2 className="text-center mb-2 auth-title">Welcome Back!</h2>
          <p className="text-center text-muted mb-4 auth-subtitle">
            Login to DineDirect and order your favorite food
          </p>

          {error && <Alert variant="danger" className="alert-custom">{error}</Alert>}

          <Form onSubmit={handleLogin}>
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

            <Form.Group className="mb-4" controlId="password">
              <Form.Label className="fw-bold">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control-lg input-modern"
                disabled={loading}
              />
              <Form.Text className="text-muted small">
                Demo: Use any email and password (min 3 chars)
              </Form.Text>
            </Form.Group>

            <Button
              variant="primary"
              className="w-100 mb-3 btn-lg btn-modern fw-bold"
              type="submit"
              disabled={loading}
            >
              {loading ? '⏳ Logging in...' : '🚀 Login'}
            </Button>
          </Form>

          <hr className="my-4" />

          <div className="text-center">
            <p className="mb-2">
              Don't have an account?{' '}
              <Button
                variant="link"
                className="p-0 text-decoration-none link-modern"
                onClick={() => navigate('/register')}
                disabled={loading}
              >
                Create one now
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

export default Login;

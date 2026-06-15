import React, { useContext } from 'react';
import { Container, Button, ListGroup, Card, Row, Col, Alert, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './Cart.css';

function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCart, getTotal, tableNumber } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <Container className="cart-container py-5">
        <Card className="empty-cart-card">
          <Card.Body className="text-center py-5">
            <div className="empty-cart-icon">�️</div>
            <h3>Your Cart is Empty</h3>
            <p className="text-muted">No items added yet. Start ordering now!</p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/menu')}
              className="mt-4"
            >
              Continue Shopping
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  const total = getTotal();

  return (
    <Container className="cart-container py-4">
      <h2 className="mb-4">
        Shopping Cart
      </h2>

      {tableNumber && (
        <Alert variant="info" className="mb-4">
          <strong>Table Number:</strong> {tableNumber}
        </Alert>
      )}

      <Row>
        <Col lg={8}>
          <Card className="cart-items-card">
            <Card.Body>
              <ListGroup variant="flush">
                {cart.map((item, index) => (
                  <ListGroup.Item key={index} className="cart-item">
                    <Row className="align-items-center">
                      <Col xs={2} md={1} className="text-center">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="item-image"
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="50" height="50"%3E%3Crect fill="%23e0e0e0" width="50" height="50"/%3E%3C/svg%3E';
                          }}
                        />
                      </Col>
                      <Col xs={10} md={6}>
                        <div>
                          <h6 className="mb-1">{item.name}</h6>
                          <small className="text-muted">{item.category}</small>
                        </div>
                      </Col>
                      <Col xs={12} md={5} className="mt-2 mt-md-0">
                        <Row className="align-items-center justify-content-between">
                          <Col xs={6} md={5}>
                            <span className="item-price">₹{item.price}</span>
                          </Col>
                          <Col xs={6} md={4} className="text-end">
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => removeFromCart(index)}
                              className="remove-btn"
                            >
                              Remove
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="summary-card sticky-top">
            <Card.Body>
              <h5 className="mb-4">Order Summary</h5>

              <div className="summary-item">
                <span>Subtotal:</span>
                <span className="fw-bold">₹{total}</span>
              </div>
              <div className="summary-item">
                <span>Items:</span>
                <Badge bg="primary">{cart.length}</Badge>
              </div>
              <div className="summary-item">
                <span>Delivery:</span>
                <span className="text-success fw-bold">Free</span>
              </div>

              <hr />

              <div className="summary-total">
                <span>Total:</span>
                <span>₹{total}</span>
              </div>

              <Button
                variant="success"
                size="lg"
                className="w-100 mb-3 mt-3 proceed-btn"
                onClick={() => navigate('/payment')}
              >
                Proceed to Payment
              </Button>

              <Button
                variant="outline-secondary"
                className="w-100 mb-2"
                onClick={() => navigate('/menu')}
              >
                Continue Shopping
              </Button>

              <Button
                variant="outline-danger"
                className="w-100"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Cart;

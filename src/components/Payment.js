import React, { useState, useContext } from 'react';
import { Container, Button, Card, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './Payment.css';

function Payment() {
  const navigate = useNavigate();
  const { cart, getTotal, clearCart, tableNumber } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });

  const total = getTotal();

  if (cart.length === 0) {
    return (
      <Container className="payment-container py-5">
        <Card className="empty-cart-card">
          <Card.Body className="text-center py-5">
            <h3>No Items to Pay</h3>
            <p className="text-muted">Your cart is empty</p>
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

  const handlePayment = (e) => {
    e.preventDefault();

    if (paymentMethod === 'card') {
      if (
        !cardDetails.cardNumber ||
        !cardDetails.cardHolder ||
        !cardDetails.expiryDate ||
        !cardDetails.cvv
      ) {
        alert('Please fill in all card details');
        return;
      }
      if (cardDetails.cardNumber.length < 16) {
        alert('Card number must be 16 digits');
        return;
      }
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);

      // Reset after 3 seconds and redirect
      setTimeout(() => {
        clearCart();
        navigate('/menu');
      }, 3000);
    }, 2000);
  };

  if (paymentSuccess) {
    return (
      <Container className="payment-container py-5">
        <Card className="success-card">
          <Card.Body className="text-center py-5">
            <div className="success-icon">✅</div>
            <h2>Payment Successful!</h2>
            <p className="text-muted">Your order has been placed successfully</p>
            <div className="order-details mt-4">
              <p>
                <strong>Order ID:</strong> #{Math.random().toString(36).substr(2, 9).toUpperCase()}
              </p>
              <p>
                <strong>Table:</strong> {tableNumber}
              </p>
              <p>
                <strong>Payment Method:</strong> {paymentMethod === 'cash' ? 'Cash on Table' : paymentMethod === 'card' ? 'Card' : 'UPI'}
              </p>
              <p>
                <strong>Amount Paid:</strong> ₹{total}
              </p>
            </div>
            <p className="text-muted mt-4">Redirecting to menu...</p>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="payment-container py-4">
      <div className="payment-header">
        <h2>Payment</h2>
      </div>

      <div className="payment-content">
        <Card className="payment-card">
          <Card.Body>
            <h5 className="mb-4">Order Summary</h5>
            <div className="order-summary">
              <div className="summary-row">
                <span>Items ({cart.length}):</span>
                <span>₹{total}</span>
              </div>
              <div className="summary-row">
                <span>Delivery Fee:</span>
                <span>FREE</span>
              </div>
              <div className="summary-row">
                <span>Tax:</span>
                <span>₹0</span>
              </div>
              <hr />
              <div className="summary-row total">
                <span>Total Amount:</span>
                <span>₹{total}</span>
              </div>
            </div>

            {tableNumber && (
              <div className="table-info mt-3">
                <small className="text-muted">
                  <strong>Table Number:</strong> {tableNumber}
                </small>
              </div>
            )}
          </Card.Body>
        </Card>

        <Card className="payment-form-card mt-4">
          <Card.Body>
            <h5 className="mb-4">Payment Method</h5>

            <Form onSubmit={handlePayment}>
              <Form.Group className="mb-4">
                <Form.Check
                  type="radio"
                  id="cash"
                  label="Cash on Table"
                  name="paymentMethod"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="payment-option"
                />
                <Form.Check
                  type="radio"
                  id="card"
                  label="Debit / Credit Card"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="payment-option"
                />
                <Form.Check
                  type="radio"
                  id="upi"
                  label="UPI"
                  name="paymentMethod"
                  value="upi"
                  checked={paymentMethod === 'upi'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="payment-option"
                />
              </Form.Group>

              {paymentMethod === 'cash' && (
                <Alert variant="info" className="mt-4 mb-4">
                  <strong>💵 Cash on Table</strong>
                  <p className="mb-0 mt-2">Pay the bill amount directly to our staff when your food is served.</p>
                </Alert>
              )}

              {paymentMethod === 'card' && (
                <>
                  <Form.Group className="mb-3" controlId="cardHolder">
                    <Form.Label className="fw-bold">Card Holder Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="John Doe"
                      value={cardDetails.cardHolder}
                      onChange={(e) =>
                        setCardDetails({
                          ...cardDetails,
                          cardHolder: e.target.value,
                        })
                      }
                      disabled={isProcessing}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="cardNumber">
                    <Form.Label className="fw-bold">Card Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={cardDetails.cardNumber}
                      onChange={(e) =>
                        setCardDetails({
                          ...cardDetails,
                          cardNumber: e.target.value.replace(/\s/g, ''),
                        })
                      }
                      disabled={isProcessing}
                      maxLength="16"
                    />
                  </Form.Group>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <Form.Group controlId="expiryDate">
                        <Form.Label className="fw-bold">Expiry Date</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="MM/YY"
                          value={cardDetails.expiryDate}
                          onChange={(e) =>
                            setCardDetails({
                              ...cardDetails,
                              expiryDate: e.target.value,
                            })
                          }
                          disabled={isProcessing}
                          maxLength="5"
                        />
                      </Form.Group>
                    </div>
                    <div className="col-md-6 mb-3">
                      <Form.Group controlId="cvv">
                        <Form.Label className="fw-bold">CVV</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="123"
                          value={cardDetails.cvv}
                          onChange={(e) =>
                            setCardDetails({
                              ...cardDetails,
                              cvv: e.target.value,
                            })
                          }
                          disabled={isProcessing}
                          maxLength="3"
                        />
                      </Form.Group>
                    </div>
                  </div>
                </>
              )}

              {paymentMethod === 'upi' && (
                <Form.Group className="mb-3" controlId="upiId">
                  <Form.Label className="fw-bold">UPI ID</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="yourname@upi"
                    disabled={isProcessing}
                  />
                </Form.Group>
              )}

              <Alert variant="info" className="mt-4">
                <strong>ℹ️ Demo Mode:</strong> Use any details to test. This is a demo application.
              </Alert>

              <Button
                variant="success"
                size="lg"
                className="w-100 pay-button"
                type="submit"
                disabled={isProcessing}
              >
                {isProcessing ? '⏳ Processing...' : `🚀 Pay ₹${total}`}
              </Button>

              <Button
                variant="outline-secondary"
                className="w-100 mt-3"
                onClick={() => navigate('/cart')}
                disabled={isProcessing}
              >
                ← Back to Cart
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}

export default Payment;
import React, { useState } from 'react';
import { Container, Button, Alert } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { total, table } = location.state || { total: 0, table: '' };
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = () => {
    setPaymentSuccess(true);
    setTimeout(() => {
      setPaymentSuccess(false);
      navigate('/menu', { state: { cart: [], total: 0, table: '' } });
    }, 3000);
  };

  return (
    <Container className="mt-5 text-center">
      <h2>Payment</h2>
      <p>Table {table}</p>
      <h4>Total: ₹{total}</h4>
      {paymentSuccess && <Alert variant="success" className="mt-3">Payment Successful!</Alert>}
      <Button variant="success" onClick={handlePayment}>Pay Now</Button>
    </Container>
  );
}

export default Payment;
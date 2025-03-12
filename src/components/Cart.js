import React, { useState } from 'react';
import { Container, Button, ListGroup } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

function Cart() {
  const location = useLocation();
  const { cart: initialCart, table } = location.state || { cart: [], table: '' };
  const [cart, setCart] = useState(initialCart);
  
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  return (
    <Container className="mt-5">
      <h2>Cart</h2>
      <p>Table: {table}</p>
      <ListGroup>
        {cart.map((item, index) => (
          <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
            {item.name} - ₹{item.price}
            <Button variant="danger" size="sm" onClick={() => removeFromCart(index)}>Delete</Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <h4>Total: ₹{total}</h4>
      <Link to="/payment" state={{ total, table }}><Button className="mt-3">Proceed to Payment</Button></Link>
    </Container>
  );
}

export default Cart;

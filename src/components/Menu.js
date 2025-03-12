import React, { useState } from 'react';
import { Container, Card, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const foodItems = [
  { id: 1, name: 'Salad', price: 100, image: '/images/salad.jpg' },
  { id: 2, name: 'Grilled Chicken', price: 250, image: '/images/grilled_chicken.jpg' },
  { id: 3, name: 'Smoothie', price: 150, image: '/images/smoothie.jpg' }
];

function Menu() {
  const [cart, setCart] = useState([]);
  const [table, setTable] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState('');

  const addToCart = (item) => {
    if (!table) {
      setNotification("Please select a table number first!");
      return;
    }
    setCart([...cart, item]);
    setNotification(`${item.name} added to cart!`);
    setTimeout(() => setNotification(''), 3000);
  };

  const filteredItems = foodItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="mt-5">
      <h2>Menu</h2>
      <Form.Group controlId="table">
        <Form.Label>Select Table Number</Form.Label>
        <Form.Control type="number" placeholder="Enter table number" onChange={(e) => setTable(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="search" className="mt-3">
        <Form.Control 
          type="text" 
          placeholder="Search food items..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>
      {notification && <Alert variant="success" className="mt-3">{notification}</Alert>}
      <Row className="mt-3">
        {filteredItems.map(item => (
          <Col key={item.id} sm={12} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={item.image} alt={item.name} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>Price: ₹{item.price}</Card.Text>
                <Button onClick={() => addToCart(item)}>Add to Cart</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Link to="/cart" state={{ cart, table }}><Button className="mt-3">Go to Cart</Button></Link>
    </Container>
  );
}

export default Menu;

import React, { useState, useContext } from 'react';
import { Container, Card, Button, Form, Row, Col, Alert, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { foodItems } from '../../data/foodItems';
import './Menu.css';

function Menu() {
  const navigate = useNavigate();
  const { addToCart, cart, tableNumber, setTableNumber } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [notification, setNotification] = useState('');

  const categories = ['All', ...new Set(foodItems.map(item => item.category))];

  const filteredItems = foodItems.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  const handleAddToCart = (item) => {
    if (!tableNumber) {
      setNotification('Please select a table number first!');
      setTimeout(() => setNotification(''), 3000);
      return;
    }
    addToCart(item);
    setNotification(`${item.name} added to cart!`);
    setTimeout(() => setNotification(''), 2000);
  };

  return (
    <Container fluid className="menu-container py-4">
      <Container>
        <div className="menu-header mb-5">
          <h2 className="mb-4">Our Menu</h2>

          {/* Table Selection Grid */}
          <Form.Group controlId="table" className="mb-4">
            <Form.Label className="fw-bold table-label">Select Your Table</Form.Label>
            <div className="table-selection-grid">
              {Array.from({ length: 25 }, (_, i) => i + 1).map(tableNum => (
                <button
                  key={tableNum}
                  className={`table-button ${tableNumber === String(tableNum) ? 'active' : ''}`}
                  onClick={() => setTableNumber(String(tableNum))}
                  title={`Table ${tableNum}`}
                >
                  <span className="table-symbol">🪑</span>
                  <span className="table-number">{tableNum}</span>
                </button>
              ))}
            </div>
            {tableNumber && (
              <div className="table-selected-badge">
                ✓ Table {tableNumber} Selected
              </div>
            )}
          </Form.Group>

          {/* Search */}
          <Form.Group controlId="search" className="mb-4">
            <Form.Label className="fw-bold">Search Food</Form.Label>
            <Form.Control
              type="text"
              placeholder="Search food items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </Form.Group>

          {/* Category Filter */}
          <Form.Group controlId="category" className="mb-4">
            <Form.Label className="fw-bold">Filter by Category</Form.Label>
            <div className="category-buttons">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'dark' : 'outline-dark'}
                  size="sm"
                  className="me-2 mb-2"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </Form.Group>

          {/* Notification */}
          {notification && (
            <Alert variant="success" className="notification">
              {notification}
            </Alert>
          )}

          {/* Cart Badge */}
          {cart.length > 0 && (
            <div className="cart-badge mb-3">
              <Badge bg="danger" className="fs-6">
                Cart: {cart.length} items | Total: ₹{cart.reduce((sum, item) => sum + item.price, 0)}
              </Badge>
            </div>
          )}
        </div>

        {/* Food Items Grid */}
        <Row>
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <Col key={item.id} sm={12} md={6} lg={4} className="mb-4">
                <Card className="food-card h-100">
                  <div className="food-image-container">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="food-image"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23e0e0e0" width="100" height="100"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" fill="%23999" font-size="12"%3EFood Image%3C/text%3E%3C/svg%3E';
                      }}
                    />
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="fw-bold">{item.name}</Card.Title>
                    <Card.Text className="text-muted small">{item.description}</Card.Text>
                    <div className="mt-auto">
                      <div className="price-section mb-3">
                        <span className="price">₹{item.price}</span>
                        <Badge bg="info" className="ms-2">{item.category}</Badge>
                      </div>
                      <Button
                        onClick={() => handleAddToCart(item)}
                        className="w-100 add-to-cart-btn"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col xs={12}>
              <Alert variant="warning" className="text-center">
                No food items found. Try a different search or category.
              </Alert>
            </Col>
          )}
        </Row>

        {/* Action Buttons */}
        {cart.length > 0 && (
          <div className="action-buttons mt-5 text-center">
            <div className="alert alert-info">
              <strong>💡 Tip:</strong> Your cart has {cart.length} items. Click the cart icon in the navbar to view and checkout!
            </div>
          </div>
        )}
      </Container>
    </Container>
  );
}

export default Menu;

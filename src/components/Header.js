import React, { useContext, useEffect, useState } from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './Header.css';

function Header() {
  const { cart, user, setUser } = useContext(CartContext);
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState(user);

  useEffect(() => {
    // Check localStorage on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setAuthUser(userData);
        setUser(userData);
      } catch (e) {
        console.error('Error parsing user data');
      }
    }
  }, [setUser]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setAuthUser(null);
    setUser(null);
    navigate('/');
  };

  return (
    <Navbar expand="lg" sticky="top" className="navbar-custom">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-text">
          <img 
            src="/images/logo.png" 
            alt="DineDirect Logo" 
            className="logo-image"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="40" height="40"%3E%3Crect fill="%23fff" width="40" height="40" rx="5"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" fill="%23333" font-size="10" font-weight="bold"%3EDine%3C/text%3E%3C/svg%3E';
            }}
          /> 
          DineDirect
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {authUser ? (
              <>
                <Nav.Link as={Link} to="/menu" className="nav-link-custom">
                  Menu
                </Nav.Link>
                <Nav.Link as={Link} to="/cart" className="nav-link-custom cart-link">
                  <span>Cart</span>
                  {cart.length > 0 && <Badge bg="danger" className="cart-badge">{cart.length}</Badge>}
                </Nav.Link>
                <Nav.Link className="nav-link-custom user-name">
                  {authUser.name || authUser.email}
                </Nav.Link>
                <Nav.Link
                  onClick={handleLogout}
                  className="nav-link-custom logout-btn"
                  style={{ cursor: 'pointer' }}
                >
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="nav-link-custom">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register" className="nav-link-custom">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

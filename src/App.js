import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Register from './components/Register';
import Menu from './components/Menu';
import Cart from './components/Cart';
import Payment from './components/Payment';

function App() {
  const isAuthenticated = !!localStorage.getItem("user");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/menu" element={isAuthenticated ? <Menu /> : <Navigate to="/login" />} />
        <Route path="/cart" element={isAuthenticated ? <Cart /> : <Navigate to="/login" />} />
        <Route path="/payment" element={isAuthenticated ? <Payment /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
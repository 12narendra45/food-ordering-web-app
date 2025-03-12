import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';

function Register() {
  return (
    <Container className="mt-5">
      <h2>Register</h2>
      <Form>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter name" />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" />
        </Form.Group>
        <Button variant="success" className="mt-3" type="submit">Register</Button>
      </Form>
    </Container>
  );
}
export default Register;
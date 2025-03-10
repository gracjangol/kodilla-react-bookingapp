import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <Navbar bg="primary" expand="lg" variant="dark" className="mb-4 rounded">
    <Container className="d-flex justify-content-between">
      <Navbar.Brand>Waiter App</Navbar.Brand>
      <Nav>
        <Nav.Link as={NavLink} to="/">Home</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
);

export default Header;
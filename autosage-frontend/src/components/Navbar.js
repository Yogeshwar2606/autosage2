import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavigationBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">🚗 AutoSage</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="text-light">Home</Nav.Link>
            <Nav.Link as={Link} to="/vehicles" className="text-light">Vehicles</Nav.Link>
          </Nav>

          {/* 📌 Styled Buttons for Features */}
          <div className="d-flex gap-2">
            <Link to="/chatbot">
              <Button variant="primary" className="fw-bold">💬 Chatbot</Button>
            </Link>

            <Link to="/bank-loans">
              <Button variant="success" className="fw-bold">🏦 Bank Loans</Button>
            </Link>

            <Link to="/recommendations">
              <Button variant="warning" className="fw-bold text-dark">🚀 Get Recommendations</Button>
            </Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;

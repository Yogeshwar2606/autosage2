import { Archive, Car, CarFront, House, Landmark, MessageCircle } from "lucide-react";
import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavigationBar() {
  return (
    <Navbar style={{
      background: "rgb(2,0,36)",
background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(147,147,209,1) 0%, rgba(0,212,255,1) 100%)"
    }}>
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4"><Car style={{
          width: "40px",
          height: "70px",
          marginBottom: "5px"
        }} /> AutoSage</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="text-light"><House />Home</Nav.Link>
            <Nav.Link as={Link} to="/vehicles" className="text-light"><CarFront />Vehicles</Nav.Link>
          </Nav>

          
          <div className="d-flex gap-2">
            <Link to="/chatbot">
              <Button variant="primary" className=""><MessageCircle /> Chatbot</Button>
            </Link>

            <Link to="/bank-loans">
              <Button variant="success" className=""><Landmark /> Bank Loans</Button>
            </Link>

            <Link to="/recommendations">
              <Button variant="warning" className=""><Archive /> Get Recommendations</Button>
            </Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;

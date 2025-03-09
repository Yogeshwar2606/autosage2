import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

function Home() {
  const [featuredVehicles, setFeaturedVehicles] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/vehicles/featured")
      .then((response) => {
        setFeaturedVehicles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching featured vehicles:", error);
      });
  }, []);

  return (
    <Container>
      <h1>
  <span role="img" aria-label="car">
    🚗
  </span>{" "}
  Welcome to AutoSage
</h1>
      <p className="text-center">Find and compare the best vehicles.</p>

      {/* Display Featured Vehicles */}
      <h2 className="my-4">Featured Vehicles</h2>
      <Row>
        {featuredVehicles.map((vehicle) => (
          <Col key={vehicle._id} md={4} className="mb-4">
            <Card className="shadow-lg rounded">
              <Card.Img variant="top" src={vehicle.imageUrl} alt={vehicle.name} className="vehicle-img" />
              <Card.Body>
                <Card.Title className="text-center">{vehicle.name}</Card.Title>
                <Card.Text className="text-center">
                  <strong>Brand:</strong> {vehicle.brand} <br />
                  <strong>Price:</strong> ₹{vehicle.price} <br />
                  <strong>Fuel Type:</strong> {vehicle.fuelType}
                </Card.Text>
                <div className="d-flex justify-content-center">
                  <Link to={`/vehicles/${vehicle._id}`}>
                    <Button variant="primary">View Details</Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="text-center mt-4">
        <Link to="/vehicles">
          <Button variant="success">Browse All Vehicles</Button>
        </Link>
      </div>
    </Container>
  );
}

export default Home;

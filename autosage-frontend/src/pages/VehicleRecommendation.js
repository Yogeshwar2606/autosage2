import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";

const VehicleRecommendation = () => {
  const [vehicles, setVehicles] = useState([]);
  const [budget, setBudget] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [brand, setBrand] = useState("");
  const [features, setFeatures] = useState([]);
  const [recommendedVehicles, setRecommendedVehicles] = useState([]);


  useEffect(() => {
    axios
      .get("http://localhost:5000/api/vehicles")
      .then((res) => setVehicles(res.data))
      .catch((error) => console.error("Error fetching vehicles:", error));
  }, []);

  
  const recommendVehicles = () => {
    if (!budget) {
      alert("Please enter your budget!");
      return;
    }

    let filteredVehicles = vehicles.filter((vehicle) => vehicle.price <= budget);

    if (fuelType) {
      filteredVehicles = filteredVehicles.filter((vehicle) => vehicle.fuelType === fuelType);
    }

    if (brand) {
      filteredVehicles = filteredVehicles.filter((vehicle) => vehicle.brand.toLowerCase() === brand.toLowerCase());
    }

    if (features.length > 0) {
      filteredVehicles = filteredVehicles.filter((vehicle) =>
        features.every((feature) => vehicle.features.includes(feature))
      );
    }

   
    filteredVehicles.sort((a, b) => Math.abs(a.price - budget) - Math.abs(b.price - budget));

    
    setRecommendedVehicles(filteredVehicles.slice(0, 5));
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center">🚀 AI-Powered Vehicle Recommendation</h2>
      <Card className="p-4 shadow-lg">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>💰 Budget (₹)</Form.Label>
            <Form.Control type="number" value={budget} onChange={(e) => setBudget(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>⛽ Fuel Type</Form.Label>
            <Form.Select value={fuelType} onChange={(e) => setFuelType(e.target.value)}>
              <option value="">Any</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>🏢 Brand</Form.Label>
            <Form.Control type="text" placeholder="Enter brand (optional)" value={brand} onChange={(e) => setBrand(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>⚙️ Features (Comma Separated)</Form.Label>
            <Form.Control type="text" placeholder="e.g., ABS, Airbags" 
              onChange={(e) => setFeatures(e.target.value.split(",").map((f) => f.trim()))}
            />
          </Form.Group>

          <Button variant="primary" onClick={recommendVehicles}>🔍 Find Best Vehicles</Button>
        </Form>
      </Card>

      {/* 📌 Display Recommended Vehicles */}
      {recommendedVehicles.length > 0 && (
        <div className="mt-4">
          <h3>🔥 Top Recommendations</h3>
          <Row>
            {recommendedVehicles.map((vehicle) => (
              <Col key={vehicle._id} md={4} className="mb-4">
                <Card className="shadow-lg">
                  <Card.Img variant="top" src={vehicle.imageUrl} alt={vehicle.name} />
                  <Card.Body>
                    <Card.Title>{vehicle.name}</Card.Title>
                    <Card.Text>
                      <strong>Brand:</strong> {vehicle.brand} <br />
                      <strong>Price:</strong> ₹{vehicle.price} <br />
                      <strong>Fuel Type:</strong> {vehicle.fuelType}
                    </Card.Text>
                    <Button variant="success" href={`/vehicles/${vehicle._id}`}>View Details</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </Container>
  );
};

export default VehicleRecommendation;

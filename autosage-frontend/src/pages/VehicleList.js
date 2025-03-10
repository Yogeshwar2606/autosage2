import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Card, Button, Container, Row, Col, Form } from "react-bootstrap";

function VehicleList({ selectedVehicles, setSelectedVehicles }) {
  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("");

  const navigate = useNavigate(); 

  const fetchVehicles = useCallback(async () => {
    try {
      let query = `http://localhost:5000/api/vehicles?search=${search.trim()}`;
      if (type) query += `&type=${type}`;
      if (fuelType) query += `&fuelType=${fuelType}`;
      if (minPrice) query += `&minPrice=${minPrice}`;
      if (maxPrice) query += `&maxPrice=${maxPrice}`;

      const response = await axios.get(query);
      let sortedVehicles = response.data;

      if (sortBy === "priceLowToHigh") {
        sortedVehicles.sort((a, b) => a.price - b.price);
      } else if (sortBy === "priceHighToLow") {
        sortedVehicles.sort((a, b) => b.price - a.price);
      } else if (sortBy === "newestFirst") {
        sortedVehicles.sort((a, b) => b.launchYear - a.launchYear);
      }

      setVehicles(sortedVehicles);
    } catch (error) {
      console.error("Error fetching vehicle data:", error);
    }
  }, [search, type, fuelType, minPrice, maxPrice, sortBy]);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const handleSelectVehicle = (vehicle) => {
    setSelectedVehicles((prev) => {
      if (prev.some((v) => v._id === vehicle._id)) {
        return prev.filter((v) => v._id !== vehicle._id);
      } else {
        return [...prev, vehicle];
      }
    });
  };

  return (
    <Container>
      <h1 className="my-4 text-center">Search, Filter & Sort Vehicles</h1>

      <Form className="mb-4">
        <Row className="align-items-center">
          <Col md={3}>
            <Form.Control
              type="text"
              placeholder="Search by name or brand"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
          <Col md={2}>
            <Form.Select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">All Types</option>
              <option value="Car">Car</option>
              <option value="Bike">Bike</option>
              <option value="Scooter">Scooter</option>
            </Form.Select>
          </Col>
          <Col md={2}>
            <Form.Select value={fuelType} onChange={(e) => setFuelType(e.target.value)}>
              <option value="">All Fuel Types</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </Form.Select>
          </Col>
          <Col md={2}>
            <Form.Control
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </Col>
          <Col md={2}>
            <Form.Control
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </Col>
          <Col md={3} className="mt-2">
            <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="">Sort By</option>
              <option value="priceLowToHigh">Price: Low to High</option>
              <option value="priceHighToLow">Price: High to Low</option>
              <option value="newestFirst">Newest First</option>
            </Form.Select>
          </Col>
        </Row>
      </Form>

      <Row>
        {vehicles.length > 0 ? (
          vehicles.map((vehicle) => (
            <Col key={vehicle._id} md={4} className="mb-4">
              <Card className="shadow-lg rounded">
                <Card.Img
                  variant="top"
                  src={vehicle.imageUrl}
                  alt={vehicle.name}
                  className="vehicle-img img-fluid"
                  onError={(e) => (e.target.src = "https://via.placeholder.com/200")}
                />
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
                    <Button
                      variant={selectedVehicles.some((v) => v._id === vehicle._id) ? "danger" : "secondary"}
                      className="ms-2"
                      onClick={() => handleSelectVehicle(vehicle)}
                    >
                      {selectedVehicles.some((v) => v._id === vehicle._id) ? "Remove" : "Compare"}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center">No vehicles found.</p>
        )}
      </Row>

      
      {selectedVehicles.length > 1 && (
        <div className="text-center mt-4">
          <Button variant="success" onClick={() => navigate("/compare")}>
            Compare {selectedVehicles.length} Vehicles
          </Button>
        </div>
      )}
    </Container>
  );
}

export default VehicleList;

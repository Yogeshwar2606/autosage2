import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import Reviews from "../components/Reviews"; 
import { ChartNoAxesCombined, HandCoins } from "lucide-react";

function VehicleDetails() {
  const { id } = useParams(); 
  const [vehicle, setVehicle] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("Fetching vehicle with ID:", id);

    if (!id || id.length !== 24) {
      setError("Invalid vehicle ID");
      return;
    }

    const fetchVehicleDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/vehicles/${id}`);
        setVehicle(response.data);
      } catch (error) {
        console.error("Error fetching vehicle details:", error);
        setError("Vehicle not found or server error.");
      }
    };

    fetchVehicleDetails();
  }, [id]);

  if (error) {
    return <h2 className="text-center mt-4 text-danger">{error}</h2>;
  }

  if (!vehicle) {
    return <h2 className="text-center mt-4">Loading...</h2>;
  }

  return (
    <Container style={{
      background: "rgb(2,0,36)",
background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(85,85,181,1) 0%, rgba(0,212,255,1) 100%)"
    }} className="mt-5">
      <Row>
        <Col md={6}>
          <Card.Img variant="top" src={vehicle.imageUrl} alt={vehicle.name} className="img-fluid rounded" />
        </Col>
        <Col md={6}>
          <h2>{vehicle.name}</h2>
          <p><strong>Brand:</strong> {vehicle.brand}</p>
          <p><strong>Type:</strong> {vehicle.type}</p>
          <p><strong>Price:</strong> ₹{vehicle.price}</p>
          <p><strong>Fuel Type:</strong> {vehicle.fuelType}</p>
          <p><strong>Mileage:</strong> {vehicle.mileage} kmpl</p>
          <p><strong>Engine:</strong> {vehicle.engine}</p>
          <p><strong>Transmission:</strong> {vehicle.transmission}</p>
          <p><strong>Features:</strong> {vehicle.features.join(", ")}</p>
          <p><strong>Launch Year:</strong> {vehicle.launchYear}</p>

          
          <Link to={`/emi-calculator?price=${vehicle.price}`}>
              <Button variant="success" className="mt-3 me-2"><HandCoins /> Calculate EMI</Button>
          </Link>
          <Link to="/resale-estimator">
            <Button variant="warning" className="mt-3"><ChartNoAxesCombined /> Check Resale Value</Button>
          </Link>
        </Col>
      </Row>

      
      <Reviews vehicleId={id} />  
    </Container>
  );
}

export default VehicleDetails;
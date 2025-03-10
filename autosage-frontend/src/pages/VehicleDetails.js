import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import Reviews from "../components/Reviews";

function VehicleDetails() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
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

  
  const shareOnWhatsApp = () => {
    const message = `🚗 Check out this vehicle on AutoSage! 🚀
    
    *Name:* ${vehicle.name}
    *Brand:* ${vehicle.brand}
    *Price:* ₹${vehicle.price}
    *Fuel Type:* ${vehicle.fuelType}
    *Mileage:* ${vehicle.mileage} kmpl
    *Engine:* ${vehicle.engine}
  
    🔗 View More: http://localhost:3000/vehicles/${vehicle._id}
  
    🖼️ Vehicle Image: ${vehicle.imageUrl}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://api.whatsapp.com/send?text=${encodedMessage}`, "_blank");
  };

  
  const shareViaGmail = () => {
    if (!vehicle) return; 

    const subject = `🚗 Check out this vehicle: ${vehicle.name}`;
    const body = `Hey, I found this awesome vehicle on AutoSage! 🚀\n\n
    Name: ${vehicle.name}\n
    Brand: ${vehicle.brand}\n
    Price: ₹${vehicle.price}\n
    Fuel Type: ${vehicle.fuelType}\n
    Mileage: ${vehicle.mileage} kmpl\n
    Engine: ${vehicle.engine}\n\n
    🔗 View More: http://localhost:3000/vehicles/${vehicle._id}\n\n
    🖼️ Vehicle Image: ${vehicle.imageUrl}`;

    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailLink, "_blank");
  };



  return (
    <Container className="mt-5">
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
            <Button variant="success" className="mt-3">💰 Calculate EMI</Button>
          </Link>
          <Link to="/resale-estimator">
            <Button variant="warning" className="mt-3">📉 Check Resale Value</Button>
          </Link>

          
          <div className="mt-3">
            <Button variant="success" className="me-2" onClick={shareOnWhatsApp}>
              📲 Share on WhatsApp
            </Button>
            <Button variant="primary" onClick={shareViaGmail}>
              📧 Share via Email
            </Button>

          </div>

        </Col>
      </Row>
      <Reviews vehicleId={id}></Reviews>
    </Container>
  );
}

export default VehicleDetails;

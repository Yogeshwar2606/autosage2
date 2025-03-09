import React from "react";
import { Container, Table, Alert } from "react-bootstrap";

function CompareVehicles({ selectedVehicles }) {
  return (
    <Container>
      <h1 className="my-4 text-center">Compare Vehicles</h1>
      {selectedVehicles.length < 2 ? (
        <Alert variant="warning">Select at least two vehicles to compare.</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Feature</th>
              {selectedVehicles.map((vehicle) => (
                <th key={vehicle._id}>{vehicle.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Brand</td>
              {selectedVehicles.map((vehicle) => (
                <td key={vehicle._id}>{vehicle.brand}</td>
              ))}
            </tr>
            <tr>
              <td>Price</td>
              {selectedVehicles.map((vehicle) => (
                <td key={vehicle._id}>₹{vehicle.price}</td>
              ))}
            </tr>
            <tr>
              <td>Fuel Type</td>
              {selectedVehicles.map((vehicle) => (
                <td key={vehicle._id}>{vehicle.fuelType}</td>
              ))}
            </tr>
            <tr>
              <td>Mileage</td>
              {selectedVehicles.map((vehicle) => (
                <td key={vehicle._id}>{vehicle.mileage} km/l</td>
              ))}
            </tr>
            <tr>
              <td>Engine</td>
              {selectedVehicles.map((vehicle) => (
                <td key={vehicle._id}>{vehicle.engine}</td>
              ))}
            </tr>
            <tr>
              <td>Transmission</td>
              {selectedVehicles.map((vehicle) => (
                <td key={vehicle._id}>{vehicle.transmission}</td>
              ))}
            </tr>
            <tr>
              <td>Launch Year</td>
              {selectedVehicles.map((vehicle) => (
                <td key={vehicle._id}>{vehicle.launchYear}</td>
              ))}
            </tr>
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default CompareVehicles;

import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const ResaleValueEstimator = () => {
  const [originalPrice, setOriginalPrice] = useState("");
  const [age, setAge] = useState("");
  const [vehicleType, setVehicleType] = useState("Car");
  const [condition, setCondition] = useState("Good");
  const [resaleValue, setResaleValue] = useState(null);
  const [chartData, setChartData] = useState(null);

  // 📌 Depreciation rates for different vehicles
  const DEPRECIATION_RATES = {
    Car: 0.15,
    Bike: 0.18,
    Scooter: 0.20,
  };

  // 📌 Condition adjustment factors
  const CONDITION_ADJUSTMENT = {
    Excellent: 1.05,
    Good: 1.0,
    Fair: 0.90,
    Poor: 0.80,
  };

  const calculateResaleValue = () => {
    if (!originalPrice || !age) {
      alert("Please enter all fields!");
      return;
    }

    const depreciationRate = DEPRECIATION_RATES[vehicleType];
    const conditionFactor = CONDITION_ADJUSTMENT[condition];

    // 📌 Formula to calculate resale value
    const value = originalPrice * Math.pow(1 - depreciationRate, age) * conditionFactor;
    setResaleValue(value.toFixed(2));

    // 📌 Generate chart data (Depreciation over 10 years)
    const years = Array.from({ length: 11 }, (_, i) => i);
    const values = years.map((y) => originalPrice * Math.pow(1 - depreciationRate, y));

    setChartData({
      labels: years.map((y) => `${y} yr`),
      datasets: [
        {
          label: "Estimated Value (₹)",
          data: values,
          borderColor: "red",
          backgroundColor: "rgba(255, 0, 0, 0.2)",
          fill: true,
          tension: 0.4,
        },
      ],
    });
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">🚗 Resale Value Estimator</h2>
      <Card className="p-4 shadow-lg">
        <Form.Group className="mb-3">
          <Form.Label>Original Price (₹)</Form.Label>
          <Form.Control type="number" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Vehicle Age (Years)</Form.Label>
          <Form.Control type="number" value={age} onChange={(e) => setAge(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Vehicle Type</Form.Label>
          <Form.Select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
            <option value="Car">Car</option>
            <option value="Bike">Bike</option>
            <option value="Scooter">Scooter</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Vehicle Condition</Form.Label>
          <Form.Select value={condition} onChange={(e) => setCondition(e.target.value)}>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Poor">Poor</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" onClick={calculateResaleValue}>Estimate Value</Button>

        {resaleValue && (
          <Card className="mt-4 p-3 text-center">
            <h4>🔹 Estimated Resale Value: ₹{resaleValue}</h4>
          </Card>
        )}
      </Card>

      {chartData && (
        <div className="mt-4">
          <h5>📊 Depreciation Over 10 Years</h5>
          <Line
            data={chartData}
            options={{
              plugins: {
                legend: { labels: { color: "black", font: { size: 14 } } },
              },
              scales: {
                x: { ticks: { color: "blue", font: { size: 14 } } }, // X-axis labels color
                y: { ticks: { color: "green", font: { size: 14 } } }, // Y-axis labels color
              },
            }}
          />
        </div>
      )}
    </Container>
  );
};

export default ResaleValueEstimator;

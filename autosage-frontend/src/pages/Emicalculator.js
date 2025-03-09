import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const EMICalculator = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const vehiclePrice = queryParams.get("price") || ""; // Get price from URL

  const [price, setPrice] = useState(vehiclePrice);
  const [downPayment, setDownPayment] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [interestRate, setInterestRate] = useState(8.5); // Default 8.5% interest
  const [emi, setEMI] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    setPrice(vehiclePrice); // Auto-fill price when component mounts
  }, [vehiclePrice]);

  const calculateEMI = () => {
    if (!price || !downPayment || !loanTerm || !interestRate) {
      alert("Please fill in all fields!");
      return;
    }

    const loanAmount = price - downPayment;
    const monthlyInterest = interestRate / 12 / 100;
    const totalMonths = loanTerm * 12;
    const emiValue =
      (loanAmount * monthlyInterest * Math.pow(1 + monthlyInterest, totalMonths)) /
      (Math.pow(1 + monthlyInterest, totalMonths) - 1);

    setEMI(emiValue.toFixed(2));

    // 📊 Pie Chart Data
    setChartData({
      labels: ["Principal", "Total Interest"],
      datasets: [
        {
          data: [loanAmount, emiValue * totalMonths - loanAmount],
          backgroundColor: ["#4CAF50", "#FF5733"],
        },
      ],
    });
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">💰 EMI & Loan Calculator</h2>
      <Card className="p-4 shadow-lg">
        <Form.Group className="mb-3">
          <Form.Label>Vehicle Price (₹)</Form.Label>
          <Form.Control type="number" value={price} readOnly />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Down Payment (₹)</Form.Label>
          <Form.Control type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Loan Term (Years)</Form.Label>
          <Form.Control type="number" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Interest Rate (%)</Form.Label>
          <Form.Control type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />
        </Form.Group>

        <Button variant="primary" onClick={calculateEMI}>Calculate EMI</Button>

        {emi && (
          <Card className="mt-4 p-3 text-center">
            <h4>📌 Monthly EMI: ₹{emi}</h4>
          </Card>
        )}
      </Card>

      {chartData && (
        <div className="mt-4">
          <h5>📊 Loan Breakdown</h5>
          <Pie data={chartData} />
        </div>
      )}
    </Container>
  );
};

export default EMICalculator;

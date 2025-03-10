import React, { useState } from "react";
import { Container, Table, Card, Button, Form } from "react-bootstrap";

const bankLoanOffers = [
  { bank: "HDFC Bank", interestRate: 8.5, maxLoan: 5000000, minTenure: 12, maxTenure: 84 },
  { bank: "SBI Bank", interestRate: 9.0, maxLoan: 3000000, minTenure: 12, maxTenure: 72 },
  { bank: "ICICI Bank", interestRate: 8.2, maxLoan: 4000000, minTenure: 12, maxTenure: 84 },
  { bank: "Axis Bank", interestRate: 8.7, maxLoan: 3500000, minTenure: 12, maxTenure: 60 },
];

const BankLoans = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [tenure, setTenure] = useState("");
  const [selectedBank, setSelectedBank] = useState(null);
  const [emi, setEmi] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);

 
  const calculateEMI = (amount, rate, months) => {
    const monthlyRate = rate / (12 * 100);
    return ((amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)).toFixed(2);
  };

  const handleCalculate = (bank) => {
    if (!loanAmount || !tenure) {
      alert("Please enter loan amount and tenure.");
      return;
    }
    if (loanAmount > bank.maxLoan) {
      alert(`Maximum loan limit for ${bank.bank} is ₹${bank.maxLoan.toLocaleString()}`);
      return;
    }
    if (tenure < bank.minTenure || tenure > bank.maxTenure) {
      alert(`Loan tenure for ${bank.bank} should be between ${bank.minTenure} - ${bank.maxTenure} months.`);
      return;
    }

    const calculatedEMI = calculateEMI(loanAmount, bank.interestRate, tenure);
    const totalPaid = (calculatedEMI * tenure).toFixed(2);
    const totalInterestPaid = (totalPaid - loanAmount).toFixed(2);

    setSelectedBank(bank);
    setEmi(calculatedEMI);
    setTotalPayment(totalPaid);
    setTotalInterest(totalInterestPaid);
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">🏦 Bank Loan Offers</h2>

     
      <Card className="p-4 shadow-lg mb-4">
        <Form.Group className="mb-3">
          <Form.Label>Enter Loan Amount (₹)</Form.Label>
          <Form.Control type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Enter Loan Tenure (Months)</Form.Label>
          <Form.Control type="number" value={tenure} onChange={(e) => setTenure(e.target.value)} />
        </Form.Group>
      </Card>

      
      <Card className="p-4 shadow-lg">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Bank Name</th>
              <th>Interest Rate (%)</th>
              <th>Max Loan Amount (₹)</th>
              <th>Loan Tenure (Months)</th>
              <th>Calculate EMI</th>
            </tr>
          </thead>
          <tbody>
            {bankLoanOffers.map((bank, index) => (
              <tr key={index}>
                <td>{bank.bank}</td>
                <td>{bank.interestRate}%</td>
                <td>₹{bank.maxLoan.toLocaleString()}</td>
                <td>{bank.minTenure} - {bank.maxTenure}</td>
                <td>
                  <Button variant="primary" onClick={() => handleCalculate(bank)}>Calculate EMI</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      
      {selectedBank && emi && (
        <Card className="mt-4 p-3 text-center bg-success text-white">
          <h4>✅ Estimated EMI for {selectedBank.bank}: ₹{emi} per month</h4>
          <h5>💰 Total Payment to Bank: ₹{totalPayment}</h5>
          <h6>📉 Total Interest Paid: ₹{totalInterest}</h6>
        </Card>
      )}
    </Container>
  );
};

export default BankLoans;

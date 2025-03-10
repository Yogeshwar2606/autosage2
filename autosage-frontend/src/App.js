import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import VehicleList from "./pages/VehicleList";
import VehicleDetails from "./pages/VehicleDetails";
import NavigationBar from "./components/Navbar";
import Compare from "./pages/compare";
import GeminiChat from "./pages/GeminiChat";
import EMICalculator from "./pages/Emicalculator";
import ResaleValueEstimator from "./pages/ResaleValueEstimator";
import BankLoans from "./pages/BankLoans";
import VehicleRecommendation from "./pages/VehicleRecommendation";
function App() {
  
  const [selectedVehicles, setSelectedVehicles] = useState([]);

  return (
    <Router>
      <NavigationBar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/vehicles" 
          element={<VehicleList selectedVehicles={selectedVehicles} setSelectedVehicles={setSelectedVehicles} />} 
        />
        <Route path="/vehicles/:id" element={<VehicleDetails />} />
        <Route path="/compare" element={<Compare selectedVehicles={selectedVehicles} />} />
        <Route path="/chatbot" element={<GeminiChat />} />
        <Route path="/emi-calculator" element={<EMICalculator />} />
        <Route path="/resale-estimator" element={<ResaleValueEstimator />} />
        <Route path="/bank-loans" element={<BankLoans />} />
        <Route path="/recommendations" element={<VehicleRecommendation />} />
        


      </Routes>
    </Router>
  );
}

export default App;

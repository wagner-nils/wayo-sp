import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Components/StartupPages/LandingPage";
import LoginPage from "./Components/StartupPages/LoginPage";
import Dashboard from "./Components/Dashboard/Dashboard";
import ExpenseTracker from "./Components/Expenses/ExpenseTracker";
import OrderTimeline from "./Components/Orders/OrdersList/OrderTimeline";
import NavBar from "./Components/NavBar";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<><NavBar /><Dashboard /></>} />
        <Route path="/expenses" element={<><NavBar /><ExpenseTracker /></>} />
        <Route path="/orders" element={<><NavBar /><OrderTimeline /></>} />
      </Routes>
    </Router>
  );
}

export default AppRouter;

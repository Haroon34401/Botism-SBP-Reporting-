import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login/Login'; // Import Login from the Login folder
import Signup from './Signup/Signup'; // Updated path for Signup
import ForgotPassword from './ForgotPassword/ForgotPassword'; // Correct path for ForgotPassword
import Dashboard from './components/Dashboard';
import ConfigureBot from './ConfigureBot/ConfigureBot';
import Reporting from './Reporting/Reporting'; // Import Reporting screen
import ReportInsight from './ReportInsight/ReportInsight';
import ReportData from './ReportData/ReportData';  // Correct import for default export
import ReportRaw from './RepRaw/ReportRaw'; // Make sure the path is correct
import { ColorProvider } from './context/ColorContext';


import './App.css';
import ReportSummary from './ReportSummary/ReportSummary';

function App() {
  return (
    <ColorProvider>
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} /> {/* Default route for Login */}
          <Route path="/login" element={<Login />} /> {/* Route for Login */}
          <Route path="/signup" element={<Signup />} /> {/* Updated route for Signup */}
          <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Route for Forgot Password */}
          <Route path="/dashboard" element={<Dashboard />} /> {/* Route for Dashboard */}
          <Route path="/ConfigureBot" element={<ConfigureBot />} /> {/* Route for ConfigureBot */}
          <Route path="/reporting" element={<Reporting />} /> {/* Route for Reporting Screen */}
          <Route path="/ReportSummary" element={<ReportSummary />} />
          <Route path="/ReportInsight" element={<ReportInsight />} />
          <Route path="/ReportData" element={<ReportData />} />
          <Route path="/ReportRaw" element={<ReportRaw />} />

        </Routes>
      </div>
    </Router>
    </ColorProvider>
  );
}

export default App;

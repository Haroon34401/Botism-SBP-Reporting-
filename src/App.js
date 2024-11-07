import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login/Login'; // Import Login from the Login folder
import Signup from './Signup/Signup'; // Updated path for Signup
import ForgotPassword from './ForgotPassword/ForgotPassword'; // Correct path for ForgotPassword
import Dashboard from './components/Dashboard';
import ConfigureBot from './ConfigureBot/ConfigureBot';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} /> {/* Default route for Login */}
          <Route path="/login" element={<Login />} /> {/* Route for Login */}
          <Route path="/signup" element={<Signup />} /> {/* Updated route for Signup */}
          <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Route for Forgot Password */}
          <Route path="/dashboard" element={<Dashboard />} /> {/* Route for Dashboard */}
          <Route path="/ConfigureBot" element={<ConfigureBot />} /> {/* Route for ConfigureBot */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

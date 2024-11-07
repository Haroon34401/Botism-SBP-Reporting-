import React from 'react';
import './Login.css'; // Importing the CSS from the same folder
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import myImage from '../images/robotpic.png'; // Adjusted import path
import logo from '../images/stresslogo.png'; // Adjusted import path





const Login = () => {
  return (
    <div className="login-container">
      {/* Logo at the top left */}
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>

      {/* Project Name at the top left */}
      <div className="project-name">
        <p>Botism</p>
        <p>SBP</p>
        <p>Reporting</p>
      </div>

      {/* Wrapper for login form and image component */}
      <div className="login-wrapper">
        {/* Main login form component */}
        <div className="login-box">
          <h2>Login</h2>
          
          <div className="input-group">
            <label style={{ display: 'none' }}>Email ID</label> {/* Hiding the label */}
            <input type="email" placeholder="Enter your email" />
          </div>

          <div className="input-group">
            <label style={{ display: 'none' }}>Bank ID</label> {/* Hiding the label */}
            <input type="text" placeholder="Enter your bank ID" />
          </div>

          <div className="input-group">
            <label style={{ display: 'none' }}>Password</label> {/* Hiding the label */}
            <input type="password" placeholder="Enter your password" />
          </div>

          <button className="button">Login</button>
          <div className="footer">
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            <p><Link to="/forgot-password">Forgot Password?</Link></p>
          </div>
        </div>

        {/* Image component */}
        <div className="image-box">
          <img src={myImage} alt="Illustration" />
        </div>
      </div>
    </div>
  );
};

export default Login;

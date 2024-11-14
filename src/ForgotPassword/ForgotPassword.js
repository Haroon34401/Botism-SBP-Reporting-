import React, { useState } from 'react';
import './ForgotPassword.css'; // Ensure this matches the file structure



const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(`Password reset link sent to ${email}`);
    setEmail(''); // Clear the email field
  };

  return (
    <div className="forgot-password-container">
      <div className="project-name">
        <p>Botism</p>
        <p>SBP</p>
        <p>Reporting</p>
      </div>

      <div className="forgot-password-box">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button className="button" type="submit">Send Reset Link</button>
        </form>
        {message && <p>{message}</p>} {/* Display success message */}
        <div className="footer">
          <p>Remembered your password? <a href="/login">Login</a></p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

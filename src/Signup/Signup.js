import React from 'react';
import './Signup.css'; // Correct path since Signup.css is in the same folder
 

const SignUp = () => {
  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        
        <div className="input-group">
          <label>First Name</label>
          <input type="text" placeholder="Enter your first name" />
        </div>
        
        <div className="input-group">
          <label>Last Name</label>
          <input type="text" placeholder="Enter your last name" />
        </div>
        
        <div className="input-group">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" />
        </div>
        
        <div className="input-group">
          <label>Password</label>
          <input type="password" placeholder="Enter your password" />
        </div>
        
        <div className="input-group">
          <label>Confirm Password</label>
          <input type="password" placeholder="Confirm your password" />
        </div>
        
        <button className="button">Sign Up</button>
        
        <div className="footer">
          <p>Already have an account? <a href="/login">Login</a></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

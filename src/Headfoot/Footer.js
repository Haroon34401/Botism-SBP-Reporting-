// src/Headfoot/Footer.js

import React from 'react';
import './Footer.css';
import '../components/Dashboard.css';
 // Ensure this path points to the CSS file

function Footer() {
    return (
        <footer className="dashboard-footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} Botism. All rights reserved.</p>
                
                <p>About Us: We provide comprehensive reporting solutions for SBP compliance.</p>
                
                <p>Contact: support@botism.com | +123-456-7890</p>
                
                <div className="social-links">
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a> |
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a> |
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                </div>
                
                <nav className="footer-links">
                    <a href="#privacy-policy">Privacy Policy</a> |
                    <a href="#terms-of-service">Terms of Service</a> |
                    <a href="#sitemap">Sitemap</a>
                </nav>
                
                <div className="newsletter-signup">
                    <p>Subscribe to our newsletter:</p>
                    <input type="email" placeholder="Enter your email" />
                    <button type="submit">Subscribe</button>
                </div>
                
                <div className="quick-links">
                    <a href="#support">Support</a> |
                    <a href="#help">Help</a> |
                    <a href="#faq">FAQ</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

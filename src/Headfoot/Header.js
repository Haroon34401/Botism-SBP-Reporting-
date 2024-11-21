// src/Headfoot/Header.js

import React from 'react';
import './Header.css';
 // Ensure this path points to the CSS file

function Header() {
    return (
        <header className="dashboard-header">
            <div className="header-left">
                <nav className="nav-links">
                    <div className="header-info">
                        <h2>Botism SBP Reporting</h2>
                    </div>
                    <a href="#report">Reporting</a>
                    <a href="#email-management">Email Management</a>
                    <a href="#error">Error</a>
                    <a href="#monitoring">Monitoring</a>
                    <a href="#configure-bot">Configure Bot</a>
                    <a href="#report-data">Report Data</a>
                    <a href="#detail-management">Detail Management</a>
                    <a href="#training">Training</a>
                </nav>
            </div>
            <div className="header-right">
                <input type="text" className="search-bar" placeholder="Search..." />
                <button className="settings-btn">⚙️</button>
                <button className="user-btn">👤</button>
            </div>
        </header>
    );
}

export default Header;

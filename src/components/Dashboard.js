import React from 'react';
import Header from '../Headfoot/Header';  // Import the Header component
import Footer from '../Headfoot/Footer';  // Import the Footer component
import '../Headfoot/Header.css'; // This should match the path where Header.css is located
import '../Headfoot/Footer.css'; // This should match the path where Footer.css is located
import './Dashboard.css';  // Path to the Dashboard-specific CSS
import stressLogo from '../images/stresslogo.png';  // Adjusted path for the logo image
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, LineChart, Line } from 'recharts';

const barData = [
    { month: 'January', reports: 30 },
    { month: 'February', reports: 45 },
    { month: 'March', reports: 20 },
    { month: 'April', reports: 60 },
    { month: 'May', reports: 80 },
    { month: 'June', reports: 50 },
];

const lineData = [
    { month: 'January', reports: 20 },
    { month: 'February', reports: 30 },
    { month: 'March', reports: 25 },
    { month: 'April', reports: 40 },
    { month: 'May', reports: 70 },
    { month: 'June', reports: 60 },
];

function Dashboard() {
    return (
        <div className="dashboard-container">
            <Header />  {/* Include the Header component */}

            <div className="logo-section">
                <img src={stressLogo} alt="Stress Logo" className="stress-logo" />
                <div className="date-range">
                    <label htmlFor="fromDate">From:</label>
                    <input type="date" id="fromDate" className="date-input" />
                    <label htmlFor="toDate">To:</label>
                    <input type="date" id="toDate" className="date-input" />
                </div>
            </div>

            <div className="dashboard-sections">
                <div className="section"><p>A03</p></div>
                <div className="section"><p>A04</p></div>
                <div className="section"><p>A05</p></div>
                <div className="section"><p>A07</p></div>
                <div className="section">
                    <h3>Reports by Month</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="reports" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="section">
                    <h3>Reports Trend</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={lineData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="reports" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <Footer />  {/* Include the Footer component */}
        </div>
    );
}

export default Dashboard;

import React, { useState } from 'react';
import '../ConfigureBot/ConfigureBot.css'; // Adjust the path if needed
import Header from '../Headfoot/Header'; // Ensure the path is correct
import Footer from '../Headfoot/Footer'; // Ensure the path is correct

function ConfigureBot() {
    // State for form inputs
    const [reportType, setReportType] = useState('');
    const [filePath, setFilePath] = useState('');
    const [reportMonth, setReportMonth] = useState('');
    const [outputPath, setOutputPath] = useState('');
    const [sendEmail, setSendEmail] = useState(false);
    const [scheduledTime, setScheduledTime] = useState('');
    const [testResult, setTestResult] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        // Basic validation: Check if required fields are filled
        if (!reportType || !filePath || !reportMonth || !outputPath || !scheduledTime) {
            setErrorMessage('Please fill in all the required fields.');
            return;
        }

        // If validation passes, handle save configuration
        handleSaveConfig();
    };

    // Logic for testing configuration
    const handleTestConfig = () => {
        // Simulate test logic
        if (reportType && filePath && reportMonth && outputPath) {
            setTestResult('Test successful! Your configuration is valid.');
        } else {
            setTestResult('Test failed! Please check your input values.');
        }
    };

    // Logic for saving configuration
    const handleSaveConfig = () => {
        console.log('Configuration Saved:', {
            reportType,
            filePath,
            reportMonth,
            outputPath,
            sendEmail,
            scheduledTime,
        });
        // Example: Save the config to backend (if connected)
        setTestResult('Configuration has been saved successfully!');
        setErrorMessage(''); // Clear any previous error messages
    };

    return (
        <div className="configure-bot-container">
            {/* Header Component */}
            <Header />

            <div className="configure-bot-form-container">
                <h2>Configure Bot</h2>
                <form onSubmit={handleSubmit}>
                    {/* Report Type */}
                    <div className="form-group">
                        <label>Report Type:</label>
                        <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
                            <option value="">Select Report</option>
                            <option value="A03">A03</option>
                            <option value="A04">A04</option>
                            <option value="A05">A05</option>
                            <option value="A07">A07</option>
                        </select>
                    </div>

                    {/* Folder Path for Required Files */}
                    <div className="form-group folder-path">
                        <label>Folder Path for Required Files:</label>
                        <input
                            type="text"
                            value={filePath}
                            onChange={(e) => setFilePath(e.target.value)}
                        />
                    </div>

                   
                        {/* Reporting Month */}
                    <div className="form-group reporting-month">
                        <label>Reporting Month:</label>
                        <input
                            type="month"
                            value={reportMonth}
                            onChange={(e) => setReportMonth(e.target.value)}
                       />
                   </div>


                    {/* Output File Path */}
                    <div className="form-group output-path">
                        <label>Output File Path:</label>
                        <input
                            type="text"
                            value={outputPath}
                            onChange={(e) => setOutputPath(e.target.value)}
                        />
                    </div>

                    {/* Send Email Checkbox */}
                    <div className="form-group">
                        <label>
                            <input
                                type="checkbox"
                                checked={sendEmail}
                                onChange={(e) => setSendEmail(e.target.checked)}
                            />
                            Send Email After Report Generation
                        </label>
                    </div>

                    {/* Schedule Task */}
                    <div className="form-group schedule-task">
                        <label>Schedule Task:</label>
                        <input
                            type="datetime-local"
                            value={scheduledTime}
                            onChange={(e) => setScheduledTime(e.target.value)}
                        />
                    </div>

                    {/* Submit and Test Buttons */}
                    <div className="button-container">
                        <button type="button" onClick={handleTestConfig}>
                            Test Configuration
                        </button>
                        <button type="submit">Save Configuration</button>
                    </div>
                </form>

                {/* Error or Success Message */}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {testResult && <p className="test-result">{testResult}</p>}
            </div>

            {/* Footer Component */}
            <Footer />
        </div>
    );
}

export default ConfigureBot;

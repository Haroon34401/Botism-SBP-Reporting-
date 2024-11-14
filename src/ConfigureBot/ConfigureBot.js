import React, { useState } from 'react';
import '../ConfigureBot/ConfigureBot.css';  // Ensure the path is correct
import Header from '../Headfoot/Header'; // Ensure the path is correct
import Footer from '../Headfoot/Footer'; // Ensure the path is correct
import DatePicker from 'react-datepicker'; // Import the date picker
import "react-datepicker/dist/react-datepicker.css"; // Import styles for the date picker

function ConfigureBot() {
    // State for form inputs
    const [reportType, setReportType] = useState('');
    const [filePath, setFilePath] = useState('');
    const [reportMonth, setReportMonth] = useState('');
    const [outputPath, setOutputPath] = useState('');
    const [sendEmail, setSendEmail] = useState(false);
    const [scheduledTimeOption, setScheduledTimeOption] = useState(''); // New state for the dropdown
    const [selectedDate, setSelectedDate] = useState(null); // State for selected date in Customize option
    const [selectedTime, setSelectedTime] = useState(''); // State for time input
    const [testResult, setTestResult] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        // Basic validation: Check if required fields are filled
        if (!reportType || !filePath || !reportMonth || !outputPath || !scheduledTimeOption) {
            setErrorMessage('Please fill in all the required fields.');
            return;
        }

        if (scheduledTimeOption === 'Fixed' && (!selectedDate || !selectedTime)) {
            setErrorMessage('Please select both a date and a time for the fixed schedule.');
            return;
        }

        if (scheduledTimeOption === 'Customize' && !selectedDate) {
            setErrorMessage('Please select a custom date for the scheduled task.');
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
            scheduledTimeOption, // Using the dropdown value
            selectedDate, // Date for Fixed schedule or Customize
            selectedTime, // Time for Fixed schedule
        });
        setTestResult('Configuration has been saved successfully!');
        setErrorMessage(''); // Clear any previous error messages
    };

    // Handle folder selection using input element for Folder Path for Required Files
    const handleFolderSelection = (event, setter) => {
        const folder = event.target.files[0];
        if (folder) {
            setter(folder.webkitRelativePath || folder.name || 'No folder selected');
        }
    };

    // Handle folder selection for Output File Path
    const handleOutputFolderSelection = (event) => {
        const folder = event.target.files[0];
        if (folder) {
            setOutputPath(folder.webkitRelativePath || folder.name || 'No folder selected');
        }
    };

    return (
        <div className="configure-bot-container">
            {/* Header Component */}
            <Header />

            <div className="configure-bot-form-container">
                <h2>Configure Bot</h2>
                <form onSubmit={handleSubmit}>
                    <div className="configure-form">
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
                        <div className="form-group">
                            <label>Folder Path for Required Files:</label>
                            <div className="folder-path-container" style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="text"
                                    className="folder-path-input"
                                    value={filePath}
                                    placeholder="No folder selected"
                                    readOnly
                                />
                                <input
                                    type="file"
                                    id="folderInput"
                                    directory=""
                                    webkitdirectory=""
                                    hidden
                                    onChange={(e) => handleFolderSelection(e, setFilePath)}
                                />
                                <button
                                    type="button"
                                    className="folder-select-btn"
                                    onClick={() => document.getElementById('folderInput').click()}
                                    style={{ marginLeft: '5px' }}
                                >
                                    📁
                                </button>
                            </div>
                        </div>

                        {/* Reporting Month */}
                        <div className="form-group">
                            <label>Reporting Month:</label>
                            <input
                                type="month"
                                value={reportMonth}
                                onChange={(e) => setReportMonth(e.target.value)}
                            />
                        </div>

                        {/* Output File Path */}
                        <div className="form-group">
                            <label>Output File Path:</label>
                            <div className="folder-path-container" style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="text"
                                    className="folder-path-input"
                                    value={outputPath}
                                    placeholder="No folder selected"
                                    readOnly
                                />
                                <input
                                    type="file"
                                    id="outputFolderInput"
                                    directory=""
                                    webkitdirectory=""
                                    hidden
                                    onChange={handleOutputFolderSelection}
                                />
                                <button
                                    type="button"
                                    className="folder-select-btn"
                                    onClick={() => document.getElementById('outputFolderInput').click()}
                                    style={{ marginLeft: '5px' }}
                                >
                                    📁
                                </button>
                            </div>
                        </div>

                        {/* Schedule Task Dropdown */}
                        <div className="form-group">
                            <label>Schedule Task:</label>
                            <select
                                value={scheduledTimeOption}
                                onChange={(e) => setScheduledTimeOption(e.target.value)}
                            >
                                <option value="">Select Option</option>
                                <option value="Fixed">Fixed</option>
                                <option value="Customize">Customize</option>
                            </select>
                        </div>

                        {/* Fixed Option: Date and Time Picker */}
                        {scheduledTimeOption === 'Fixed' && (
                            <div className="fixed-schedule-options">
                                <div className="form-group">
                                    <label>Select Day (1-28 or Last Day):</label>
                                    <select
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                    >
                                        <option value="">Select Day</option>
                                        {[...Array(28)].map((_, i) => (
                                            <option key={i} value={i + 1}>{i + 1}</option>
                                        ))}
                                        <option value="Last">Last Day</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Select Time:</label>
                                    <input
                                        type="time"
                                        value={selectedTime}
                                        onChange={(e) => setSelectedTime(e.target.value)}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Customize Option: Calendar Picker */}
                        {scheduledTimeOption === 'Customize' && (
                            <div className="customize-schedule-options">
                                <div className="form-group">
                                    <label>Select Date:</label>
                                    <DatePicker
                                        selected={selectedDate}
                                        onChange={(date) => setSelectedDate(date)}
                                        dateFormat="yyyy-MM-dd"
                                        className="custom-calendar"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Select Time:</label>
                                    <input
                                        type="time"
                                        value={selectedTime}
                                        onChange={(e) => setSelectedTime(e.target.value)}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Send Email Checkbox */}
                        <div className="form-group send-email-checkbox">
                            <label >
                                <input
                                    type="checkbox"
                                    checked={sendEmail}
                                    onChange={(e) => setSendEmail(e.target.checked)}
                                />
                                Send Email After Report Generation
                            </label>
                        </div>

                        {/* Submit and Test Buttons */}
                        <div className="button-container">
                            <button type="button" onClick={handleTestConfig}>
                                Test Configuration
                            </button>
                            <button type="submit">Save Configuration</button>
                        </div>
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

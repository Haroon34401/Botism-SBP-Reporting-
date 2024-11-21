import React, { useState, useEffect } from 'react';
import Header from '../Headfoot/Header';  // Import Header component
import Footer from '../Headfoot/Footer';  // Import Footer component
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook
import './Reporting.css';  // Import custom CSS for this page

const Reporting = () => {
  const [reports, setReports] = useState([]); // To store report data
  const [columns, setColumns] = useState([]); // To store column names
  const [currentPage, setCurrentPage] = useState(1); // To manage pagination
  const reportsPerPage = 10; // Number of reports per page
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' }); // To handle sorting
  const navigate = useNavigate();  // Hook for navigation

  // Filter States
  const [reportType, setReportType] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [status, setStatus] = useState('');

  // Fetch combined data (columns + reports)
  useEffect(() => {
    fetch('./Jsondata/reportDataWithColumns.json')
      .then((response) => response.json())
      .then((data) => {
        // Set columns and reports from the same file
        setColumns(data.columns);
        const updatedReports = data.data.map((report) => {
          // Format Requested Time and Completion Time to show only time (HH:mm)
          const requestedTime = new Date(report.requestedTime);
          const completionTime = new Date(report.completionTime);

          const requestedTimeFormatted = requestedTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });

          const completionTimeFormatted = completionTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });

          // Calculate the duration in minutes
          const durationInMinutes = Math.round((completionTime - requestedTime) / 1000); // Duration in minutes

          return {
            ...report,
            requestedTime: requestedTimeFormatted,  // Only time
            completionTime: completionTimeFormatted,  // Only time
            duration: durationInMinutes.toString(), // Duration in minutes
            status: report.status || 'In-progress',   // Default to 'In-progress' if no status exists
          };
        });

        setReports(updatedReports);  // Store updated report data
      })
      .catch((error) => console.error('Error fetching combined data:', error));
  }, []);

  // Handle sorting
  const handleSort = (column) => {
    const direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key: column, direction });
    setReports((prevReports) => {
      const sortedReports = [...prevReports].sort((a, b) => {
        let valueA = a[column];
        let valueB = b[column];

        // Check if the column data is a number
        if (typeof valueA === 'string' && !isNaN(valueA)) valueA = parseFloat(valueA);
        if (typeof valueB === 'string' && !isNaN(valueB)) valueB = parseFloat(valueB);

        // Check if the column data is a date
        if (Date.parse(valueA) && Date.parse(valueB)) {
          valueA = new Date(valueA);
          valueB = new Date(valueB);
        }

        // Compare values based on the direction
        if (valueA < valueB) return direction === 'asc' ? -1 : 1;
        if (valueA > valueB) return direction === 'asc' ? 1 : -1;
        return 0;
      });
      return sortedReports;
    });
  };

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get current reports based on pagination
  const currentReports = reports.slice(
    (currentPage - 1) * reportsPerPage,
    currentPage * reportsPerPage
  );

  // Handle Report Type Filter
  const handleReportTypeChange = (e) => setReportType(e.target.value);

  // Handle Date Range Filter
  const handleDateRangeChange = (e) => setDateRange(e.target.value);

  // Handle Status Filter
  const handleStatusChange = (e) => setStatus(e.target.value);

  // Delete report handler
  const handleDelete = (reportId) => {
    setReports(reports.filter((report) => report.id !== reportId));
  };

  // Handle row click with color assignment
  const handleRowClick = (report, color) => {
    // Navigate to the ReportSummary page and pass reportId and color
    navigate('/ReportSummary', { state: { reportId: report.id, color: color } });
  };

  return (
    <div className="reporting-screen">
      <Header />
      <div className="reporting-container">
        <h1 className="reporting-title">Report</h1>

        {/* Filters Section */}
        <div className="filters">
          <label>
            Report Type:
            <select value={reportType} onChange={handleReportTypeChange}>
              <option value="">All</option>
              <option value="PDF">A03</option>
              <option value="CSV">A04</option>
              <option value="Excel">A05</option>
              <option value="XML">A07</option>
            </select>
          </label>

          <label>
            Date Range:
            <input 
              type="date" 
              value={dateRange} 
              onChange={handleDateRangeChange} 
            />
          </label>

          <label>
            Status:
            <select value={status} onChange={handleStatusChange}>
              <option value="">All</option>
              <option value="Completed">Completed</option>
              <option value="in-progress">in-progress</option>
            </select>
          </label>

          <button className="download-btn">Download</button>
        </div>

        <div className="reports-table">
          <table>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.key} onClick={() => handleSort(column.key)}>
                    {column.label}
                  </th>
                ))}
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {currentReports.length > 0 ? (
                currentReports.map((report) => {
                  // Assign color dynamically (e.g., orange for A03)
                  const rowColor = report.reportType === 'A03' ? 'yellow' : 'transparent';  // Set color for A03 rows

                  return (
                    <tr 
                      key={report.id} 
                      onClick={() => handleRowClick(report, rowColor)} 
                      style={{ backgroundColor: rowColor }} // Apply color to the row
                    >
                      {columns.map((column) => (
                        <td key={column.key}>{report[column.key]}</td>
                      ))}
                      <td>
                        <button onClick={() => handleDelete(report.id)}>Delete</button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={columns.length + 1}>No reports found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        <div className="pagination">
          {Array.from({ length: Math.ceil(reports.length / reportsPerPage) }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Reporting;

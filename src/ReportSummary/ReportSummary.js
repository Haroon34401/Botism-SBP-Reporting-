import React, { useState, useEffect } from 'react';
import Header from '../Headfoot/Header';  // Import Header component
import Footer from '../Headfoot/Footer';  // Import Footer component
import './ReportSummary.css';  // Import custom CSS for this page

const ReportSummary = () => {
  const [reports, setReports] = useState([]); // To store report data
  const [columns, setColumns] = useState([]); // To store column names
  const [currentPage, setCurrentPage] = useState(1); // To manage pagination
  const reportsPerPage = 10; // Number of reports per page
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' }); // To handle sorting

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

  return (
    <div className="report-summary-screen">
      <Header />
      <div className="reporting-container">
        <h1 className="reporting-title">Report Summary</h1>

        <div className="reports-table">
          <table>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.key} onClick={() => handleSort(column.key)}>
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentReports.length > 0 ? (
                currentReports.map((report) => (
                  <tr key={report.id}>
                    {columns.map((column) => (
                      <td key={column.key}>{report[column.key]}</td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length}>No reports found</td>
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

export default ReportSummary;

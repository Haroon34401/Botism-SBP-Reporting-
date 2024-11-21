import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Header from '../Headfoot/Header'; // Import Header component
import Footer from '../Headfoot/Footer'; // Import Footer component
import './ReportSummary.css'; // Import custom CSS for this page
import { ColorContext } from '../context/ColorContext'; // Import ColorContext

const ReportSummary = ({ selectedColor }) => {
  const { color } = useContext(ColorContext); // Access color state from context
  const [reports, setReports] = useState([]); // To store report data
  const [columns, setColumns] = useState([]); // To store column names
  const [currentPage, setCurrentPage] = useState(1); // To manage pagination
  const reportsPerPage = 10; // Number of reports per page
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' }); // To handle sorting
  const navigate = useNavigate(); // For navigation to Report Insight screen

  // Fetch combined data (columns + reports)
  useEffect(() => {
    fetch('/Jsondata/SummaryData.json')
      .then((response) => response.json())
      .then((data) => {
        setColumns(data.columns);
        const updatedReports = data.data.map((report) => {
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

          const durationInMinutes = Math.round((completionTime - requestedTime) / 1000);

          return {
            ...report,
            requestedTime: requestedTimeFormatted,
            completionTime: completionTimeFormatted,
            duration: durationInMinutes.toString(),
            status: report.status || 'In-progress',
            color: report.color || color, // Use color from context if not in report data
          };
        });

        setReports(updatedReports); // Store updated report data
      })
      .catch((error) => console.error('Error fetching combined data:', error));
  }, [color]); // Depend on color to re-fetch when it changes

  // Handle sorting
  const handleSort = (column) => {
    const direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key: column, direction });
    setReports((prevReports) => {
      const sortedReports = [...prevReports].sort((a, b) => {
        let valueA = a[column];
        let valueB = b[column];

        // Handle sorting for specific data types
        if (typeof valueA === 'string' && !isNaN(valueA)) valueA = parseFloat(valueA);
        if (typeof valueB === 'string' && !isNaN(valueB)) valueB = parseFloat(valueB);

        if (Date.parse(valueA) && Date.parse(valueB)) {
          valueA = new Date(valueA);
          valueB = new Date(valueB);
        }

        if (valueA < valueB) return direction === 'asc' ? -1 : 1;
        if (valueA > valueB) return direction === 'asc' ? 1 : -1;
        return 0;
      });
      return sortedReports;
    });
  };

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle row click to navigate to Report Insight screen
  const handleRowClick = (report) => {
    navigate('/ReportInsight', { state: { report } }); // Pass the selected report to Report Insight
  };

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
                  <tr
                    key={report.id}
                    style={{ backgroundColor: selectedColor || 'yellow' }}
                    onClick={() => handleRowClick(report)} // Add click handler
                    className="clickable-row"
                  >
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
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: Math.ceil(reports.length / reportsPerPage) }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(reports.length / reportsPerPage)}
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReportSummary;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Header from '../Headfoot/Header'; 
import Footer from '../Headfoot/Footer';
import './ReportInsight.css';

const ReportInsight = () => {
  const [reports, setReports] = useState([]);
  const [columns, setColumns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 10;
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    fetch('/Jsondata/Insightdata.json') // Adjust the path if needed
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch data');
        return response.json();
      })
      .then((data) => {
        setColumns(data.columns || []);
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

          const durationInSeconds = Math.round((completionTime - requestedTime) / 1000);

          return {
            ...report,
            requestedTime: requestedTimeFormatted,
            completionTime: completionTimeFormatted,
            duration: durationInSeconds.toString(),
            status: report.status || 'In-progress',
          };
        });
        setReports(updatedReports);
      })
      .catch((err) => {
        setError(err.message);
        console.error('Error fetching data:', err);
      });
  }, []);

  const handleSort = (column) => {
    const direction = sortConfig.key === column && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key: column, direction });
    setReports((prevReports) => {
      const sortedReports = [...prevReports].sort((a, b) => {
        let valueA = a[column];
        let valueB = b[column];

        if (valueA === undefined || valueA === null) return 1;
        if (valueB === undefined || valueB === null) return -1;

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

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const currentReports = reports.slice(
    (currentPage - 1) * reportsPerPage,
    currentPage * reportsPerPage
  );

  const handleRowClick = (report) => {
    navigate('/ReportData', { state: { report } }); // Pass the selected report to Report Insight
  };

  return (
    <div className="report-insight-screen">
      <Header />
      <div className="report-insight-container">
        <h1 className="report-insight-title">Report Insight</h1>

        {error ? (
          <p className="error-message">Error: {error}</p>
        ) : (
          <>
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
                      <tr key={report.id} onClick={() => handleRowClick(report)}>
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

            <div className="pagination">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {Array.from(
                { length: Math.ceil(reports.length / reportsPerPage) },
                (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => paginate(index + 1)}
                    className={currentPage === index + 1 ? 'active' : ''}
                  >
                    {index + 1}
                  </button>
                )
              )}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === Math.ceil(reports.length / reportsPerPage)}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ReportInsight;

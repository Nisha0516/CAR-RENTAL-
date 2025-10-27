import React, { useState } from 'react';
import './AdminStyles.css';

const Report = () => {
  const [reportType, setReportType] = useState('revenue');
  const [dateRange, setDateRange] = useState('monthly');

  const reportData = {
    revenue: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      data: [12000, 19000, 15000, 25000, 22000, 30000]
    },
    bookings: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      data: [45, 78, 56, 89, 67, 94]
    }
  };

  const generateReport = () => {
    // In real app, this would call an API
    console.log('Generating report...');
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Reports & Analytics</h1>
        <p>Generate detailed reports and business insights</p>
      </div>

      <div className="report-controls">
        <div className="control-group">
          <label>Report Type:</label>
          <select 
            value={reportType} 
            onChange={(e) => setReportType(e.target.value)}
          >
            <option value="revenue">Revenue Report</option>
            <option value="bookings">Bookings Report</option>
            <option value="utilization">Car Utilization</option>
            <option value="customer">Customer Analysis</option>
          </select>
        </div>

        <div className="control-group">
          <label>Date Range:</label>
          <select 
            value={dateRange} 
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        <button className="btn-primary" onClick={generateReport}>
          Generate Report
        </button>
      </div>

      <div className="report-content">
        <div className="chart-container">
          <h3>{reportType === 'revenue' ? 'Revenue Report' : 'Bookings Report'}</h3>
          <div className="chart-placeholder">
            {/* In real app, integrate with Chart.js or similar */}
            <p>Chart visualization for {reportType} data</p>
            <p>Data: {reportData[reportType].data.join(', ')}</p>
          </div>
        </div>

        <div className="report-summary">
          <h3>Key Metrics</h3>
          <div className="metrics-grid">
            <div className="metric-card">
              <h4>Total Revenue</h4>
              <p>$45,280</p>
            </div>
            <div className="metric-card">
              <h4>Average Booking Value</h4>
              <p>$290</p>
            </div>
            <div className="metric-card">
              <h4>Utilization Rate</h4>
              <p>78%</p>
            </div>
            <div className="metric-card">
              <h4>Customer Satisfaction</h4>
              <p>4.8/5</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
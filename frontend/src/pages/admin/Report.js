import React, { useState } from 'react';
import { adminAPI, adminAdvancedAPI } from '../../services/api';
import './AdminStyles.css';
// Note: Run 'npm install jspdf jspdf-autotable' to enable PDF generation
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

const Report = () => {
  const [reportType, setReportType] = useState('overview');
  const [dateRange, setDateRange] = useState('monthly');
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [analytics, setAnalytics] = useState({
    totalRevenue: 125840,
    totalBookings: 342,
    activeUsers: 1250,
    totalCars: 87,
    avgBookingValue: 368,
    growthRate: 12.5
  });

  const generateReport = async () => {
    setLoading(true);
    try {
      const response = await adminAPI.getReports(reportType, startDate, endDate);
      setReportData(response.data);
      alert('Report generated successfully!');
    } catch (error) {
      console.error('Error generating report:', error);
      alert(error.message || 'Failed to generate report');
      // Fallback to mock data
      setReportData({
        revenue: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          data: [12000, 19000, 15000, 25000, 22000, 30000]
        },
        bookings: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          data: [45, 78, 56, 89, 67, 94]
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const getAnalytics = async () => {
    try {
      const response = await adminAdvancedAPI.getPlatformAnalytics();
      console.log('Analytics:', response.analytics);
      alert('Analytics data loaded! Check console for details.');
    } catch (error) {
      alert(error.message || 'Failed to get analytics');
    }
  };

  const generatePDFReport = () => {
    if (!reportData || !reportData[reportType]) {
      alert('Please generate a report first before downloading PDF');
      return;
    }
    
    // Check if jsPDF is installed
    try {
      // Uncomment these lines after running: npm install jspdf jspdf-autotable
      /*
      const jsPDF = require('jspdf');
      require('jspdf-autotable');
      
      const doc = new jsPDF();
      const currentDate = new Date().toLocaleDateString();
      
      // Title
      doc.setFontSize(20);
      doc.setTextColor(40);
      doc.text('DriveEasy - Business Report', 14, 22);
      
      // Subtitle
      doc.setFontSize(12);
      doc.setTextColor(100);
      doc.text(`Report Type: ${reportType.toUpperCase()}`, 14, 32);
      doc.text(`Date Range: ${dateRange.toUpperCase()}`, 14, 39);
      doc.text(`Generated: ${currentDate}`, 14, 46);
      
      // Key Metrics
      doc.setFontSize(14);
      doc.setTextColor(40);
      doc.text('Key Metrics Summary', 14, 58);
      
      const metricsData = [
        ['Metric', 'Value'],
        ['Total Revenue', '$45,280'],
        ['Total Bookings', '156'],
        ['Average Booking Value', '$290'],
        ['Utilization Rate', '78%'],
        ['Customer Satisfaction', '4.8/5']
      ];
      
      doc.autoTable({
        startY: 63,
        head: [metricsData[0]],
        body: metricsData.slice(1),
        theme: 'grid',
        headStyles: { fillColor: [102, 126, 234] },
      });
      
      // Monthly data
      const monthlyData = reportData[reportType].labels.map((label, index) => [
        label,
        reportData[reportType].data[index].toString()
      ]);
      
      doc.text('Monthly Breakdown', 14, doc.lastAutoTable.finalY + 15);
      
      doc.autoTable({
        startY: doc.lastAutoTable.finalY + 20,
        head: [['Month', reportType === 'revenue' ? 'Revenue ($)' : 'Bookings']],
        body: monthlyData,
        theme: 'striped',
        headStyles: { fillColor: [118, 75, 162] },
      });
      
      // Footer
      const pageCount = doc.internal.getNumberOfPages();
      doc.setFontSize(10);
      doc.setTextColor(150);
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.text(
          'DriveEasy Car Rental | Confidential Report',
          doc.internal.pageSize.getWidth() / 2,
          doc.internal.pageSize.getHeight() - 10,
          { align: 'center' }
        );
      }
      
      // Save
      doc.save(`${reportType}_report_${dateRange}_${currentDate.replace(/\//g, '-')}.pdf`);
      */
      
      alert('To enable PDF generation:\n\n1. Run: npm install jspdf jspdf-autotable\n2. Uncomment the PDF code in Report.js\n3. Restart the development server\n\nFor now, showing report data in console.');
      console.log('Report Data:', {
        type: reportType,
        range: dateRange,
        data: reportData[reportType]
      });
    } catch (error) {
      alert('PDF library not installed. Run: npm install jspdf jspdf-autotable');
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div>
          <h1>📊 Reports & Analytics</h1>
          <p>Track performance metrics and generate comprehensive business reports</p>
        </div>
      </div>

      {/* Analytics Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {/* Total Revenue */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '1.5rem',
          borderRadius: '14px',
          color: 'white',
          boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: '0.85rem', opacity: 0.9, marginBottom: '0.5rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              💰 Total Revenue
            </div>
            <div style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '0.5rem' }}>
              ₹{analytics.totalRevenue.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>
              <span style={{ color: '#86efac', fontWeight: '700' }}>+{analytics.growthRate}%</span> from last month
            </div>
          </div>
          <div style={{
            position: 'absolute',
            right: '-20px',
            bottom: '-20px',
            fontSize: '6rem',
            opacity: 0.1
          }}>💰</div>
        </div>

        {/* Total Bookings */}
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '14px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          border: '2px solid #f3f4f6',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.5rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              📅 Total Bookings
            </div>
            <div style={{ fontSize: '2.25rem', fontWeight: '800', color: '#10b981', marginBottom: '0.5rem' }}>
              {analytics.totalBookings}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>
              Across all vehicles
            </div>
          </div>
          <div style={{
            position: 'absolute',
            right: '-20px',
            bottom: '-20px',
            fontSize: '6rem',
            opacity: 0.05
          }}>📅</div>
        </div>

        {/* Active Users */}
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '14px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          border: '2px solid #f3f4f6',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.5rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              👥 Active Users
            </div>
            <div style={{ fontSize: '2.25rem', fontWeight: '800', color: '#3b82f6', marginBottom: '0.5rem' }}>
              {analytics.activeUsers}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>
              Registered customers
            </div>
          </div>
          <div style={{
            position: 'absolute',
            right: '-20px',
            bottom: '-20px',
            fontSize: '6rem',
            opacity: 0.05
          }}>👥</div>
        </div>

        {/* Total Cars */}
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '14px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          border: '2px solid #f3f4f6',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.5rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              🚗 Total Cars
            </div>
            <div style={{ fontSize: '2.25rem', fontWeight: '800', color: '#f59e0b', marginBottom: '0.5rem' }}>
              {analytics.totalCars}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>
              In the fleet
            </div>
          </div>
          <div style={{
            position: 'absolute',
            right: '-20px',
            bottom: '-20px',
            fontSize: '6rem',
            opacity: 0.05
          }}>🚗</div>
        </div>
      </div>

      {/* Report Controls */}
      <div style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '14px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        marginBottom: '2rem'
      }}>
        <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.2rem', fontWeight: '700', color: '#111827' }}>
          🎯 Generate Custom Report
        </h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'end' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '600', color: '#374151' }}>
              Report Type
            </label>
            <select 
              value={reportType} 
              onChange={(e) => setReportType(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '0.95rem',
                fontWeight: '500',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="overview">📊 Overview</option>
              <option value="revenue">💰 Revenue Report</option>
              <option value="bookings">📅 Bookings Report</option>
              <option value="utilization">🚗 Car Utilization</option>
              <option value="customer">👥 Customer Analysis</option>
            </select>
          </div>

          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '600', color: '#374151' }}>
              Date Range
            </label>
            <select 
              value={dateRange} 
              onChange={(e) => setDateRange(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '0.95rem',
                fontWeight: '500',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="daily">📅 Daily</option>
              <option value="weekly">📊 Weekly</option>
              <option value="monthly">📈 Monthly</option>
              <option value="yearly">🗓️ Yearly</option>
            </select>
          </div>

          <button 
            className="btn-primary" 
            onClick={generateReport}
            disabled={loading}
            style={{ padding: '12px 24px', whiteSpace: 'nowrap' }}
          >
            {loading ? '⏳ Generating...' : '📊 Generate Report'}
          </button>
          <button 
            onClick={generatePDFReport}
            disabled={!reportData}
            style={{
              padding: '12px 24px',
              background: reportData ? '#10b981' : '#d1d5db',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: reportData ? 'pointer' : 'not-allowed',
              transition: 'all 0.3s ease',
              whiteSpace: 'nowrap'
            }}
          >
            📥 Download PDF
          </button>
        </div>
      </div>

      {/* Charts and Data Visualization */}
      {reportData && (
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '14px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          marginBottom: '2rem'
        }}>
          <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.3rem', fontWeight: '700', color: '#111827' }}>
            📈 {reportType.charAt(0).toUpperCase() + reportType.slice(1)} Trends
          </h3>
          
          {/* Simple Bar Chart Visualization */}
          {reportData[reportType] && (
            <div>
              <div style={{ marginBottom: '2rem' }}>
                {reportData[reportType].labels.map((label, index) => (
                  <div key={index} style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#374151' }}>{label}</span>
                      <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#667eea' }}>
                        {reportType === 'revenue' ? '₹' : ''}{reportData[reportType].data[index].toLocaleString()}
                      </span>
                    </div>
                    <div style={{
                      height: '12px',
                      background: '#e5e7eb',
                      borderRadius: '6px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        height: '100%',
                        width: `${(reportData[reportType].data[index] / Math.max(...reportData[reportType].data)) * 100}%`,
                        background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: '6px',
                        transition: 'width 0.5s ease'
                      }} />
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Summary Stats */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '1rem',
                padding: '1.5rem',
                background: '#f9fafb',
                borderRadius: '12px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.5rem', fontWeight: '700', textTransform: 'uppercase' }}>
                    Total
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#667eea' }}>
                    {reportType === 'revenue' ? '₹' : ''}{reportData[reportType].data.reduce((a, b) => a + b, 0).toLocaleString()}
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.5rem', fontWeight: '700', textTransform: 'uppercase' }}>
                    Average
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#10b981' }}>
                    {reportType === 'revenue' ? '₹' : ''}{Math.round(reportData[reportType].data.reduce((a, b) => a + b, 0) / reportData[reportType].data.length).toLocaleString()}
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.5rem', fontWeight: '700', textTransform: 'uppercase' }}>
                    Peak
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#f59e0b' }}>
                    {reportType === 'revenue' ? '₹' : ''}{Math.max(...reportData[reportType].data).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Quick Analytics Button */}
      <div style={{
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        padding: '2rem',
        borderRadius: '14px',
        color: 'white',
        textAlign: 'center',
        boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)'
      }}>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.5rem', fontWeight: '700' }}>
          📊 Platform Analytics
        </h3>
        <p style={{ margin: '0 0 1.5rem 0', opacity: 0.9 }}>
          Get detailed analytics and insights about platform performance
        </p>
        <button 
          onClick={getAnalytics}
          style={{
            padding: '14px 32px',
            background: 'white',
            color: '#10b981',
            border: 'none',
            borderRadius: '10px',
            fontWeight: '700',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
        >
          🚀 View Advanced Analytics
        </button>
      </div>
    </div>
  );
};

export default Report;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const ReportsComponent = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/reports')
      .then(response => {
        setReports(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Prepare data for the chart
  const chartData = {
    labels: reports.map(report => report.Date), // Assuming Date field for x-axis labels
    datasets: [
      {
        label: 'Placed Orders',
        data: reports.map(report => report.PlacedOrdersToday || 0), // Assuming PlacedOrdersToday for y-axis data
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
      {
        label: 'Revenue',
        data: reports.map(report => report.RevenueToday ? parseFloat(report.RevenueToday) : 0), // Assuming RevenueToday for y-axis data
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      }
    ]
  };

  return (
    <div>
      <h1>Reports</h1>
      <div>
        {reports.map(report => (
          <div key={report.ReportID}>
            <p>Date: {report.Date}</p>
            <p>Placed Orders Today: {report.PlacedOrdersToday}</p>
            <p>Revenue Today: {report.RevenueToday}</p>
            <hr />
          </div>
        ))}
      </div>
      <div>
        <h2>Graph Representation</h2>
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default ReportsComponent;

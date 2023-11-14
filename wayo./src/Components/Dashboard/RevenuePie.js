import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { getOrderTypeDistribution } from './your-utils'; // Replace with the actual path to your utility function

const OrderTypePieChart = () => {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      const orderTypeDistribution = getOrderTypeDistribution(); // Call your function to get the data
      setData(orderTypeDistribution);
    }, []);
  
    const chartData = {
      labels: data.map((entry) => entry.split(':')[0]),
      datasets: [
        {
          data: data.map((entry) => {
            const percentage = parseFloat(entry.split(':')[1].trim());
            return percentage;
          }),
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            // Add more colors if you have more order types
          ],
        },
      ],
    };
  
    return (
      <div>
        <h2>Order Type Distribution</h2>
        <Doughnut data={chartData} />
      </div>
    );
  };
  
  export default OrderTypePieChart;
  
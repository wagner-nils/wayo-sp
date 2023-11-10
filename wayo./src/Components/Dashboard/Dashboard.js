import React, { useState, useEffect } from "react";
import RevenueTimeline from "./RevenueTimeline";
import "./Dashboard.css";


function Dashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    fetch('http://localhost:3001/orders')
      .then(response => response.json())
      .then(data => setOrders(data))
      .catch(err => console.error('Error fetching orders:', err));
  };


  return (
    <>
      <div className="background"></div>
      <div className="header">KPI dashboard</div>
      <div className="boxDashboard">
        <RevenueTimeline orders={orders} />
      </div>

    </>
  );

}

export default Dashboard;

// insert component "RevenueTimeline" here

// create a new component "RevenueTimeline" which caculates the average revenue per month over the timespan of the next 12 months.
// The second number which it should calculate is the average revenue per month over the timespan of the current, remaining calander year, it should consider the past orders of that year as well as the upcoming orders for this year.
// The time point on which the revenue stream occurs is the orderDeadline of the order plus 7 days.
// It should also generate a diagram which shows the revenue per month for the current calander year. The x-axis should be the months, the y-axis should be the revenue. To visualise the revenue, you can use a third party library.

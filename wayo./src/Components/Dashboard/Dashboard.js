import React, { useState, useEffect } from "react";
import RevenueTimeline from "./RevenueTimeline";
import RevenueNumbers from "./RevenueNumbers";
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

      {/* <div>
        <RevenueNumbers orders={orders} />
      </div> */}

    </>
  );

}

export default Dashboard;
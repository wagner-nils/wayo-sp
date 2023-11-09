import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import OrderList from "./OrderList";
import './OrderTimeline.css';


function OrderTimeline() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/orders')
      .then((response) => response.json())
      .then((data) => setOrders(data));
  }, []);

  // const addOrder = (order) => {
  //   fetch('http://localhost:3001/orders', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(order),
  //   })
  //     .then((response) => response.json())
  //     .then((newOrder) => {
  //       setOrders((prevOrders) => [...prevOrders, newOrder]);
  //     });
  // };

  return (
    <>
      <div className="header">Order timeline</div>

      {/* 2/3 to the left section */}
      <div className="LeftSection">


        <div className="OrderList"><OrderList orders={orders} /> </div>
      </div>



      {/* 1/3 to the right section */}
      <div className="RightSection">


      </div>
    </>

  )
};

export default OrderTimeline;

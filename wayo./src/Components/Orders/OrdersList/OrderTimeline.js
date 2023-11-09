import React, { useState, useEffect } from "react";
import OrderList from "./OrderList";
import HeaderInfos from "./HeaderInfo";
import AddOrder from "./AddOrder";
import './OrderTimeline.css';

function OrderTimeline() {
  const [orders, setOrders] = useState([]);
  const [showAddOrder, setShowAddOrder] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/orders')
      .then((response) => response.json())
      .then((data) => setOrders(data));
  }, []);

  const addOrder = (order) => {
    fetch('http://localhost:3001/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    })
      .then((response) => response.json())
      .then((newOrder) => {
        setOrders((prevOrders) => [...prevOrders, newOrder]);
      });
  };

  const handleAddOrderClick = () => {
    setShowAddOrder(true);
  };

  return (
    <>
      <div className="header">Order timeline</div>
      {/* 2/3 to the left section */}
      <div className="LeftSection">
        <div className="HeaderInfo"><HeaderInfos orders={orders} /></div>
        <div className="DivList">
          <div className="OrderListTitle">Orders</div>
          <button className="AddButton" onClick={handleAddOrderClick}>Add Order</button>
        </div>
        <div className="OrderList"><OrderList orders={orders} /></div>
      </div>
      {showAddOrder && (
        <AddOrder
          onClose={() => setShowAddOrder(false)}
          onSubmit={addOrder}
        />
      )}

      {/* 1/3 to the right section */}
      <div className="RightSection">
      </div>

    </>
  );
};

export default OrderTimeline;

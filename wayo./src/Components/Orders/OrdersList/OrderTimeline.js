import React, { useState, useEffect } from "react";
import OrderList from "./OrderList";
import HeaderInfos from "./HeaderInfo";
import AddOrder from "./AddOrder";
import OrderDetails from "./OrderDetails";
import './OrderTimeline.css';
import placeholder from '../../../Pictures/png-frames/placeholder-team-activity.png';

function OrderTimeline() {
  const [orders, setOrders] = useState([]);
  const [showAddOrder, setShowAddOrder] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderListKey, setOrderListKey] = useState(0);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    fetch('http://localhost:3001/orders')
      .then(response => response.json())
      .then(data => setOrders(data))
      .catch(err => console.error('Error fetching orders:', err));
  };

  const addOrder = (order) => {
    fetch('http://localhost:3001/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    })
      .then(response => response.json())
      .then(newOrder => {
        setOrders(prevOrders => [...prevOrders, newOrder]);
        setOrderListKey(prevKey => prevKey + 1);
      })
      .catch(err => console.error('Error adding order:', err));
  };

  const handleAddOrderClick = () => {
    setShowAddOrder(true);
  };

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseDetails = () => {
    setSelectedOrder(null);
  };

  const handleDeleteOrder = (orderId) => {
    fetch(`http://localhost:3001/orders/${orderId}`, {
      method: 'DELETE',
    })
      .then(() => {
        setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
        setSelectedOrder(null);
        setOrderListKey(prevKey => prevKey + 1);
      })
      .catch(err => console.error('Error deleting order:', err));
  };

  const handleUpdateOrder = (updatedData, orderId) => {
    console.log('Updating order:', orderId, updatedData);


    fetch(`http://localhost:3001/orders/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then(response => response.json())
      .then(updatedOrder => {
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order._id === orderId ? updatedOrder : order
          )
        );
        setSelectedOrder(updatedOrder);
        setOrderListKey(prevKey => prevKey + 1);
      })
      .catch(err => console.error('Error updating order:', err));
  };

  return (
    <>
      <div className="header">Order timeline</div>
      <div className="LeftSection">
        <div className="HeaderInfo"><HeaderInfos key={orderListKey} orders={orders} /></div>
        <div className="DivList">
          <div className="OrderListTitle">Orders</div>
          <button className="AddButton" onClick={handleAddOrderClick}>Add Order</button>
        </div>
        <div className="OrderList">
          <OrderList key={orderListKey} orders={orders} onOrderSelect={handleSelectOrder} />
        </div>
      </div>
      {showAddOrder && (
        <AddOrder
          onClose={() => setShowAddOrder(false)}
          onSubmit={addOrder}
        />
      )}

      <div className="RightSection">
        {selectedOrder && (
          <OrderDetails
            order={selectedOrder}
            onClose={handleCloseDetails}
            onDelete={handleDeleteOrder}
            onUpdate={handleUpdateOrder}
          />
        )}
        <img className="ImagePH" src={placeholder} alt="placeholder-team-activity" />
      </div>
    </>
  );
}

export default OrderTimeline;

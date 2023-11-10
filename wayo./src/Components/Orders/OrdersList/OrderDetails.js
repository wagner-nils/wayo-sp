import React, { useState } from 'react';
import './OrderDetails.css';

function OrderDetails({ order, onClose, onDelete, onUpdate }) {
  const [editData, setEditData] = useState({ ...order });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    onUpdate(editData);
    setIsEditing(false);
  };

  return (
    <>
    <div className="DetailsContainer">
    <div className="HeaderDetailsName">Quick overview</div>
      {isEditing ? (
        <div className="EditForm">
          <input
            type="text"
            name="OrderName"
            value={editData.orderName}
            onChange={handleInputChange}
          />
            <input
            type="text"
            name="OrderDescription"
            value={editData.orderDescription}
            onChange={handleInputChange}
            />
            <input
            type="text"
            name="OrderAmount"
            value={editData.orderAmount}
            onChange={handleInputChange}
            />
            <input
            type="text"
            name="OrderVAT"
            value={editData.orderVAT}
            onChange={handleInputChange}
            />
            <input
            type="text"
            name="OrderAddress"
            value={editData.orderAddress}
            onChange={handleInputChange}
            />
            <input
            type="text"
            name="OrderCity"
            value={editData.orderCity}
            onChange={handleInputChange}
            />
            <input
            type="text"
            name="OrderDeadline"
            value={editData.orderDeadline}
            onChange={handleInputChange}
            />
            <input
            type="text"
            name="OrderType"
            value={editData.orderType}
            onChange={handleInputChange}
            />
            <input
            type="text"
            name="OrderStatus"
            value={editData.orderStatus}
            onChange={handleInputChange}
            />
            <input
            type="text"
            name="OrderCompany"
            value={editData.orderCompany}
            onChange={handleInputChange}
            />
            <input
            type="text"
            name="OrderCompanyAbbreviation"
            value={editData.orderCompanyAbbreviation}
            onChange={handleInputChange}
            />
            <input
            type="text"
            name="OrderContact"
            value={editData.orderContact}
            onChange={handleInputChange}
            />
            <input
            type="text"
            name="OrderPhone"
            value={editData.orderPhone}
            onChange={handleInputChange}
            />
            <input
            type="text"
            name="OrderDate"
            value={editData.orderDate}
            onChange={handleInputChange}
            />
            <input
            type="text"
            name="OrderAcquisition"
            value={editData.orderAcquisition}
            onChange={handleInputChange}
            />

          <button onClick={handleUpdate}>Save Changes</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div className="DetailsDiv">
          <button className='EditButton' onClick={() => setIsEditing(true)}>Edit</button>
          <p>Order Name: </p>{order.orderName}
          <p>Order Description: </p>{order.orderDescription}
          <p>Order Deadline: </p>{order.orderDeadline}
            <p>Order Amount: </p>{order.orderAmount}
            <p>Order VAT: </p>{order.orderVAT}
          <p>Order Company: </p>{order.orderCompany}
          <p>Order Company Abbreviation: </p>{order.orderCompanyAbbreviation}
          <p>Order Address: </p>{order.orderAddress}
            <p>Order City: </p>{order.orderCity}
          <p>Order Status: </p>{order.orderStatus}
          <p>Order Type: </p>{order.orderType}
          <p>Order Contact: </p>{order.orderContact}
            <p>Order Phone: </p>{order.orderPhone}
            <p>Order Date: </p>{order.orderDate}
            <p>Order Acquisition: </p>{order.orderAcquisition}
        <div className="Div2Center">
        <button className='CloseButton' onClick={onClose}>Close</button>
        <button className='DeleteButton'  onClick={() => {
            if (window.confirm("Are you sure you want to delete this order?")) {
                onDelete(order._id);
            }
        }}>Delete</button>
        </div>
        </div>
      )}
    </div>
    </>
  );
}

export default OrderDetails;

import React, { useState } from 'react';
import './OrderDetails.css';
import moment from 'moment';

function OrderDetails({ order, onClose, onDelete, onUpdate }) {
    const [editData, setEditData] = useState({ ...order });
    const [isEditing, setIsEditing] = useState(false);

    const handleInputChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const handleUpdate = () => {
        onUpdate(editData, order._id);
        setIsEditing(false);
    };

    return (
        <>
            <div className="DetailsContainer">
                {isEditing ? (
                    <div className="EditForm">
                        <input
                            type="text"
                            name="orderName"
                            value={editData.orderName}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="orderDescription"
                            value={editData.orderDescription}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="orderAmount"
                            value={editData.orderAmount}
                            onChange={handleInputChange}
                        />
                        <select
                            name="orderVAT"
                            value={editData.orderVAT}
                            onChange={handleInputChange}
                        >
                            <option value={true}>True</option>
                            <option value={false}>False</option>
                        </select>
                        <input
                            type="text"
                            name="orderAddress"
                            value={editData.orderAddress}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="orderCity"
                            value={editData.orderCity}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="orderDeadline"
                            value={editData.orderDeadline}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="orderType"
                            value={editData.orderType}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="orderStatus"
                            value={editData.orderStatus}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="orderCompany"
                            value={editData.orderCompany}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="orderCompanyAbbreviation"
                            value={editData.orderCompanyAbbreviation}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="orderContact"
                            value={editData.orderContact}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="orderPhone"
                            value={editData.orderPhone}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="orderDate"
                            value={editData.orderDate}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="orderAcquisition"
                            value={editData.orderAcquisition}
                            onChange={handleInputChange}
                        />

                        <button className="SaveButton" onClick={handleUpdate}>Save Changes</button>
                        <button className="CancleButton" onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                ) : (
                    <div className="DetailsDiv">
                        <div className="DivInfoTop">
                            <div className="HeaderDetailsName">Quick overview</div>
                            <button className='EditButton' onClick={() => setIsEditing(true)}>
                                <svg width="22" height="22" viewBox="0 0 19 19" fill="none">
                                    <path d="M4 5H3C2.46957 5 1.96086 5.21071 1.58579 5.58579C1.21071 5.96086 1 6.46957 1 7V16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H12C12.5304 18 13.0391 17.7893 13.4142 17.4142C13.7893 17.0391 14 16.5304 14 16V15" stroke="#959595" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M13 3.00011L16 6.00011M17.385 4.58511C17.7788 4.19126 18.0001 3.65709 18.0001 3.10011C18.0001 2.54312 17.7788 2.00895 17.385 1.61511C16.9912 1.22126 16.457 1 15.9 1C15.343 1 14.8088 1.22126 14.415 1.61511L6 10.0001V13.0001H9L17.385 4.58511Z" stroke="#959595" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <div className="Div2Center">
                            <button className='CloseButton' onClick={onClose}>Close</button>
                        </div>
                        <p>Order Name: </p>{order.orderName}
                        <p>Order Description: </p>{order.orderDescription}
                        <p>Order Deadline: </p>{moment(order.orderDeadline).format('MMMM Do YYYY')}
                        <p>Order Amount: </p>{order.orderAmount && (
                            <div>
                                {`${Number(order.orderAmount).toFixed(0)}€`}
                            </div>
                        )}
                        <p>Order VAT: </p>{order.orderVAT}
                        <p>Order Company: </p>{order.orderCompany}
                        <p>Order Company Abbreviation: </p>{order.orderCompanyAbbreviation}
                        <p>Order Address: </p>{order.orderAddress}
                        <p>Order City: </p>{order.orderCity}
                        <p>Order Status: </p>{order.orderStatus}
                        <p>Order Type: </p>{order.orderType}
                        <p>Order Contact: </p>{order.orderContact}
                        <p>Order Phone: </p>{order.orderPhone}
                        <p>Order Date: </p>{moment(order.orderDate).format('MMMM Do YYYY')}
                        <p>Order Acquisition: </p>{order.orderAcquisition}
                        <div className="Div2Center">
                            {/* <button className='CloseButton' onClick={onClose}>Close</button> */}
                            <button className='DeleteButton' onClick={() => {
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



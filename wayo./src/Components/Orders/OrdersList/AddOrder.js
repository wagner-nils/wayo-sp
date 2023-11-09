import React, { useState } from 'react';
import './AddOrder.css';

function AddOrder({ onClose, onSubmit }) {
    const [newOrder, setNewOrder] = useState({
        orderName: '',
        orderDescription: '',
        orderDeadline: '',
        orderAmount: '',
        orderVAT: '',
        orderAddress: '',
        orderCity: '',
        orderType: '',
        orderStatus: '',
        orderCompany: '',
        orderCompanyAbbreviation: '',
        orderContact: '',
        orderPhone: '',
        orderDate: '',
        orderAcquisition: '',
    });

    const handleChange = (e) => {
        setNewOrder({ ...newOrder, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(newOrder);
        onClose();
    };

    return (
        <div className='modalStyle'>
            <div className='modalContentStyle'>
                <span className='closeButtonStyle' onClick={onClose}>&times;</span>
                <form onSubmit={handleSubmit}>
                    <label>
                        Order Name:
                        <input type="text" name="orderName" value={newOrder.orderName} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Order Description:
                        <input type="text" name="orderDescription" value={newOrder.orderDescription} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Order Deadline:
                        <input type="date" name="orderDeadline" value={newOrder.orderDeadline} onChange={handleChange} />
                    </label>
                    <br />
                    
                    <label>
                        Order Amount:
                        <input type="number" name="orderAmount" value={newOrder.orderAmount} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Order VAT:
                        <input type="boolean" name="orderVAT" value={newOrder.orderVAT} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Order Address:
                        <input type="text" name="orderAddress" value={newOrder.orderAddress} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Order City:
                        <input type="text" name="orderCity" value={newOrder.orderCity} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Order Type:
                        <input type="text" name="orderType" value={newOrder.orderType} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Order Status:
                        <input type="text" name="orderStatus" value={newOrder.orderStatus} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Order Company:
                        <input type="text" name="orderCompany" value={newOrder.orderCompany} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Order Company Abbreviation:
                        <input type="text" name="orderCompanyAbbreviation" value={newOrder.orderCompanyAbbreviation} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Order Contact:
                        <input type="text" name="orderContact" value={newOrder.orderContact} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Order Phone:
                        <input type="number" name="orderPhone" value={newOrder.orderPhone} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Order Date:
                        <input type="date" name="orderDate" value={newOrder.orderDate} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Order Acquisition:
                        <input type="text" name="orderAcquisition" value={newOrder.orderAcquisition} onChange={handleChange} />
                    </label>
                    <br />
                    <button type="submit">Add Order</button>
                </form>
            </div>
        </div>
    );
}

export default AddOrder;

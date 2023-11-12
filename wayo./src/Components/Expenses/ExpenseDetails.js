import React, { useState } from 'react';

function ExpenseDetails({ expense, onClose, onDelete, onUpdate }) {
    const [editData, setEditData] = useState({ ...expense });
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
                {isEditing ? (
                    <div className="EditForm">
                        {/* Editable fields for expense details */}
                        <input type="text" name="expenseName" value={editData.expenseName} onChange={handleInputChange} />
                        <input type="text" name="expenseDescription" value={editData.expenseDescription} onChange={handleInputChange} />
                        <input type="number" name="expenseAmount" value={editData.expenseAmount} onChange={handleInputChange} />
                        <input type="number" name="expenseVAT" value={editData.expenseVAT} onChange={handleInputChange} />
                        <input type="text" name="expenseAddress" value={editData.expenseAddress} onChange={handleInputChange} />
                        <input type="date" name="expenseDate" value={editData.expenseDate} onChange={handleInputChange} />
                        <input type="text" name="expenseType" value={editData.expenseType} onChange={handleInputChange} />
                        <input type="number" name="expenseInterval" value={editData.expenseInterval} onChange={handleInputChange} />
                        <input type="text" name="expenseStatus" value={editData.expenseStatus} onChange={handleInputChange} />
                        <input type="text" name="expenseCompany" value={editData.expenseCompany} onChange={handleInputChange} />
                        <input type="text" name="expenseCompanyAbbreviation" value={editData.expenseCompanyAbbreviation} onChange={handleInputChange} />
                        
                        <button className="SaveButton" onClick={handleUpdate}>Save Changes</button>
                        <button className="CancelButton" onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                ) : (
                    <div className="DetailsDiv">
                        <div className="DivInfoTop">
                            <div className="HeaderDetailsName">Expense Details</div>
                            <button className="EditButton" onClick={() => setIsEditing(true)}>Edit</button>
                        </div>
                        {/* Display expense details */}
                        <p>Name: {expense.expenseName}</p>
                        <p>Description: {expense.expenseDescription}</p>
                        <p>Amount: {expense.expenseAmount}</p>
                        <p>VAT: {expense.expenseVAT}</p>
                        <p>Address: {expense.expenseAddress}</p>
                        <p>Date: {new Date(expense.expenseDate).toLocaleDateString()}</p>
                        <p>Type: {expense.expenseType}</p>
                        <p>Interval: {expense.expenseInterval}</p>
                        <p>Status: {expense.expenseStatus}</p>
                        <p>Company: {expense.expenseCompany}</p>
                        <p>Company Abbreviation: {expense.expenseCompanyAbbreviation}</p>
                        <button className="DeleteButton" onClick={() => onDelete(expense._id)}>Delete</button>
                        <button className="CloseButton" onClick={onClose}>Close</button>
                    </div>
                )}
            </div>
        </>
    );
}

export default ExpenseDetails;

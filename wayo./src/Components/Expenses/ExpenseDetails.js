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
                        <p>Name: </p>{expense.expenseName}
                        <p>Description: </p>{expense.expenseDescription}
                        <p>Amount: </p>{expense.expenseAmount}
                        <p>VAT: </p>{expense.expenseVAT}
                        <p>Address: </p>{expense.expenseAddress}
                        <p>Date: </p>{new Date(expense.expenseDate).toLocaleDateString()}
                        <p>Type: </p>{expense.expenseType}
                        <p>Interval: </p>{expense.expenseInterval}
                        <p>Status: </p>{expense.expenseStatus}
                        <p>Company: </p>{expense.expenseCompany}
                        <p>Company Abbreviation: </p>{expense.expenseCompanyAbbreviation}
                        <button className="DeleteButton" onClick={() => onDelete(expense._id)}>Delete</button>
                        <button className="CloseButton" onClick={onClose}>Close</button>
                    </div>
                )}
            </div>
        </>
    );
}

export default ExpenseDetails;

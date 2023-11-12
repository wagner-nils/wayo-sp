import React, { useState } from 'react';

function AddExpense({ onSubmit, onClose }) {
    const [newExpense, setNewExpense] = useState({
        expenseName: '',
        expenseDescription: '',
        expenseAmount: 0,
        expenseVAT: 0,
        expenseAddress: '',
        expenseDate: '',
        expenseType: '',
        expenseInterval: 0,
        expenseStatus: '',
        expenseCompany: '',
        expenseCompanyAbbreviation: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewExpense({ ...newExpense, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(newExpense);
        onClose();
    };

    return (
        <div className="modalStyle">
            <div className="modalContentStyle">
                <span className="closeButtonStyle" onClick={onClose}>&times;</span>
                <form onSubmit={handleSubmit}>
                    <label>
                        Expense Name:
                        <input type="text" name="expenseName" value={newExpense.expenseName} onChange={handleChange} />
                    </label>
                    <label>
                        Description:
                        <input type="text" name="expenseDescription" value={newExpense.expenseDescription} onChange={handleChange} />
                    </label>
                    <label>
                        Amount:
                        <input type="number" name="expenseAmount" value={newExpense.expenseAmount} onChange={handleChange} />
                    </label>
                    <label>
                        VAT:
                        <input type="number" name="expenseVAT" value={newExpense.expenseVAT} onChange={handleChange} />
                    </label>
                    <label>
                        Address:
                        <input type="text" name="expenseAddress" value={newExpense.expenseAddress} onChange={handleChange} />
                    </label>
                    <label>
                        Date:
                        <input type="date" name="expenseDate" value={newExpense.expenseDate} onChange={handleChange} />
                    </label>
                    <label>
                        Type:
                        <input type="text" name="expenseType" value={newExpense.expenseType} onChange={handleChange} />
                    </label>
                    <label>
                        Interval:
                        <input type="number" name="expenseInterval" value={newExpense.expenseInterval} onChange={handleChange} />
                    </label>
                    <label>
                        Status:
                        <input type="text" name="expenseStatus" value={newExpense.expenseStatus} onChange={handleChange} />
                    </label>
                    <label>
                        Company:
                        <input type="text" name="expenseCompany" value={newExpense.expenseCompany} onChange={handleChange} />
                    </label>
                    <label>
                        Company Abbreviation:
                        <input type="text" name="expenseCompanyAbbreviation" value={newExpense.expenseCompanyAbbreviation} onChange={handleChange} />
                    </label>
                    <button className="submit" type="submit">Add Expense</button>
                </form>
            </div>
        </div>
    );
}

export default AddExpense;

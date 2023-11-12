import React, { useState } from 'react';

function AddExpense({ onSubmit, onClose }) {
    const [expense, setExpense] = useState({
        expenseName: '',
        expenseAmount: 0,
        // here mor missing
    });

    const handleChange = (e) => {
        setExpense({ ...expense, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(expense);
        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="expenseName"
                value={expense.expenseName}
                onChange={handleChange}
                placeholder="Expense Name"
            />
            <input
                type="number"
                name="expenseAmount"
                value={expense.expenseAmount}
                onChange={handleChange}
                placeholder="Amount"
            />
            {/* Add other input fields as needed */}
            <button type="submit">Add Expense</button>
            <button onClick={onClose}>Cancel</button>
        </form>
    );
}

export default AddExpense;

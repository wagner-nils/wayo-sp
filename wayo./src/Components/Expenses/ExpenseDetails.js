import React from 'react';

function ExpenseDetails({ expense, onUpdate, onDelete }) {
    return (
        <div>
            <h2>{expense.expenseName}</h2>
            <p>Amount: {expense.expenseAmount}</p>
            {/* Display other expense details */}
            <button onClick={() => onUpdate(expense)}>Update</button>
            <button onClick={() => onDelete(expense._id)}>Delete</button>
        </div>
    );
}

export default ExpenseDetails;

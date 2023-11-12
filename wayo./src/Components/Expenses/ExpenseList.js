import React from 'react';

function ExpenseList({ expenses, onSelectExpense }) {
    return (
        <div>
            {expenses.map(expense => (
                <div key={expense._id} onClick={() => onSelectExpense(expense)}>
                    {expense.expenseName} - {expense.expenseAmount}
                </div>
            ))}
        </div>
    );
}

export default ExpenseList;

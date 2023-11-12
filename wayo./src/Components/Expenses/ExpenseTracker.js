import React, { useState, useEffect } from 'react';
import ExpenseList from './ExpenseList';
import AddExpense from './AddExpense';
import ExpenseDetails from './ExpenseDetails';
import './ExpenseTracker.css';

function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [showAddExpense, setShowAddExpense] = useState(false);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await fetch('http://localhost:3001/expenses');
      const data = await response.json();
      setExpenses(data);
    } catch (err) {
      console.error('Error fetching expenses:', err);
    }
  };

  const handleAddExpense = async (expense) => {
    try {
      await fetch('http://localhost:3001/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(expense),
      });
      fetchExpenses();
    } catch (err) {
      console.error('Error adding expense:', err);
    }
  };

  const handleSelectExpense = (expense) => {
    setSelectedExpense(expense);
  };

  const handleUpdateExpense = async (updatedExpense) => {
    try {
      await fetch(`http://localhost:3001/expenses/${updatedExpense._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedExpense),
      });
      fetchExpenses();
    } catch (err) {
      console.error('Error updating expense:', err);
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      await fetch(`http://localhost:3001/expenses/${expenseId}`, {
        method: 'DELETE',
      });
      fetchExpenses();
    } catch (err) {
      console.error('Error deleting expense:', err);
    }
  };

  return (
    <>
      <div className="header">Expenses</div>
      <div>Track your Expenses</div>;
      <div className='MainSection'>
        <h1>Expense Tracker</h1>
        <button onClick={() => setShowAddExpense(true)}>Add Expense</button>
        {showAddExpense && (
          <AddExpense onSubmit={handleAddExpense} onClose={() => setShowAddExpense(false)} />
        )}
        <ExpenseList expenses={expenses} onSelectExpense={handleSelectExpense} />
        {selectedExpense && (
          <ExpenseDetails
            expense={selectedExpense}
            onUpdate={handleUpdateExpense}
            onDelete={handleDeleteExpense}
          />
        )}
      </div>
    </>
  );
}

export default ExpenseTracker;

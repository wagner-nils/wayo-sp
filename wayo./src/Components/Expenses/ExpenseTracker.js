import React, { useState, useEffect } from 'react';
import ExpenseList from './ExpenseList';
import AddExpense from './AddExpense';
import ExpenseDetails from './ExpenseDetails';
import './ExpenseTracker.css';

function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

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
      setShowAddExpense(false);
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
      setSelectedExpense(null);
    } catch (err) {
      console.error('Error deleting expense:', err);
    }
  };

  return (
    <>
      <div className="header">Expense Tracker</div>
      <div className="LeftSection">
        <div className="DivList">
          <div className="OrderListTitle">Expenses</div>
          <button className="AddButton" onClick={() => setShowAddExpense(true)}>Add Expense</button>
        </div>
        <div className="OrderList">
          <ExpenseList expenses={expenses} onSelectExpense={handleSelectExpense} />
        </div>
      </div>
      {showAddExpense && (
        <AddExpense
          onClose={() => setShowAddExpense(false)}
          onSubmit={handleAddExpense}
        />
      )}

      <div className="RightSection">
        {selectedExpense && (
          <ExpenseDetails
            expense={selectedExpense}
            onClose={() => setSelectedExpense(null)}
            onDelete={handleDeleteExpense}
            onUpdate={handleUpdateExpense}
          />
        )}
      </div>
    </>
  );
}

export default ExpenseTracker;

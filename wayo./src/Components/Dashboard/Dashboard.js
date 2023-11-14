import React, { useState, useEffect } from "react";
import RevenueTimeline from "./RevenueTimeline";
import RevenueNumbers from "./RevenueNumbers";
import "./Dashboard.css";

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [startingBalance, setStartingBalance] = useState(0);

  useEffect(() => {
    fetchOrders();
    fetchExpenses();
  }, []);

  useEffect(() => {
    if (orders.length && expenses.length) {
      const balance = calculateStartingBalance();
      setStartingBalance(balance);
    }
  }, [orders, expenses]);

  const calculateStartingBalance = () => {
    const lastYear = new Date().getFullYear() - 1;
    const endOfLastYear = new Date(lastYear, 11, 31); // December 31st of the previous year

    let balance = 0;

    orders.forEach(order => {
      const orderDate = new Date(order.orderDeadline);
      if (orderDate <= endOfLastYear) {
        balance += order.orderAmount;
      }
    });

    expenses.forEach(expense => {
      const expenseDate = new Date(expense.expenseDate);
      if (expenseDate <= endOfLastYear) {
        balance -= expense.expenseAmount;
      }
    });

    return balance;
  };

  const fetchOrders = () => {
    fetch('http://localhost:3001/orders')
      .then(response => response.json())
      .then(data => setOrders(data))
      .catch(err => console.error('Error fetching orders:', err));
  };

  const fetchExpenses = () => {
    fetch('http://localhost:3001/expenses')
      .then(response => response.json())
      .then(data => setExpenses(data))
      .catch(err => console.error('Error fetching expenses:', err));
  };

  return (
    <>
      <div className="header">KPI Dashboard</div>

      <div className="alignment">

        <div className="LeftDashboard">
          <RevenueNumbers orders={orders} expenses={expenses} />
        </div>

        <div className="RightDashboard">
          <RevenueTimeline orders={orders} expenses={expenses} startingBalance={startingBalance} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;

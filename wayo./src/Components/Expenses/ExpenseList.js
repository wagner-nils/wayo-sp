import React, { useState } from 'react';
import moment from 'moment';

function ExpenseList({ expenses, onSelectExpense }) {
    const [selectedYear, setSelectedYear] = useState(moment().year());
    const [selectedMonth, setSelectedMonth] = useState('All');

    const years = [...new Set(expenses.map(exp => moment(exp.expenseDate).year()))];
    const months = ['All', ...moment.months()];

    const generateIntervalExpenses = (expense) => {
        let dates = [expense];
        if (expense.expenseInterval > 0) {
            for (let i = 1; i < expense.expenseInterval; i++) {
                const newDate = moment(expense.expenseDate).add(6 / expense.expenseInterval * i, 'months');
                dates.push({ ...expense, expenseDate: newDate.toDate() });
            }
        }
        return dates;
    };

    const allExpenses = expenses.flatMap(generateIntervalExpenses);

    const filteredExpenses = allExpenses
        .filter(exp => {
            const expMoment = moment(exp.expenseDate);
            const matchesYear = selectedYear === 'All' || expMoment.year() === Number(selectedYear);
            const matchesMonth = selectedMonth === 'All' || expMoment.format('MMMM') === selectedMonth;
            return matchesYear && matchesMonth;
        })
        .sort((a, b) => moment(a.expenseDate).diff(b.expenseDate)); // Sort by date ascending

    return (
        <div>
            <select onChange={(e) => setSelectedYear(e.target.value)} value={selectedYear}>
                <option value="All">All Years</option>
                {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>

            <select onChange={(e) => setSelectedMonth(e.target.value)} value={selectedMonth}>
                {months.map((month, i) => (
                    <option key={i} value={month}>{month}</option>
                ))}
            </select>

            <div className="list">
                {filteredExpenses.map((expense, index) => (
                    <div key={`${expense._id}-${index}`} className="expense-item" onClick={() => onSelectExpense(expense)}>
                        <div className="expense-detail">
                            <div className="expense-name">{expense.expenseName}</div>
                            <div className="expense-amount">{expense.expenseAmount.toFixed(2)} €</div>
                            <div className="expense-date">{moment(expense.expenseDate).format('DD.MM.YYYY')}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ExpenseList;

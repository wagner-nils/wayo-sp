import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const RevenueTimeline = ({ orders = [], expenses = [], startingBalance }) => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [showMonthly, setShowMonthly] = useState(true);

    if (!orders.length || !expenses.length) {
        return <div>Data is loading or not available.</div>;
    }

    const getWeekOfYear = (date) => {
        const startOfYear = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date - startOfYear) / 86400000; // 86400000 ms in a day
        return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
    };

    const aggregateData = (data, dateExtractor, amountExtractor) => {
        let monthlyData = new Array(12).fill(0);
        let weeklyData = new Array(52).fill(0);

        data.forEach(item => {
            const date = dateExtractor(item);
            if (date.getFullYear() === selectedYear) {
                const month = date.getMonth();
                monthlyData[month] += amountExtractor(item);

                const week = getWeekOfYear(date);
                weeklyData[week - 1] += amountExtractor(item);
            }
        });

        return { monthlyData, weeklyData };
    };

    const calculateBalance = (revenueData, expenseData) => {
        let balance = startingBalance;
        return revenueData.map((revenue, index) => {
            balance += revenue - (expenseData[index] || 0);
            return balance;
        });
    };

    const { monthlyData: monthlyRevenueData, weeklyData: weeklyRevenueData } =
        aggregateData(orders, order => new Date(order.orderDeadline), order => order.orderAmount);

    const { monthlyData: monthlyExpenseData, weeklyData: weeklyExpenseData } =
        aggregateData(expenses, expense => new Date(expense.expenseDate), expense => expense.expenseAmount);

    const monthlyBalanceData = calculateBalance(monthlyRevenueData, monthlyExpenseData);
    const weeklyBalanceData = calculateBalance(weeklyRevenueData, weeklyExpenseData);

    const data = {
        labels: showMonthly ? monthNames : Array.from({ length: 52 }, (_, i) => `W${i + 1}`),
        datasets: [
            {
                label: showMonthly ? `Monthly Revenue for ${selectedYear}` : `Weekly Revenue for ${selectedYear}`,
                data: showMonthly ? monthlyRevenueData : weeklyRevenueData,
                borderColor: '#79FF8E',
                backgroundColor: '#79FF8E',
            },
            {
                label: showMonthly ? `Monthly Expenses for ${selectedYear}` : `Weekly Expenses for ${selectedYear}`,
                data: showMonthly ? monthlyExpenseData : weeklyExpenseData,
                borderColor: '#d20104',
                backgroundColor: '#d20104',
            },
            {
                label: showMonthly ? `Monthly Balance for ${selectedYear}` : `Weekly Balance for ${selectedYear}`,
                data: showMonthly ? monthlyBalanceData : weeklyBalanceData,
                borderColor: '#030D2A',
                backgroundColor: '#030D2A',
            }
        ],
    };

    const years = [...new Set(orders.concat(expenses).map(item => new Date(item.orderDeadline || item.expenseDate).getFullYear()))].sort();

    return (
        <div className='Graphics'>
            <div>
                <h2>Revenue Timeline</h2>
                <div className='subHeadings'>
                <label>
                    Select Year:
                    <select value={selectedYear} onChange={e => setSelectedYear(parseInt(e.target.value, 10))}>
                        {years.map(year => <option key={year} value={year}>{year}</option>)}
                    </select>
                </label>
                <button className= "timeSelection" onClick={() => setShowMonthly(!showMonthly)}>
                    {showMonthly ? 'Switch to Weekly View' : 'Switch to Monthly View'}
                </button>
                </div>
            </div>
            <Line data={data} />
        </div>
    );
};

export default RevenueTimeline;


// In week 52 of 2023 the balance is -27000 EUR, not 0. Therefore the balance in January 1st should be also -27000 EUR, not 0. fix this!

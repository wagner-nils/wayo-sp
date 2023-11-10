import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './RevenueTimeline.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const RevenueTimeline = ({ orders }) => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [showMonthly, setShowMonthly] = useState(true);

    const getWeekOfYear = (date) => {
        const startOfYear = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date - startOfYear) / 86400000; // 86400000 ms in a day
        return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
    };

    const getRevenueData = (year) => {
        let monthlyRevenueData = new Array(12).fill(0);
        let weeklyRevenueData = new Array(52).fill(0);

        orders.forEach(order => {
            const orderDate = new Date(order.orderDeadline);
            if (orderDate.getFullYear() === year) {
                const month = orderDate.getMonth();
                monthlyRevenueData[month] += order.orderAmount;

                const week = getWeekOfYear(orderDate);
                weeklyRevenueData[week - 1] += order.orderAmount;
            }
        });

        return { monthlyRevenueData, weeklyRevenueData };
    };

    const { monthlyRevenueData, weeklyRevenueData } = getRevenueData(selectedYear);

    const data = {
        labels: showMonthly ? monthNames : Array.from({ length: 52 }, (_, i) => `W${i + 1}`),
        datasets: [{
            label: showMonthly ? `Monthly Revenue for ${selectedYear}` : `Weekly Revenue for ${selectedYear}`,
            data: showMonthly ? monthlyRevenueData : weeklyRevenueData,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
        }],
    };

    const years = [...new Set(orders.map(order => new Date(order.orderDeadline).getFullYear()))].sort();

    return (
        <div className='Graphics'>
            <div>
                <h2>Revenue Timeline</h2>
                <label>
                    Select Year:
                    <select value={selectedYear} onChange={e => setSelectedYear(parseInt(e.target.value, 10))}>
                        {years.map(year => <option key={year} value={year}>{year}</option>)}
                    </select>
                </label>
                <button onClick={() => setShowMonthly(!showMonthly)}>
                    {showMonthly ? 'Switch to Weekly View' : 'Switch to Monthly View'}
                </button>
            </div>
            <Line data={data} />
        </div>
    );
};

export default RevenueTimeline;

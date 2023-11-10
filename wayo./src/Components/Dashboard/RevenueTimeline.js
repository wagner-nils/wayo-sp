import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import "./Dashboard.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const RevenueTimeline = ({ orders }) => {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const handleYearChange = (e) => {
        setSelectedYear(parseInt(e.target.value, 10));
    };
    // Helper function to determine the week of the year for a given date
    const getWeekOfYear = (date) => {
        const startOfYear = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date - startOfYear) / 86400000; // 86400000ms in a day
        return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
    };

    // Extract unique years from orders
    const getYearsFromOrders = (orders) => {
        const years = new Set();
        orders.forEach(order => {
            years.add(new Date(order.orderDeadline).getFullYear());
        });
        return Array.from(years).sort((a, b) => a - b);
    };

    const years = getYearsFromOrders(orders);

    const getRevenueData = (orders, year) => {
        const weeklyRevenueData = Array.from({ length: 52 }, () => 0);
        const monthlyRevenueData = Array.from({ length: 12 }, () => 0);

        orders.forEach(order => {
            const orderDate = new Date(order.orderDeadline);
            const orderYear = orderDate.getFullYear();

            if (orderYear === year) {
                const week = getWeekOfYear(orderDate);
                const month = orderDate.getMonth();

                weeklyRevenueData[week - 1] += order.orderAmount; // Add weekly revenue
                monthlyRevenueData[month] += order.orderAmount;
            }
        });

        return { weekly: weeklyRevenueData, monthly: monthlyRevenueData };
    };


    const { weekly: weeklyRevenueData, monthly: monthlyRevenueData } = getRevenueData(orders, selectedYear);

    const correctedMonthlyRevenue = Array.from({ length: 52 }, (_, weekIndex) => {
        const monthIndex = Math.floor((weekIndex / 52) * 12); // Spread monthly data evenly
        const monthlyValue = monthlyRevenueData[monthIndex];
        const nextMonthValue = monthlyRevenueData[(monthIndex + 1) % 12]; // Circular index
        const fractionOfNextMonth = (weekIndex % (52 / 12)) / (52 / 12); // Linear interpolation factor
        return monthlyValue + (nextMonthValue - monthlyValue) * fractionOfNextMonth;
    });

    const monthlyRevenueData52 = correctedMonthlyRevenue; // Assign to the variable


    // Prepare data for chart
    const data = {
        labels: Array.from({ length: 52 }, (_, weekIndex) => `W${weekIndex + 1}`), // Weeks from 1 to 52
        datasets: [
            {
                label: `Weekly Revenue for ${selectedYear}`,
                data: weeklyRevenueData,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
            },
            {
                label: `Monthly Revenue for ${selectedYear}`,
                data: (monthlyRevenueData52),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return (
        <div>
            <h2>Revenue Timeline</h2>
            <div>
                <label>
                    Select Year:
                    <select value={selectedYear} onChange={handleYearChange}>
                        {years.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </label>
            </div>
            <Line data={data} />
        </div>
    );
};

export default RevenueTimeline;

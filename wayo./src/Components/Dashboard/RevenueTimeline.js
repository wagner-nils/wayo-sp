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

    // Extract unique years from orders
    const getYearsFromOrders = (orders) => {
        const years = new Set();
        orders.forEach(order => {
            years.add(new Date(order.orderDeadline).getFullYear());
        });
        return Array.from(years).sort((a, b) => a - b); // Sorted years
    };

    const years = getYearsFromOrders(orders);

    // Update to calculate weekly revenue
    const getWeeklyRevenueData = (orders, year) => {
        const weeklyRevenueData = {};

        // Initialize weeklyRevenueData for each week of the year
        for (let week = 1; week <= 52; week++) {
            weeklyRevenueData[week] = 0;
        }

        orders.forEach(order => {
            const orderDate = new Date(order.orderDeadline);
            const orderYear = orderDate.getFullYear();

            if (orderYear === year) {
                const week = getWeekOfYear(orderDate);
                weeklyRevenueData[week] += order.orderAmount;
            }
        });

        return Object.values(weeklyRevenueData); // Convert to an array of weekly revenue values
    };

    // Helper function to determine the week of the year for a given date
    const getWeekOfYear = (date) => {
        const startOfYear = new Date(date.getFullYear(), 0, 1);
        const diff = date - startOfYear;
        const oneWeek = 7 * 24 * 60 * 60 * 1000;
        return Math.ceil(diff / oneWeek);
    };

    const weeklyRevenueData = getWeeklyRevenueData(orders, selectedYear);

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

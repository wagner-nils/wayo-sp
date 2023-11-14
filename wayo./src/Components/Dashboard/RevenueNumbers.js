import React, { useState, useEffect } from 'react';

const RevenueNumbers = ({ orders = [], expenses = [] }) => {
    const [selectedYear, setSelectedYear] = useState('All Years');
    const [selectedMonth, setSelectedMonth] = useState('All Months');

    //helpers
    const generateYearOptions = () => {
        const orderYears = new Set(orders.map((order) => new Date(order.orderDeadline).getFullYear()));
        const expenseYears = new Set(expenses.map((expense) => new Date(expense.expenseDate).getFullYear()));

        const allYears = Array.from(new Set([...orderYears, ...expenseYears])).sort(); // Sort the years.
        const yearOptions = ['All Years', ...allYears];
        return yearOptions;
    };

    const generateMonthOptions = () => {
        const months = new Set(
            orders.concat(expenses).map((item) => new Date(item.orderDate || item.expenseDate).getMonth())
        );
        const allMonths = Array.from(months).sort();
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        const sortedMonthNames = allMonths.map(month => monthNames[month]);

        return ['All Months', ...sortedMonthNames];
    };

    const filterData = (data) => {
        return data.filter((item) => {
            const itemDate = new Date(item.orderDate || item.expenseDate);
            const matchesYear =
                selectedYear === 'All Years' || itemDate.getFullYear() === parseInt(selectedYear);
            const matchesMonth =
                selectedMonth === 'All Months' || itemDate.getMonth() === parseInt(selectedMonth) - 1;
            return matchesYear && matchesMonth;
        });
    };


    // actual calculations
    const calculateProjectedProfits = () => {
        const filteredOrders = filterData(orders);
        const filteredExpenses = filterData(expenses);
        const totalOrderAmount = filteredOrders.reduce((sum, order) => sum + order.orderAmount, 0);
        const totalExpenseAmount = filteredExpenses.reduce((sum, expense) => sum + expense.expenseAmount, 0);
        return totalOrderAmount - totalExpenseAmount;
    };

    const calculateProjectedExpenses = () => {
        const filteredExpenses = filterData(expenses);
        const totalExpenseAmount = filteredExpenses.reduce((sum, expense) => sum + expense.expenseAmount, 0);
        return totalExpenseAmount;
    };

    const calculateVATToBePaid = () => {
        const filteredOrders = filterData(orders);
        const filteredExpenses = filterData(expenses);

        const orderVAT = filteredOrders.reduce((sum, order) => {
            return order.orderVAT ? sum + order.orderAmount * 0.19 : sum;
        }, 0);

        const expenseVAT = filteredExpenses.reduce((sum, expense) => {
            const vatRate = expense.expenseVAT / 100 + 1;
            return sum + (expense.expenseAmount / vatRate) * 0.19;
        }, 0);

        return orderVAT - expenseVAT;
    };

    const calculateCustomerAcquisitionCost = () => {
        const filteredOrders = filterData(orders);
        const filteredExpenses = filterData(expenses);
        const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.expenseAmount, 0);
        const nonFundOrders = filteredOrders.filter(order => order.orderType !== 'Funds').length;
        return totalExpenses / nonFundOrders;
    };

    const calculateAverageDealSize = () => {
        const filteredOrders = filterData(orders);
        const totalOrderAmount = filteredOrders.reduce((sum, order) => sum + order.orderAmount, 0);
        const numberOfOrders = filteredOrders.length;
        return numberOfOrders === 0 ? 0 : totalOrderAmount / numberOfOrders;
    };

    const calculateClientRetentionRate = () => {
        // Implement logic for client retention rate calculation here
        return 0;
    };

    const calculateSalesCycleLength = () => {
        const filteredOrders = filterData(orders);
        const totalDays = filteredOrders.reduce((sum, order) => {
            const orderDate = new Date(order.orderDate);
            const deadlineDate = new Date(order.orderDeadline);
            return sum + (deadlineDate - orderDate) / (1000 * 60 * 60 * 24);
        }, 0);

        return filteredOrders.length === 0 ? 0 : totalDays / filteredOrders.length;
    };

    const calculateEmployeeTurnoverRate = () => {
        const filteredOrders = filterData(orders);
        const totalOrderAmount = filteredOrders.reduce((sum, order) => sum + order.orderAmount, 0);
        return totalOrderAmount / 5; // Assuming 5 is a constant number of employees
    };

    const calculateAverageRevenuePerMonth = () => {
        const filteredOrders = filterData(orders);
        const totalOrderAmount = filteredOrders.reduce((sum, order) => sum + order.orderAmount, 0);

        const monthsCounted = filteredOrders.reduce((months, order) => {
            const date = new Date(order.orderDate);
            const monthYearKey = `${date.getFullYear()}-${date.getMonth()}`;
            months.add(monthYearKey);
            return months;
        }, new Set()).size;

        return monthsCounted === 0 ? 0 : totalOrderAmount / monthsCounted;
    };

    const totalRevenuePerYear = () => {
        const filteredOrders = filterData(orders);
        const totalOrderAmount = filteredOrders.reduce((sum, order) => sum + order.orderAmount, 0);
        const numberOfOrders = filteredOrders.length;
        return 0; // Implement your logic for total revenue per year calculation here
    };

    return (
        <>
            <div className="ButtonWrapper">
                <select className="selectorYear" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                    {generateYearOptions().map(year => <option key={year} value={year}>{year}</option>)}
                </select>
                <select className="selectorMonth" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                    {generateMonthOptions().map((month, index) => <option key={index} value={index}>{month}</option>)}
                </select>
            </div>
            <div className="ListNumbers">
                <div className="ProjectedProfits">Projected Profits</div>
                <div className="ProjectedProfits">{calculateProjectedProfits()}</div>
                <div className="ProjectedExpenses">Projected Expenses</div>
                <div className="ProjectedExpenses">{calculateProjectedExpenses()}</div>
                <div className="VATToBePayed">VAT to be payed</div>
                <div className="VATToBePayed">{calculateVATToBePaid()}</div>
                <div className="CustomerAcquisitionCost">CACost</div>
                <div className="CustomerAcquisitionCost">{calculateCustomerAcquisitionCost()}</div>
                <div className="AverageDealSize">Average Deal Size</div>
                <div className="AverageDealSize">{calculateAverageDealSize()}</div>
                <div className="ClientRetentionRate">Client Retention Rate</div>
                <div className="ClientRetentionRate">{calculateClientRetentionRate()}</div>
                <div className="SalesCycleLength">Sales Cycle Length</div>
                <div className="SalesCycleLength">{calculateSalesCycleLength()}</div>
                <div className="EmployeeTurnoverRate">Employee Turnover Rate</div>
                <div className="EmployeeTurnoverRate">{calculateEmployeeTurnoverRate()}</div>
                <div className="AverageRevenuePerMonth">Average Revenue Per Month</div>
                <div className="AverageRevenuePerMonth">{calculateAverageRevenuePerMonth()}</div>
                <div className="TotalRevenuePerYear">Total Revenue Per Year</div>
                <div className="TotalRevenuePerYear">{totalRevenuePerYear()}</div>
            </div>
        </>
    );
}

export default RevenueNumbers;

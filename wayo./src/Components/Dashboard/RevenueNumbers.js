import React, { useState } from 'react';
import numeral from 'numeral';
import './RevenueNumbers.css';

const RevenueNumbers = ({ orders = [], expenses = [] }) => {
    const [selectedYear, setSelectedYear] = useState('2024');
    const [selectedMonth, setSelectedMonth] = useState('All Months');

    //helpers
    const generateYearOptions = () => {
        const orderYears = new Set(
            orders.map((order) => new Date(order.orderDeadline).getFullYear())
        );
        const expenseYears = new Set(
            expenses.map((expense) => new Date(expense.expenseDate).getFullYear())
        );

        const allYears = Array.from(new Set([...orderYears, ...expenseYears])).sort();
        const yearOptions = ['All Years', ...allYears];
        return yearOptions;
    };

    const generateMonthOptions = () => {
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return ['All Months', ...monthNames];
    };

    const filterData = (data) => {
        return data.filter((item) => {
            const itemDate = new Date(item.orderDeadline || item.expenseDate);
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
        console.log(totalOrderAmount);
        const totalExpenseAmount = filteredExpenses.reduce((sum, expense) => sum + expense.expenseAmount, 0);
        return totalOrderAmount - totalExpenseAmount;
    };

    const calculateProjectedExpenses = () => {
        const filteredExpenses = filterData(expenses);
        const totalExpenseAmount = filteredExpenses.reduce((sum, expense) => sum + expense.expenseAmount, 0);
        return totalExpenseAmount;
    };

    const profitMargin = () => {
        return calculateProjectedProfits() / calculateProjectedExpenses();
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

        const yearsCounted = filteredOrders.reduce((years, order) => {
            const date = new Date(order.orderDate);
            const yearKey = `${date.getFullYear()}`;
            years.add(yearKey);
            return years;
        }, new Set()).size;

        return yearsCounted === 0 ? 0 : totalOrderAmount / yearsCounted;
    };

    // const calculatedRevenueYearToday = () => {
    //     const filteredOrders = filterData(orders);
    //     const totalOrderAmount = filteredOrders.reduce((sum, order) => sum + order.orderAmount, 0);
    // };

    const getOrderTypeDistribution = () => {
        const filteredOrders = filterData(orders);
        const orderTypes = filteredOrders.reduce((types, order) => {
            types[order.orderType] = types[order.orderType] + 1 || 1;
            return types;
        }, {});

        const totalOrders = Object.values(orderTypes).reduce((sum, count) => sum + count, 0);
        const orderTypeDistribution = Object.entries(orderTypes).map(([type, count]) => {
            const percentage = ((count / totalOrders) * 100).toFixed(2);
            return `${type}: ${percentage}%`;
        });

        return orderTypeDistribution.join('\n');
    }

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
                <div className="firstLine">
                    <div className="ProjectedProfits">
                        <div className='num'>{numeral(calculateProjectedProfits()).format('0,0€')}€</div>
                        Projected Profits
                    </div>
                    <div className="ProjectedExpenses">
                    <div className='num'>{numeral(calculateProjectedExpenses()).format('0,0€')}€</div>
                        Projected Expenses
                    </div>

                    <div className="ProfitMargin">
                    <div className='num'>{profitMargin().toFixed(2)}%</div>
                        Profit Margin
                    </div>
                </div>

                <div className="secondLine">
                    <div className="VATToBePayed">
                        <div className='num'>{calculateVATToBePaid()}</div>
                        VAT to be paid
                    </div>

                    <div className="CustomerAcquisitionCost">
                        <div className='num'>{calculateCustomerAcquisitionCost()}</div>
                        CAC
                    </div>

                    <div className="AverageDealSize">
                        <div className='num'>{calculateAverageDealSize()}</div>
                        Average Deal Size
                    </div>
                </div>

                <div className="thirdLine">
                    <div className="ClientRetentionRate">
                        <div className='num'>{calculateClientRetentionRate()}</div>
                        Client Retention Rate
                    </div>

                    <div className="SalesCycleLength">
                        <div className='num'>{calculateSalesCycleLength()}</div>
                        Sales Cycle Length
                    </div>

                    <div className="EmployeeTurnoverRate">
                        <div className='num'>{calculateEmployeeTurnoverRate()}</div>
                        Employee Turnover Rate
                    </div>
                </div>

                <div className="fourthLine">
                    <div className="AverageRevenuePerMonth">
                        <div className='num'>{calculateAverageRevenuePerMonth()}</div>
                        Average Revenue Per Month
                    </div>

                    <div className="TotalRevenuePerYear">
                        <div className='num'>{totalRevenuePerYear()}</div>
                        Total Revenue Per Year
                    </div>

                    <div className="OrderTypeDistribution">
                        <div>{getOrderTypeDistribution()}</div>
                        Order Type Distribution
                    </div>
                </div>
            </div>
        </>
    );
}

export default RevenueNumbers;

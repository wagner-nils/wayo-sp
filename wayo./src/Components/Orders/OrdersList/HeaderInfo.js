import React, { useEffect, useState } from 'react';
import './HeaderInfo.css';

function HeaderInfo() {
    const [ordersInProgress, setOrdersInProgress] = useState(0);
    const [ordersDueThisWeek, setOrdersDueThisWeek] = useState(0);
    const [monthlyRevenue, setMonthlyRevenue] = useState(0);

    useEffect(() => {
        fetch('http://localhost:3001/orders')
            .then(response => response.json())
            .then(data => {
                processOrdersData(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const processOrdersData = (orders) => {
        const currentWeekEndDate = new Date();
        currentWeekEndDate.setDate(currentWeekEndDate.getDate() + (7 - currentWeekEndDate.getDay()));
        const currentMonth = new Date().getMonth();

        let inProgress = 0;
        let dueThisWeek = 0;
        let revenueThisMonth = 0;

        orders.forEach(order => {
            if (order.orderStatus === 'in progress') {
                inProgress++;
            }

            const deadline = new Date(order.orderDeadline);
            if (deadline < currentWeekEndDate) {
                dueThisWeek++;
            }

            if (deadline.getMonth() === currentMonth) {
                revenueThisMonth += order.orderAmount;
            }
        });

        setOrdersInProgress(inProgress);
        setOrdersDueThisWeek(dueThisWeek);
        setMonthlyRevenue(revenueThisMonth.toFixed(2));
    };

    return (
        <>
            <div className="headBoxes">
                <div className="box1">
                    <div className="text1">
                        {ordersInProgress}
                    </div>
                    <div className="text2">
                        orders in progress
                    </div>
                </div>

                <div className="box2">
                    <div className="text1">
                        {ordersDueThisWeek}
                    </div>
                    <div className="text2">
                        orders due by end of week
                    </div>
                </div>

                <div className="box3">
                    <div className="text1">
                        {`${Number(monthlyRevenue).toFixed(0)}€`}                    
                        </div>
                    <div className="text2">
                        acquired revenue this month
                    </div>
                </div>
            </div>
        </>
    );
}

export default HeaderInfo;

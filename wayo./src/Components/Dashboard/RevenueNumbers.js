// import React, { useState, useEffect } from "react";


// function RevenueNumbers() {
//     const calculateRevenue = (orders, startMonth, endMonth) => {
//         let totalRevenue = 0;
//         let monthsCounted = 0;
//         orders.forEach(order => {
//             const deadlinePlusSeven = new Date(order.orderDeadline);
//             deadlinePlusSeven.setDate(deadlinePlusSeven.getDate() + 7);
//             if (deadlinePlusSeven >= startMonth && deadlinePlusSeven < endMonth) {
//                 totalRevenue += order.orderAmount;
//             }
//         });
//         for (let d = new Date(startMonth); d < endMonth; d.setMonth(d.getMonth() + 1)) {
//             monthsCounted++;
//         }
//         return totalRevenue / monthsCounted;
//     };

//     // average revenue next 12 months
//     const today = new Date();
//     const nextYear = new Date(today);
//     nextYear.setFullYear(nextYear.getFullYear() + 1);
//     const averageRevenueNext12Months = calculateRevenue(orders, today, nextYear);

//     // av revenue for current year
//     const startOfYear = new Date(today.getFullYear(), 0, 1);
//     const averageRevenueCurrentYear = calculateRevenue(orders, startOfYear, today);


//     return (
//         <>
//         <div className="ARn12m">{averageRevenueNext12Months}</div>
//         <div className="ARcy">{averageRevenueCurrentYear}</div>
//         </>
//     );

// }

// export default RevenueNumbers;





import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './RevenueTimeline.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const RevenueTimeline = ({ orders }) => {
    // calculate revenue
    const calculateRevenue = (orders, startMonth, endMonth) => {
        let totalRevenue = 0;
        let monthsCounted = 0;
        orders.forEach(order => {
            const deadlinePlusSeven = new Date(order.orderDeadline);
            deadlinePlusSeven.setDate(deadlinePlusSeven.getDate() + 7);
            if (deadlinePlusSeven >= startMonth && deadlinePlusSeven < endMonth) {
                totalRevenue += order.orderAmount;
            }
        });
        for (let d = new Date(startMonth); d < endMonth; d.setMonth(d.getMonth() + 1)) {
            monthsCounted++;
        }
        return totalRevenue / monthsCounted;
    };

    // average revenue next 12 months
    const today = new Date();
    const nextYear = new Date(today);
    nextYear.setFullYear(nextYear.getFullYear() + 1);
    const averageRevenueNext12Months = calculateRevenue(orders, today, nextYear);

    // av revenue for current year
    const startOfYear = new Date(today.getFullYear(), 0, 1);
    const averageRevenueCurrentYear = calculateRevenue(orders, startOfYear, today);

    // data for the chart
    const monthlyRevenueData = {};
    orders.forEach(order => {
        const month = new Date(order.orderDeadline).toLocaleString('default', { month: 'short' });
        monthlyRevenueData[month] = (monthlyRevenueData[month] || 0) + order.orderAmount;
    });

    const data = {
        labels: Object.keys(monthlyRevenueData),
        datasets: [
            {
                label: 'Monthly Revenue',
                data: Object.values(monthlyRevenueData),
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
            },
        ],
    };

    return (
        <>
            <div>
            <h2>Revenue Timeline</h2>
            <p className='ARn12'>Average Revenue (Next 12 Months): {averageRevenueNext12Months}</p>
            <p className='AR12'>Average Revenue (Current Year): {averageRevenueCurrentYear}</p>
            <Line data={data} />
        </div >
    
    </>
    
  );
};

export default RevenueTimeline;












// const RevenueTimeline = ({ orders }) => {
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//   const [data, setData] = useState({});

//   useEffect(() => {
//     const monthlyRevenueData = {};
//     orders.forEach(order => {
//       const orderDate = new Date(order.orderDeadline);
//       if (orderDate.getFullYear() === selectedYear) {
//         const month = orderDate.toLocaleString('default', { month: 'short' });
//         monthlyRevenueData[month] = (monthlyRevenueData[month] || 0) + order.orderAmount;
//       }
//     });

//     setData({
//       labels: Object.keys(monthlyRevenueData),
//       datasets: [
//         {
//           label: `Monthly Revenue for ${selectedYear}`,
//           data: Object.values(monthlyRevenueData),
//           borderColor: 'rgb(75, 192, 192)',
//           backgroundColor: 'rgba(75, 192, 192, 0.5)',
//         },
//       ],
//     });
//   }, [orders, selectedYear]);

//   const handleYearChange = (e) => {
//     setSelectedYear(parseInt(e.target.value, 10));
//   };

//   // Generate year options for the past 5 years
//   const yearOptions = [];
//   const currentYear = new Date().getFullYear();
//   for (let year = currentYear; year >= currentYear - 5; year--) {
//     yearOptions.push(<option key={year} value={year}>{year}</option>);
//   }

//   return (
//     <div>
//       <h2>Revenue Timeline</h2>
//       <div>
//         <label>
//           Select Year: 
//           <select value={selectedYear} onChange={handleYearChange}>
//             {yearOptions}
//           </select>
//         </label>
//       </div>
//       <Line data={data} />
//     </div>
//   );
// };

// export default RevenueTimeline;

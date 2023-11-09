import './OrderList.css';
import moment from 'moment';

export default function OrderList({ orders }) {
    const getMonthGroups = (orders) => {
        const groups = {};
        orders.forEach(order => {
            const month = moment(order.orderDeadline).format('MMMM YYYY');
            if (!groups[month]) {
                groups[month] = [];
            }
            groups[month].push(order);
        });
        return groups;
    };

    const sortedOrders = orders.sort((a, b) => moment(a.orderDeadline).diff(moment(b.orderDeadline)));
    const monthGroups = getMonthGroups(sortedOrders);

    return (
        <div className="list">
            {Object.keys(monthGroups).map(month => (
                <div key={month}>
                    <h2>{month}</h2>
                    {monthGroups[month].map(order => (
                        <div key={order.id} className="box">
                            <div className="overlap-group">
                                <div className="orderCompany">{order.orderCompany}</div>
                                <div className="orderCompanyAbbreviation">{order.orderCompanyAbbreviation}</div>
                                <div className="orderName">{order.orderName}</div>
                                <div className="orderDescription">{order.orderDescription}</div>
                                <div className="orderDeadline">Due: {moment(order.orderDeadline).format('MMMM Do YYYY')}</div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

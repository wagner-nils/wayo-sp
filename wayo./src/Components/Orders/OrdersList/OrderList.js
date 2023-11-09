import './OrderList.css';
import moment from 'moment';

export default function OrderList({ orders }) {
    const sortedOrders = orders.sort((a, b) => moment(a.orderDeadline).diff(moment(b.orderDeadline)));
    return (
        <div className="list">
            {sortedOrders.map((order) => {
                return (
                    <div key={order.id} className="box">
                        <div className="overlap-group">
                            <div className="orderCompany">{order.orderCompany}</div>
                            <div className="orderCompanyAbbreviation">{order.orderCompanyAbbreviation}</div>
                            <div className="orderName">{order.orderName}</div>
                            <div className="orderDescription">{order.orderDescription}</div>
                            <div className="orderDeadline">Due: {moment(order.orderDeadline).format('MMMM Do YYYY')}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
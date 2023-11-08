import './OrderList.css';
import moment from 'moment';

export default function OrderList({ orders }) {
    return (
        <div id="list">
            {orders.map((order, index) => {
                return (
                    <div key={order.id} className='Order'>
                        <div className='OrderName'>{order.orderName}</div>

                        <div className='OrderDate'>{moment(order.orderDate).format('MMMM Do YYYY')}</div>
                    </div>
                );
            })}
        </div>
    );
};
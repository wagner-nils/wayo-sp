import './OrderList.css';
import moment from 'moment';

export default function OrderList({ orders }) {
    return (
        <div id="list">
            {orders.map((order) => {
                return (
                    <div key={order.id} className='Thread'>
                        <div className='BigDate'>{moment(order.date).format("Do MMM")}</div>
                        <div className='Content'>
                            <div className='Title'>{order.title}</div>
                            <p className='timeLow'>{moment(order.date).format("LT")} - {moment(order.date).format("LL")}</p>
                            <p className='venLow'>{order.venue}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

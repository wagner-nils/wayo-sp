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



// export const Box = () => {
//   return (
//     <div className="box">
//       <div className="group">
//         <div className="overlap-group">
//           <div className="overlap">
//             <div className="text-wrapper">Deadline:</div>
//             <div className="div">7 days</div>
//           </div>
//           <div className="div-wrapper">
//             <div className="text-wrapper-2">INP</div>
//           </div>
//           <div className="overlap-2">
//             <div className="rectangle" />
//             <div className="rectangle-2" />
//             <img className="line" alt="Line" src="line-9.svg" />
//           </div>
//           <div className="overlap-3">
//             <div className="text-wrapper-3">INP - Feldkirchen 1</div>
//             <p className="p"> -- Here use {order.orderDescription} </p>
//           </div>
//           <div className="text-wrapper-4">Progress</div>
//           <div className="text-wrapper-5">80%</div>
//           <div className="text-wrapper-6">location analysis missing</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// .box {
//     height: 156px;
//     width: 883px;
//   }
  
//   .box .group {
//     height: 156px;
//     left: 0;
//     position: fixed;
//     top: 0;
//     width: 899px;
//   }
  
//   .box .overlap-group {
//     background-color: #ffffff;
//     border-radius: 15px;
//     box-shadow: 1px 4px 10px #00000013;
//     height: 156px;
//     position: relative;
//     width: 883px;
//   }
  
//   .box .overlap {
//     height: 28px;
//     left: 669px;
//     position: absolute;
//     top: 119px;
//     width: 183px;
//   }
  
//   .box .text-wrapper {
//     color: #959595;
//     font-family: "Source Sans Pro-Regular", Helvetica;
//     font-size: 18px;
//     font-weight: 400;
//     left: 0;
//     letter-spacing: 0;
//     line-height: 19.8px;
//     position: absolute;
//     top: 0;
//     width: 85px;
//   }
  
//   .box .div {
//     color: #959595;
//     font-family: "Source Sans Pro-Regular", Helvetica;
//     font-size: 18px;
//     font-weight: 400;
//     left: 84px;
//     letter-spacing: 0;
//     line-height: 19.8px;
//     position: absolute;
//     text-align: right;
//     top: 0;
//     width: 99px;
//   }
  
//   .box .div-wrapper {
//     background-color: #ffffff;
//     border-radius: 15px;
//     box-shadow: 1px 4px 10px #00000013;
//     height: 85px;
//     left: 28px;
//     position: absolute;
//     top: 35px;
//     width: 85px;
//   }
  
//   .box .text-wrapper-2 {
//     color: #030d2a;
//     font-family: "Outfit-Bold", Helvetica;
//     font-size: 30px;
//     font-weight: 700;
//     height: 85px;
//     left: 0;
//     letter-spacing: 0;
//     line-height: 33px;
//     position: absolute;
//     text-align: center;
//     top: 0;
//     width: 85px;
//   }
  
//   .box .overlap-2 {
//     height: 21px;
//     left: 503px;
//     position: absolute;
//     top: 60px;
//     width: 349px;
//   }
  
//   .box .rectangle {
//     background-color: #d9d9d9;
//     border-radius: 3.5px;
//     height: 6px;
//     left: 0;
//     position: absolute;
//     top: 15px;
//     width: 349px;
//   }
  
//   .box .rectangle-2 {
//     background-color: #78ff8e;
//     border-radius: 3.5px;
//     height: 6px;
//     left: 0;
//     position: absolute;
//     top: 15px;
//     width: 249px;
//   }
  
//   .box .line {
//     height: 21px;
//     left: 249px;
//     position: absolute;
//     top: 0;
//     width: 3px;
//   }
  
//   .box .overlap-3 {
//     height: 101px;
//     left: 130px;
//     position: absolute;
//     top: 27px;
//     width: 365px;
//   }
  
//   .box .text-wrapper-3 {
//     color: #000000;
//     font-family: "Source Sans Pro-SemiBold", Helvetica;
//     font-size: 22px;
//     font-weight: 600;
//     height: 52px;
//     left: 0;
//     letter-spacing: 0;
//     line-height: 24.2px;
//     position: absolute;
//     top: 0;
//     width: 365px;
//   }
  
//   .box .p {
//     color: #959595;
//     font-family: "Source Sans Pro-Regular", Helvetica;
//     font-size: 18px;
//     font-weight: 400;
//     left: 0;
//     letter-spacing: 0;
//     line-height: 19.8px;
//     position: absolute;
//     top: 46px;
//     width: 340px;
//   }
  
//   .box .text-wrapper-4 {
//     color: #959595;
//     font-family: "Source Sans Pro-SemiBold", Helvetica;
//     font-size: 18px;
//     font-weight: 600;
//     left: 504px;
//     letter-spacing: 0;
//     line-height: 19.8px;
//     position: absolute;
//     top: 85px;
//     width: 99px;
//   }
  
//   .box .text-wrapper-5 {
//     color: #959595;
//     font-family: "Source Sans Pro-SemiBold", Helvetica;
//     font-size: 18px;
//     font-weight: 600;
//     left: 753px;
//     letter-spacing: 0;
//     line-height: 19.8px;
//     position: absolute;
//     text-align: right;
//     top: 85px;
//     width: 99px;
//   }
  
//   .box .text-wrapper-6 {
//     color: #030d2a;
//     font-family: "Source Sans Pro-Regular", Helvetica;
//     font-size: 18px;
//     font-weight: 400;
//     height: 58px;
//     left: 503px;
//     letter-spacing: 0;
//     line-height: 19.8px;
//     position: absolute;
//     text-align: right;
//     top: 0;
//     width: 251px;
//   }
  
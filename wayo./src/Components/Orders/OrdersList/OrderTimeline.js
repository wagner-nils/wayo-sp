import React from "react";
// import "./OrderList";


function OrderTimeline() {
  // const [orders, setOrders] = useState([]); // State for storing fetched orders, as discussed with Seb

  // useEffect(() => {
  //   fetch('http://localhost:30001/orders')
  //     .then((response) => response.json())
  //     .then((data) => setOrders(data));
  // }, []);

  // const addOrder = (order) => {
  //   fetch('http://localhost:3001/orders', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(order),
  //   })
  //     .then((response) => response.json())
  //     .then((newOrder) => {
  //       setOrders((prevOrders) => [...prevOrders, newOrder]);
  //     });
  // };

  return (
    <>
      <div>View your Order Timeline</div>;
      {/* <div><OrderList orders={orders} /> </div> */}

    </>

  )
};

export default OrderTimeline;

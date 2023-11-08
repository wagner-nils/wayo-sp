const Order = require('./models');

exports.createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).send(order);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ date: 1 });
    res.status(200).send(orders);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


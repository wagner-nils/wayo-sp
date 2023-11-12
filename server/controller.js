const { Order, Expense } = require('./models');

// logic for orders

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

exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const newOrder = req.body;
    newOrder.orderDeadline = new Date(newOrder.orderDeadline);
    newOrder.orderDate = new Date(newOrder.orderDate);
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, newOrder, { new: true });
    res.status(200).send(updatedOrder);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};

// logic for expenses

exports.createExpense = async (req, res) => {
  try {
    const expense = await Expense.create(req.body);
    res.status(201).send(expense);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: 1 });
    res.status(200).send(expenses);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: 'Expense deleted successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const newExpense = req.body;
    newExpense.expenseDate = new Date(newExpense.expenseDate);
    const updatedExpense = await Order.findByIdAndUpdate(req.params.id, newExpense, { new: true });
    res.status(200).send(updatedExpense);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};
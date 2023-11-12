const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/orders', controller.createOrder);
router.get('/orders', controller.getAllOrders);
router.delete('/orders/:id', controller.deleteOrder);
router.put('/orders/:id', controller.updateOrder);


router.post('/expenses', controller.createExpense);
router.get('/expenses', controller.getAllExpenses);
router.delete('/expenses/:id', controller.deleteExpense);
router.put('/expenses/:id', controller.updateExpense);

module.exports = router;
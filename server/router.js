const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/orders', controller.createOrder);
router.get('/orders', controller.getAllOrders);
router.delete('/orders/:id', controller.deleteOrder);
router.put('/orders/:id', controller.updateOrder);

module.exports = router;
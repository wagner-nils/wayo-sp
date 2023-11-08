const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/orders', controller.createOrder);
router.get('/orders', controller.getAllOrders);

module.exports = router;
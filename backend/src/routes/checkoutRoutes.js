const express = require('express');
const router = express.Router();
const {
  createOrder,
  verifyPayment,
} = require('../controllers/checkoutController');

// POST /api/checkout/create-order
router.post('/create-order', createOrder);

// POST /api/checkout/verify-payment
router.post('/verify-payment', verifyPayment);

module.exports = router;

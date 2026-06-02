const express = require('express');
const router = express.Router();
const {
  getOrders,
  getOrderById,
  updateOrderStatus,
} = require('../controllers/orderController');

// GET /api/orders
router.get('/', getOrders);

// GET /api/orders/:id
router.get('/:id', getOrderById);

// PUT /api/orders/:id
router.put('/:id', updateOrderStatus);

module.exports = router;

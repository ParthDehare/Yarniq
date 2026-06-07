const express = require('express');
const router = express.Router();
const {
  getOrders,
  getOrderById,
  updateOrderStatus,
  getMyOrders,
} = require('../controllers/orderController');

// GET /api/orders
router.get('/', getOrders);

// GET /api/orders/my-orders/:clerkUserId
router.get('/my-orders/:clerkUserId', getMyOrders);

// GET /api/orders/:id
router.get('/:id', getOrderById);

// PUT /api/orders/:id
router.put('/:id', updateOrderStatus);

module.exports = router;

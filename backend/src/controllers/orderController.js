const Order = require('../models/Order');
const { sendDispatchNotification } = require('../services/emailService');

/**
 * @desc    Get all orders (admin)
 * @route   GET /api/orders
 */
const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single order by ID
 * @route   GET /api/orders/:id
 */
const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found',
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update order status (shipping status)
 * @route   PUT /api/orders/:id
 * @body    { shippingStatus: 'SHIPPED' }
 */
const updateOrderStatus = async (req, res, next) => {
  try {
    const { shippingStatus } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found',
      });
    }

    const previousStatus = order.shippingStatus;
    order.shippingStatus = shippingStatus;
    await order.save();

    // Send dispatch email when status changes to SHIPPED
    if (shippingStatus === 'SHIPPED' && previousStatus !== 'SHIPPED') {
      console.log(`📦 Order ${order._id} marked as SHIPPED — sending dispatch email...`);
      await sendDispatchNotification(order);
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get user's own orders
 * @route   GET /api/orders/my-orders/:clerkUserId
 */
const getMyOrders = async (req, res, next) => {
  try {
    const { clerkUserId } = req.params;
    if (!clerkUserId) {
      return res.status(400).json({ success: false, error: 'User ID is required' });
    }

    const orders = await Order.find({ clerkUserId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOrders,
  getOrderById,
  updateOrderStatus,
  getMyOrders,
};

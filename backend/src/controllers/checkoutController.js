const crypto = require('crypto');
const Razorpay = require('razorpay');
const Order = require('../models/Order');
const { sendOrderConfirmation, sendAdminAlert } = require('../services/emailService');

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/**
 * @desc    Create a Razorpay order and save pending order in DB
 * @route   POST /api/checkout/create-order
 * @body    { customerName, customerEmail, shippingAddress, items, totalAmount }
 */
const createOrder = async (req, res, next) => {
  try {
    const { customerName, customerEmail, shippingAddress, items, totalAmount } = req.body;

    // Validate required fields
    if (!customerName || !customerEmail || !shippingAddress || !items || !totalAmount) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required: customerName, customerEmail, shippingAddress, items, totalAmount',
      });
    }

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(totalAmount * 100), // Razorpay expects amount in paise
      currency: 'INR',
      receipt: `yarniq_${Date.now()}`,
      notes: {
        customerName,
        customerEmail,
      },
    });

    // Save order in MongoDB with PENDING status
    const order = await Order.create({
      customerName,
      customerEmail,
      shippingAddress,
      items,
      totalAmount,
      razorpayOrderId: razorpayOrder.id,
      paymentStatus: 'PENDING',
      shippingStatus: 'PROCESSING',
    });

    res.status(201).json({
      success: true,
      data: {
        orderId: order._id,
        razorpayOrderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        keyId: process.env.RAZORPAY_KEY_ID,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Verify Razorpay payment signature and update order
 * @route   POST /api/checkout/verify-payment
 * @body    { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId }
 */
const verifyPayment = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

    // Verify signature using HMAC SHA256
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        error: 'Payment verification failed — invalid signature',
      });
    }

    // Update order to PAID
    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        paymentStatus: 'PAID',
        razorpayPaymentId: razorpay_payment_id,
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found',
      });
    }

    // Send emails asynchronously (don't block response)
    console.log(`💳 Payment verified for order ${order._id} — sending emails...`);
    Promise.all([
      sendOrderConfirmation(order),
      sendAdminAlert(order),
    ]).catch((err) => console.error('Email sending error:', err));

    res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  verifyPayment,
};

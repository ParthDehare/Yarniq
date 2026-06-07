const crypto = require('crypto');
const Razorpay = require('razorpay');
const Order = require('../models/Order');
const Product = require('../models/Product');
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
    const { customerName, customerEmail, shippingAddress, items, totalAmount, clerkUserId } = req.body;

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
      clerkUserId: clerkUserId || null,
      items,
      totalAmount,
      razorpayOrderId: razorpayOrder.id,
      paymentStatus: 'PENDING',
      shippingStatus: 'PROCESSING',
    });
    
    // Now that we have the order._id, we could update the Razorpay order notes with it 
    // or just rely on verifyPayment. For webhooks to work well, we need orderId in notes.
    // Razorpay doesn't let you update notes after creation easily, so usually webhooks
    // match on razorpay_order_id instead! Let's handle that in the webhook.

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

    // Deduct stock for each item
    try {
      for (const item of order.items) {
        await Product.findByIdAndUpdate(item.productId, {
          $inc: { stock: -item.quantity }
        });
      }
    } catch (stockErr) {
      console.error('Error deducting stock:', stockErr);
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

/**
 * @desc    Handle Razorpay Webhooks
 * @route   POST /api/checkout/webhook
 */
const handleWebhook = async (req, res, next) => {
  try {
    const signature = req.headers['x-razorpay-signature'];
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!signature || !secret) {
      return res.status(400).send('Missing signature or secret');
    }

    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(req.rawBody || '')
      .digest('hex');

    if (expectedSignature !== signature) {
      return res.status(400).send('Invalid signature');
    }

    const event = req.body.event;
    if (event === 'payment.captured') {
      const paymentData = req.body.payload.payment.entity;
      const razorpayOrderId = paymentData.order_id;

      if (razorpayOrderId) {
        const order = await Order.findOne({ razorpayOrderId });
        if (order && order.paymentStatus !== 'PAID') {
          order.paymentStatus = 'PAID';
          order.razorpayPaymentId = paymentData.id;
          await order.save();

          // Deduct stock for each item
          try {
            for (const item of order.items) {
              await Product.findByIdAndUpdate(item.productId, {
                $inc: { stock: -item.quantity }
              });
            }
          } catch (stockErr) {
            console.error('Error deducting stock:', stockErr);
          }

          // Send emails
          console.log(`💳 Webhook verified for order ${order._id} — sending emails...`);
          Promise.all([
            sendOrderConfirmation(order),
            sendAdminAlert(order),
          ]).catch((err) => console.error('Email sending error:', err));
        }
      }
    }

    res.status(200).send('OK');
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).send('Webhook Error');
  }
};

module.exports = {
  createOrder,
  verifyPayment,
  handleWebhook,
};

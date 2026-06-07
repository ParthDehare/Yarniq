const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1'],
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price cannot be negative'],
    },
    imageUrl: {
      type: String,
      default: '',
    },
  },
  { _id: false } // No separate _id for subdocuments
);

const orderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
    },
    customerEmail: {
      type: String,
      required: [true, 'Customer email is required'],
      trim: true,
      lowercase: true,
    },
    clerkUserId: {
      type: String,
      default: null,
    },
    shippingAddress: {
      type: String,
      required: [true, 'Shipping address is required'],
    },
    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: 'Order must contain at least one item',
      },
    },
    totalAmount: {
      type: Number,
      required: [true, 'Total amount is required'],
      min: [0, 'Total amount cannot be negative'],
    },
    razorpayOrderId: {
      type: String,
      default: null,
    },
    razorpayPaymentId: {
      type: String,
      default: null,
    },
    paymentStatus: {
      type: String,
      enum: {
        values: ['PENDING', 'PAID'],
        message: 'Payment status must be either PENDING or PAID',
      },
      default: 'PENDING',
    },
    shippingStatus: {
      type: String,
      enum: {
        values: ['PROCESSING', 'SHIPPED'],
        message: 'Shipping status must be either PROCESSING or SHIPPED',
      },
      default: 'PROCESSING',
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model('Order', orderSchema);

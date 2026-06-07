require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Route imports
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Connect to MongoDB ─────────────────────────────────────
connectDB();

// ─── Middleware ──────────────────────────────────────────────
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || 'http://localhost:3000',
      'http://localhost:3000', // Local dev
    ],
    credentials: true,
  })
);
app.use(express.json({ 
  limit: '10mb',
  verify: (req, res, buf) => {
    req.rawBody = buf.toString();
  }
}));
app.use(express.urlencoded({ extended: true }));

// ─── Keep-Alive Route (for Render cron-job) ─────────────────
app.get('/ping', (req, res) => {
  res.status(200).json({
    success: true,
    message: '🧶 Yarniq API is alive!',
    timestamp: new Date().toISOString(),
  });
});

// ─── Health Check ───────────────────────────────────────────
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Yarniq API — Crafted by Prachee',
    version: '1.0.0',
    endpoints: {
      ping: '/ping',
      products: '/api/products',
      categories: '/api/products/categories',
      checkout: '/api/checkout',
      orders: '/api/orders',
      contact: '/api/contact',
    },
  });
});

// ─── API Routes ─────────────────────────────────────────────
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/contact', contactRoutes);

// ─── Error Handler ──────────────────────────────────────────
app.use(errorHandler);

// ─── Start Server ───────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🧶 Yarniq API Server running on port ${PORT}`);
  console.log(`   Health:  http://localhost:${PORT}/`);
  console.log(`   Ping:    http://localhost:${PORT}/ping`);
  console.log(`   Routes:`);
  console.log(`     → /api/products`);
  console.log(`     → /api/products/categories`);
  console.log(`     → /api/orders`);
  console.log(`     → /api/checkout/create-order`);
  console.log(`     → /api/checkout/verify-payment`);
  console.log(`     → /api/contact\n`);
});

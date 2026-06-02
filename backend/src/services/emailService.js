const nodemailer = require('nodemailer');

/**
 * Create a reusable Gmail SMTP transporter
 */
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
};

/**
 * Send an email using Gmail SMTP
 * @param {Object} options - { to, subject, html }
 */
const sendEmail = async ({ to, subject, html }) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"Yarniq — Crafted by Prachee" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`❌ Email failed to ${to}:`, error.message);
    return { success: false, error: error.message };
  }
};

/**
 * Send order confirmation to customer
 */
const sendOrderConfirmation = async (order) => {
  const { orderConfirmationTemplate } = require('../templates/orderConfirmation');
  return sendEmail({
    to: order.customerEmail,
    subject: `🧶 Order Confirmed — Yarniq #${order._id.toString().slice(-6).toUpperCase()}`,
    html: orderConfirmationTemplate(order),
  });
};

/**
 * Send new order alert to admin
 */
const sendAdminAlert = async (order) => {
  const { adminAlertTemplate } = require('../templates/adminAlert');
  return sendEmail({
    to: process.env.ADMIN_EMAIL,
    subject: `🔔 New Order Received — ₹${order.totalAmount} from ${order.customerName}`,
    html: adminAlertTemplate(order),
  });
};

/**
 * Send dispatch notification to customer
 */
const sendDispatchNotification = async (order) => {
  const { dispatchNotificationTemplate } = require('../templates/dispatchNotification');
  return sendEmail({
    to: order.customerEmail,
    subject: `📦 Your Yarniq Order Has Been Shipped!`,
    html: dispatchNotificationTemplate(order),
  });
};

module.exports = {
  sendEmail,
  sendOrderConfirmation,
  sendAdminAlert,
  sendDispatchNotification,
};

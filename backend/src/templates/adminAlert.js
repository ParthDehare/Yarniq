/**
 * HTML Email Template — Admin Alert (sent to admin on new order)
 */
const adminAlertTemplate = (order) => {
  const orderId = order._id.toString().slice(-6).toUpperCase();
  const orderDate = new Date(order.createdAt).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const itemsList = order.items
    .map((item) => `<li style="padding: 4px 0; font-family: 'Inter', sans-serif; font-size: 14px; color: #3E2723;">${item.title} × ${item.quantity} — ₹${(item.price * item.quantity).toLocaleString('en-IN')}</li>`)
    .join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #F4EFEA; font-family: 'Inter', 'Helvetica Neue', sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F4EFEA; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #FFFDF9; border-radius: 24px; overflow: hidden; box-shadow: 0 4px 24px rgba(166, 138, 119, 0.12);">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #3E2723; padding: 32px; text-align: center;">
              <h1 style="margin: 0; font-family: 'Georgia', serif; font-size: 22px; color: #FFF8F0;">
                🔔 New Order Received!
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F4EFEA; border-radius: 16px; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 20px 24px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="font-family: 'Inter', sans-serif; font-size: 12px; color: #8D6E63; text-transform: uppercase; letter-spacing: 1px;">Order Total</td>
                        <td style="text-align: right; font-family: 'Georgia', serif; font-size: 28px; color: #3E2723; font-weight: 700;">₹${order.totalAmount.toLocaleString('en-IN')}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <h3 style="font-family: 'Georgia', serif; font-size: 16px; color: #3E2723; margin: 0 0 12px;">Customer Details</h3>
              <p style="margin: 0 0 4px; font-size: 14px; color: #5D4037;"><strong>Name:</strong> ${order.customerName}</p>
              <p style="margin: 0 0 4px; font-size: 14px; color: #5D4037;"><strong>Email:</strong> ${order.customerEmail}</p>
              <p style="margin: 0 0 20px; font-size: 14px; color: #5D4037;"><strong>Address:</strong> ${order.shippingAddress}</p>

              <h3 style="font-family: 'Georgia', serif; font-size: 16px; color: #3E2723; margin: 0 0 12px;">Items Ordered</h3>
              <ul style="margin: 0 0 20px; padding-left: 20px;">
                ${itemsList}
              </ul>

              <p style="margin: 0; font-size: 12px; color: #8D6E63;">
                Order ID: #${orderId} · ${orderDate}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

module.exports = { adminAlertTemplate };

/**
 * HTML Email Template — Order Confirmation (sent to customer)
 */
const orderConfirmationTemplate = (order) => {
  const orderId = order._id.toString().slice(-6).toUpperCase();
  const orderDate = new Date(order.createdAt).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const itemsHtml = order.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px 16px; border-bottom: 1px solid #D7CCC8; font-family: 'Inter', sans-serif; color: #3E2723;">
          ${item.title}
        </td>
        <td style="padding: 12px 16px; border-bottom: 1px solid #D7CCC8; text-align: center; font-family: 'Inter', sans-serif; color: #5D4037;">
          ${item.quantity}
        </td>
        <td style="padding: 12px 16px; border-bottom: 1px solid #D7CCC8; text-align: right; font-family: 'Inter', sans-serif; color: #3E2723; font-weight: 600;">
          ₹${(item.price * item.quantity).toLocaleString('en-IN')}
        </td>
      </tr>`
    )
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
            <td style="background-color: #A68A77; padding: 40px 32px; text-align: center;">
              <h1 style="margin: 0; font-family: 'Georgia', serif; font-size: 28px; color: #FFF8F0; letter-spacing: 2px;">
                🧶 Yarniq
              </h1>
              <p style="margin: 8px 0 0; font-family: 'Inter', sans-serif; font-size: 13px; color: rgba(255, 248, 240, 0.8); letter-spacing: 3px;">
                CRAFTED BY PRACHEE
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 32px;">
              <h2 style="margin: 0 0 8px; font-family: 'Georgia', serif; font-size: 24px; color: #3E2723;">
                Thank You for Your Order! 🎉
              </h2>
              <p style="margin: 0 0 24px; font-family: 'Inter', sans-serif; font-size: 15px; color: #5D4037; line-height: 1.6;">
                Hi <strong>${order.customerName}</strong>, your order has been confirmed and is being prepared with love.
              </p>

              <!-- Order Info -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F4EFEA; border-radius: 16px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 20px 24px;">
                    <p style="margin: 0 0 4px; font-family: 'Inter', sans-serif; font-size: 12px; color: #8D6E63; text-transform: uppercase; letter-spacing: 1px;">Order ID</p>
                    <p style="margin: 0 0 16px; font-family: 'Inter', sans-serif; font-size: 16px; color: #3E2723; font-weight: 600;">#${orderId}</p>
                    <p style="margin: 0 0 4px; font-family: 'Inter', sans-serif; font-size: 12px; color: #8D6E63; text-transform: uppercase; letter-spacing: 1px;">Date</p>
                    <p style="margin: 0; font-family: 'Inter', sans-serif; font-size: 14px; color: #3E2723;">${orderDate}</p>
                  </td>
                </tr>
              </table>

              <!-- Items Table -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                <thead>
                  <tr style="background-color: #F4EFEA;">
                    <th style="padding: 12px 16px; text-align: left; font-family: 'Inter', sans-serif; font-size: 12px; color: #8D6E63; text-transform: uppercase; letter-spacing: 1px; border-radius: 12px 0 0 0;">Item</th>
                    <th style="padding: 12px 16px; text-align: center; font-family: 'Inter', sans-serif; font-size: 12px; color: #8D6E63; text-transform: uppercase; letter-spacing: 1px;">Qty</th>
                    <th style="padding: 12px 16px; text-align: right; font-family: 'Inter', sans-serif; font-size: 12px; color: #8D6E63; text-transform: uppercase; letter-spacing: 1px; border-radius: 0 12px 0 0;">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>

              <!-- Total -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #A68A77; border-radius: 16px;">
                <tr>
                  <td style="padding: 20px 24px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="font-family: 'Inter', sans-serif; font-size: 14px; color: rgba(255, 248, 240, 0.8);">Total Amount</td>
                        <td style="text-align: right; font-family: 'Georgia', serif; font-size: 24px; color: #FFF8F0; font-weight: 700;">₹${order.totalAmount.toLocaleString('en-IN')}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Shipping Address -->
              <div style="margin-top: 24px; padding: 20px 24px; background-color: #F4EFEA; border-radius: 16px;">
                <p style="margin: 0 0 4px; font-family: 'Inter', sans-serif; font-size: 12px; color: #8D6E63; text-transform: uppercase; letter-spacing: 1px;">Shipping To</p>
                <p style="margin: 0; font-family: 'Inter', sans-serif; font-size: 14px; color: #3E2723; line-height: 1.6;">${order.shippingAddress}</p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; text-align: center; border-top: 1px solid #D7CCC8;">
              <p style="margin: 0; font-family: 'Inter', sans-serif; font-size: 13px; color: #8D6E63;">
                Made with ❤️ and lots of yarn
              </p>
              <p style="margin: 4px 0 0; font-family: 'Inter', sans-serif; font-size: 12px; color: #BCAAA4;">
                Yarniq — Crafted by Prachee
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

module.exports = { orderConfirmationTemplate };

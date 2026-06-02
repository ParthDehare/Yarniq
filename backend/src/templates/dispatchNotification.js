/**
 * HTML Email Template — Dispatch Notification (sent when order is shipped)
 */
const dispatchNotificationTemplate = (order) => {
  const orderId = order._id.toString().slice(-6).toUpperCase();

  const itemsList = order.items
    .map((item) => `<li style="padding: 4px 0; font-family: 'Inter', sans-serif; font-size: 14px; color: #3E2723;">${item.title} × ${item.quantity}</li>`)
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
            <td style="background-color: #6D8B74; padding: 40px 32px; text-align: center;">
              <h1 style="margin: 0; font-family: 'Georgia', serif; font-size: 28px; color: #FFF8F0;">
                📦 Your Order is on its way!
              </h1>
              <p style="margin: 12px 0 0; font-family: 'Inter', sans-serif; font-size: 14px; color: rgba(255, 248, 240, 0.85);">
                We've shipped your handcrafted goodies
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 32px;">
              <p style="margin: 0 0 24px; font-family: 'Inter', sans-serif; font-size: 15px; color: #5D4037; line-height: 1.6;">
                Hi <strong>${order.customerName}</strong>, great news! Your Yarniq order <strong>#${orderId}</strong> has been shipped and is on its way to you. 🎉
              </p>

              <!-- Shipping Progress -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                <tr>
                  <td style="padding: 24px 0;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="33%" style="text-align: center;">
                          <div style="width: 40px; height: 40px; border-radius: 50%; background-color: #6D8B74; margin: 0 auto 8px; line-height: 40px; font-size: 18px;">✓</div>
                          <p style="margin: 0; font-size: 12px; color: #6D8B74; font-weight: 600;">Confirmed</p>
                        </td>
                        <td width="33%" style="text-align: center;">
                          <div style="width: 40px; height: 40px; border-radius: 50%; background-color: #6D8B74; margin: 0 auto 8px; line-height: 40px; font-size: 18px;">✓</div>
                          <p style="margin: 0; font-size: 12px; color: #6D8B74; font-weight: 600;">Shipped</p>
                        </td>
                        <td width="33%" style="text-align: center;">
                          <div style="width: 40px; height: 40px; border-radius: 50%; background-color: #D7CCC8; margin: 0 auto 8px; line-height: 40px; font-size: 18px;">📬</div>
                          <p style="margin: 0; font-size: 12px; color: #8D6E63;">Delivered</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Items -->
              <div style="padding: 20px 24px; background-color: #F4EFEA; border-radius: 16px; margin-bottom: 24px;">
                <p style="margin: 0 0 8px; font-size: 12px; color: #8D6E63; text-transform: uppercase; letter-spacing: 1px;">Items in your package</p>
                <ul style="margin: 0; padding-left: 20px;">
                  ${itemsList}
                </ul>
              </div>

              <!-- Shipping Address -->
              <div style="padding: 20px 24px; background-color: #F4EFEA; border-radius: 16px;">
                <p style="margin: 0 0 4px; font-size: 12px; color: #8D6E63; text-transform: uppercase; letter-spacing: 1px;">Delivering To</p>
                <p style="margin: 0; font-size: 14px; color: #3E2723; line-height: 1.6;">${order.shippingAddress}</p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; text-align: center; border-top: 1px solid #D7CCC8;">
              <p style="margin: 0; font-family: 'Inter', sans-serif; font-size: 13px; color: #8D6E63;">
                Thank you for supporting handmade! 🧶
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

module.exports = { dispatchNotificationTemplate };

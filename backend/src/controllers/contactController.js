const { sendEmail } = require('../services/emailService');

/**
 * @desc    Handle contact form submission — send email to admin
 * @route   POST /api/contact
 * @body    { name, email, message }
 */
const sendContactMessage = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required: name, email, message',
      });
    }

    // Send email to admin
    const result = await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: `💌 New Message from ${name} — Yarniq Contact Form`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin: 0; padding: 0; background-color: #F4EFEA; font-family: 'Inter', sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F4EFEA; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #FFFDF9; border-radius: 24px; overflow: hidden; box-shadow: 0 4px 24px rgba(166, 138, 119, 0.12);">
          <tr>
            <td style="background-color: #A68A77; padding: 32px; text-align: center;">
              <h1 style="margin: 0; font-family: 'Georgia', serif; font-size: 22px; color: #FFF8F0;">
                💌 New Contact Message
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px;">
              <p style="margin: 0 0 4px; font-size: 12px; color: #8D6E63; text-transform: uppercase; letter-spacing: 1px;">From</p>
              <p style="margin: 0 0 16px; font-size: 16px; color: #3E2723; font-weight: 600;">${name}</p>
              
              <p style="margin: 0 0 4px; font-size: 12px; color: #8D6E63; text-transform: uppercase; letter-spacing: 1px;">Email</p>
              <p style="margin: 0 0 16px; font-size: 14px; color: #3E2723;">
                <a href="mailto:${email}" style="color: #A68A77;">${email}</a>
              </p>
              
              <p style="margin: 0 0 4px; font-size: 12px; color: #8D6E63; text-transform: uppercase; letter-spacing: 1px;">Message</p>
              <div style="padding: 20px; background-color: #F4EFEA; border-radius: 16px; margin-top: 8px;">
                <p style="margin: 0; font-size: 14px; color: #3E2723; line-height: 1.7; white-space: pre-wrap;">${message}</p>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
    });

    if (!result.success) {
      return res.status(500).json({
        success: false,
        error: 'Failed to send message. Please try again later.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully!',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendContactMessage,
};

const { Resend } = require('resend');

async function sendContactNotification({ name, email, message }) {
  if (!process.env.RESEND_API_KEY) {
    // Allows local dev without a Resend key — message is still stored in DB by the service layer.
    console.warn('[mailer] RESEND_API_KEY not set — skipping email send.');
    return null;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  return resend.emails.send({
    from: 'Portfolio Contact Form <onboarding@resend.dev>',
    to: process.env.CONTACT_TO_EMAIL,
    reply_to: email,
    subject: `New message from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  });
}

module.exports = { sendContactNotification };
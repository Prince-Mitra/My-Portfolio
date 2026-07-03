const prisma = require('../config/db');
const { sendContactNotification } = require('../utils/mailer');

async function submitContactMessage({ name, email, message }) {
  const saved = await prisma.contactMessage.create({ data: { name, email, message } });

  // Email delivery failure shouldn't fail the request — the message is already stored.
  try {
    await sendContactNotification({ name, email, message });
  } catch (err) {
    console.error('[contact] email send failed:', err.message);
  }

  return saved;
}

module.exports = { submitContactMessage };

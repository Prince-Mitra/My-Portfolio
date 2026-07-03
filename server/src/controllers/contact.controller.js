const contactService = require('../services/contact.service');

async function submitContact(req, res, next) {
  try {
    await contactService.submitContactMessage(req.body);
    res.status(201).json({
      success: true,
      message: "Message sent — thanks for reaching out, I'll reply soon.",
      data: null,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { submitContact };

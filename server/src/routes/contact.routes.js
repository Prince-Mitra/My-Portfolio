const express = require('express');
const contactController = require('../controllers/contact.controller');
const { validate } = require('../middleware/validate.middleware');
const { contactLimiter } = require('../middleware/rateLimit.middleware');
const { contactSchema } = require('../utils/schemas');

const router = express.Router();

router.post('/', contactLimiter, validate({ body: contactSchema }), contactController.submitContact);

module.exports = router;

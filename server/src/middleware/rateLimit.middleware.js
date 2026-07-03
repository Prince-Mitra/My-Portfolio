const rateLimit = require('express-rate-limit');

const makeLimiter = (max, message) =>
  rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message },
  });

const loginLimiter = makeLimiter(8, 'Too many login attempts. Try again in a minute.');
const contactLimiter = makeLimiter(4, 'Too many messages sent. Try again in a minute.');
const publicLimiter = makeLimiter(100, 'Too many requests. Slow down a little.');

module.exports = { loginLimiter, contactLimiter, publicLimiter };

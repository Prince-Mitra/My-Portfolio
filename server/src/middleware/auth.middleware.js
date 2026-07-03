const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');

function requireAuth(req, res, next) {
  try {
    const cookieName = process.env.COOKIE_NAME || 'portfolio_token';
    const token = req.cookies?.[cookieName];

    if (!token) {
      throw new AppError('Not authenticated', 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded; // { id, email }
    next();
  } catch (err) {
    if (err instanceof AppError) return next(err);
    next(new AppError('Invalid or expired session', 401));
  }
}

module.exports = { requireAuth };

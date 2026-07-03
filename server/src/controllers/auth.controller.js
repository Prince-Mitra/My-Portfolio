const authService = require('../services/auth.service');

const COOKIE_NAME = process.env.COOKIE_NAME || 'portfolio_token';

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const { token, admin } = await authService.login(email, password);

    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({ success: true, message: 'Logged in successfully', data: { admin } });
  } catch (err) {
    next(err);
  }
}

async function logout(req, res) {
  res.clearCookie(COOKIE_NAME);
  res.json({ success: true, message: 'Logged out successfully', data: null });
}

async function me(req, res) {
  res.json({ success: true, message: 'Session valid', data: { admin: req.admin } });
}

module.exports = { login, logout, me };

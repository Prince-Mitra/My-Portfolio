const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../config/db');
const AppError = require('../utils/AppError');

async function login(email, password) {
  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin) throw new AppError('Invalid email or password', 401);

  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) throw new AppError('Invalid email or password', 401);

  const token = jwt.sign(
    { id: admin.id, email: admin.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

  return { token, admin: { id: admin.id, email: admin.email } };
}

module.exports = { login };

const jwt = require('jsonwebtoken');
const { DEV_JWT_SECRET } = require('../config');
const { errorMessages } = require('../const');
const UnauthorizedError = require('../errors/unauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  if (!token) {
    next(new UnauthorizedError(errorMessages.UNAUTHORIZED));
  }

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : DEV_JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError(errorMessages.UNAUTHORIZED));
  }

  req.user = payload;

  next();
};

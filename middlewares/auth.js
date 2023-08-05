const jwt = require('jsonwebtoken');
const { DEV_JWT_SECRET } = require('../config');
const { errorMessages } = require('../const');
const UnauthorizedError = require('../errors/unauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

const extractBearer = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError(errorMessages.UNAUTHORIZED));
  }

  const token = extractBearer(authorization);
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : DEV_JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError(errorMessages.UNAUTHORIZED));
  }

  req.user = payload;

  return next();
};

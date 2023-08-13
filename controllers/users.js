const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { errorMessages } = require('../const');
const ConflictError = require('../errors/conflictError');
const IncorrectError = require('../errors/incorrectError');
const NotFoundDataError = require('../errors/notFoundDataError');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        throw new NotFoundDataError(errorMessages.NOT_FOUND_DATA);
      }
    })
    .catch(next);
};

const postUser = (req, res, next) => {
  const {
    name, email, password
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash
    }))
    .then((user) => {
      const { ...userCurr } = user.toObject();
      delete userCurr.password;
      res.status(201).send(userCurr);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new IncorrectError(errorMessages.INCORRECT_DATA));
      } else if (err.code === 11000) {
        next(new ConflictError(errorMessages.CONFLICT));
      } else {
        next(err);
      }
    });
};

const patchUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new IncorrectError(errorMessages.INCORRECT_DATA));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret', {
          expiresIn: '7d',
        }),
      });
    })
    .catch(next);
};

module.exports = {
  getUser,
  postUser,
  patchUser,
  login,
};

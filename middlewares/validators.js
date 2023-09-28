const { celebrate, Joi } = require('celebrate');
const { urlPattern } = require('../const');

const signupCelebrate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const signinCelebrate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const patchUserCelebrate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
  }),
});

const postMovieCelebrate = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(urlPattern),
    trailerLink: Joi.string().required().regex(urlPattern),
    thumbnail: Joi.string().required().regex(urlPattern),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
});

const deleteMovieCelebrate = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  signupCelebrate,
  signinCelebrate,
  patchUserCelebrate,
  postMovieCelebrate,
  deleteMovieCelebrate,
};

const {celebrate, Joi} = require('celebrate');

const regexLink = /https?:\/\/(www)?[a-z0-9\S]+\.[a-zа-яё]{2,}[a-z0-9\S]*/;

module.exports.signupValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.signinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.userInfoValidation = celebrate(({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}));

module.exports.movieInfoValidation = celebrate({
  body: Joi.object().keys({
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    director: Joi.string().required(),
    country: Joi.string().required(),
    year: Joi.string().required(),
    duration: Joi.number().required(),
    description: Joi.string().required(),
    trailerLink: Joi.string().required().pattern(regexLink),
    image: Joi.string().required().pattern(regexLink),
    thumbnail: Joi.string().required().pattern(regexLink),
  }),
});

module.exports.movieIdValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
});
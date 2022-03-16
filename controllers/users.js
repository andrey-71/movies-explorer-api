const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { DEV_JWT_SECRET } = require('../utils/config');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');

// Регистрация пользователя
module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.status(201).send(user.toJSON()))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при регистрации пользователя'));
      } else if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует'));
      } else {
        next(err);
      }
    });
};

// Авторизация пользователя
module.exports.loginUser = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // Создание токена
      const token = jwt.sign(
        { _id: user._id },
        `${NODE_ENV === 'production' ? JWT_SECRET : DEV_JWT_SECRET}`,
        { expiresIn: '7d' },
      );
      // Запись токена в куки
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      })
        .send(user.toJSON());
    })

    .catch(next);
};

// Разлогинивание пользователя
module.exports.logoutUser = (req, res) => {
  res.cookie('jwt', '')
    .end();
};

// Получение данных пользователя
module.exports.getUser = (req, res, next) => User.findById(req.user._id)
  .orFail(() => {
    next(new NotFoundError('Пользователь не найден'));
  })
  .then((user) => {
    res.status(200).send(user);
  })
  .catch(next);

// Обновление данных пользователя
module.exports.updateUser = (req, res, next) => User.findByIdAndUpdate(
  req.user._id,
  { name: req.body.name, email: req.body.email },
  { new: true, runValidators: true },
)
  .orFail(() => {
    next(new NotFoundError('Пользователь с таким _id не найден'));
  })
  .then((user) => {
    res.status(200).send(user);
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные при обновлении данных пользователя'));
    } else if (err.code === 11000) {
      next(new ConflictError('Пользователь с таким email уже существует'));
    } else {
      next(err);
    }
  });

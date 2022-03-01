const User = require('../models/user');
const bcrypt = require('bcryptjs');

// Регистрация пользователя
module.exports = createUser = (req, res) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
      }))
    .then((user) => res.status(201).send(user.toJSON()))
    .catch((err) => {
      console.log(err);
    })
};
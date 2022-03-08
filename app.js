const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { PORT, DB_ADDRESS } = require('./utils/config');
const routes = require('./routes');
const { createUser, loginUser } = require('./controllers/users');
const { signupValidation, signinValidation } = require('./middlewares/joi-validation');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/error-handler');

const app = express();
// Подключение к БД
mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
});

// Сборка данных в JSON-формат
app.use(bodyParser.json());
// Парсер кук
app.use(cookieParser());

// Роут регистрации
app.post('/signup', signupValidation, createUser);
app.post('/signin', signinValidation, loginUser);
// Мидлвэр авторизации
app.use(auth);
// Защищенные роуты
app.use(routes);

// Обработчик ошибок celebrate
app.use(errors());
// Обработчик ошибок
app.use(errorHandler);

// Запуск сервера
app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});

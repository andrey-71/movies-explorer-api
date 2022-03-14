const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const { NODE_ENV, PORT, DB_ADDRESS } = process.env;
const { DEV_PORT, DEV_DB_ADDRESS } = require('./utils/config');
const routes = require('./routes');
const { createUser, loginUser } = require('./controllers/users');
const { signupValidation, signinValidation } = require('./middlewares/joi-validation');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/error-handler');

const app = express();
// Подключение к БД
mongoose.connect(`${NODE_ENV === 'production' ? DB_ADDRESS : DEV_DB_ADDRESS}`, {
  useNewUrlParser: true,
});

// CORS
const corsOptions = {
  origin: [
    'https://movies-explorer.andrey-g.nomoredomains.work',
    'http://movies-explorer.andrey-g.nomoredomains.work',
    'http://localhost:3001',
  ],
  credentials: true,
};
app.use(cors(corsOptions));

// Сборка данных в JSON-формат
app.use(bodyParser.json());
// Парсер кук
app.use(cookieParser());
// Логгер запросов
app.use(requestLogger);

// Роут регистрации
app.post('/signup', signupValidation, createUser);
app.post('/signin', signinValidation, loginUser);
// Мидлвэр авторизации
app.use(auth);
// Защищенные роуты
app.use(routes);

// Логгер ошибок
app.use(errorLogger);
// Обработчик ошибок celebrate
app.use(errors());
// Обработчик ошибок
app.use(errorHandler);

// Запуск сервера
app.listen(NODE_ENV === 'production' ? PORT : DEV_PORT, () => {
  console.log(`App started on port ${NODE_ENV === 'production' ? PORT : DEV_PORT}`);
});

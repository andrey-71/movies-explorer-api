const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const { PORT, DB_ADDRESS } = require('./utils/config');
const routes = require('./routes');
const { createUser, loginUser } = require('./controllers/users');
const errorHandler = require('./middlewares/error-handler');

const app = express();
// Подключение к БД
mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
});

// Сборка данных в JSON-формат
app.use(bodyParser.json());

// Роут регистрации
app.post('/signup', createUser);
app.post('/signin', loginUser);
// Защищенные роуты
app.use(routes);

// Обработчик ошибок
app.use(errorHandler);

// Запуск сервера
app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});

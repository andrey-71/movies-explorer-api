const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const { PORT, DB_ADDRESS } = require('./utils/config');
const { createUser, loginUser } = require('./controllers/users');

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

// Запуск сервера
app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});

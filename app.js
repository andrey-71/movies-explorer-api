const express = require('express');
const mongoose = require('mongoose');

const {PORT, DB_ADDRESS} = require('./utils/config');

const app = express();
// Подключение к БД
mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});

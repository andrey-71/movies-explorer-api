const { SERVER_ERROR } = require('../utils/statusErrors');

module.exports = (err, req, res, next) => {
  const message = err.message || 'На сервере произошла ошибка';
  const statusCode = err.statusCode || SERVER_ERROR;

  res.status(statusCode).send({ message });
  next();
};

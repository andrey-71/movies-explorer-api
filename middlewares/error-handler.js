module.exports = (req, res, err, next) => {
  const message = err.message || 'На сервере произошла ошибка';
  const statusCode = err.statusCode || 500;

  res.status(statusCode).send({ message });
  next();
};
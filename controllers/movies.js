const Movie = require('../models/movie');

// Получение всех фильмов пользователя
module.exports.getMovies = (req, res, next) => Movie.find({})
  .then((movies) => {
    res.status(200).send(cards);
  })
  .catch(next);
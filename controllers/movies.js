const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');

// Получение всех фильмов пользователя
module.exports.getMovies = (req, res, next) => Movie.find({})
  .then((movies) => {
    res.status(200).send(movies);
  })
  .catch(next);

// Добавление нового фильма
module.exports.createMovies = (req, res, next) => Movie.create({
  movieId: req.body.movieId,
  nameRU: req.body.nameRU,
  nameEN: req.body.nameEN,
  director: req.body.director,
  country: req.body.country,
  year: req.body.year,
  duration: req.body.duration,
  description: req.body.description,
  trailerLink: req.body.trailerLink,
  image: req.body.image,
  thumbnail: req.body.thumbnail,
  owner: req.user._id,
})
  .then((movie) => res.status(201).send(movie))
  .catch((err) => {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные при создании карточки'));
    } else {
      next(err);
    }
  });
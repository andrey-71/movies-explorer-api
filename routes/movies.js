const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { movieInfoValidation, movieIdValidation } = require('../middlewares/joi-validation');

router.get('/', getMovies);
router.post('/', movieInfoValidation, createMovie);
router.delete('/:_id', movieIdValidation, deleteMovie);

module.exports = router;

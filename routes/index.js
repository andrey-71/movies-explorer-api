const router = require('express').Router();
const authRouter = require('./auth');
const auth = require('../middlewares/auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const NotFoundError = require('../errors/NotFoundError');

// Роут регистрации
router.use(authRouter);
// Мидлвэр авторизации
router.use(auth);
// Защищенные роуты
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

router.use((req) => {
  throw new NotFoundError(`Ресурс по адресу "${req.path}" не найден`);
});

module.exports = router;

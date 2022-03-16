const router = require('express').Router();
const { signupValidation, signinValidation } = require('../middlewares/joi-validation');
const { createUser, loginUser } = require('../controllers/users');

router.post('/signup', signupValidation, createUser);
router.post('/signin', signinValidation, loginUser);

module.exports = router;

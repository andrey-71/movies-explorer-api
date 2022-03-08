const router = require('express').Router();
const { logoutUser, getUser, updateUser } = require('../controllers/users');
const { userInfoValidation } = require('../middlewares/joi-validation');

router.get('/signout', logoutUser);
router.get('/me', getUser);
router.patch('/me', userInfoValidation, updateUser);

module.exports = router;

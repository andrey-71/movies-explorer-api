const router = require('express').Router();
const { logoutUser, getUser, updateUser } = require('../controllers/users');

router.get('/signout', logoutUser);
router.get('/me', getUser);
router.patch('/me', updateUser);

module.exports = router;

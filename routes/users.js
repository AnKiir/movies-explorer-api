const router = require('express').Router();
const { getUser, patchUser } = require('../controllers/users');
const { patchUserCelebrate } = require('../middlewares/validators');

router.get('/users/me', getUser);
router.patch('/users/me', patchUserCelebrate, patchUser);

module.exports = router;

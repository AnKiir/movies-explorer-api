const router = require('express').Router();
const authRouter = require('./auth');
const authMiddleware = require('../middlewares/auth');
const error404Router = require('./error404');
const movieRouter = require('./movies');
const userRouter = require('./users');

router.use(authRouter)
router.use(authMiddleware);
router.use(error404Router);
router.use(movieRouter);
router.use(userRouter);

module.exports = router;

const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');
const { postUser, login } = require('../controllers/users');
const { signinCelebrate, signupCelebrate } = require('../middlewares/validators');
const NotFoundDataError = require('../errors/notFoundDataError');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signin', signinCelebrate, login);
router.post('/signup', signupCelebrate, postUser);

router.use(auth);

router.use('/', userRouter);
router.use('/', movieRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundDataError('Передан некорректный путь'));
});

module.exports = router;

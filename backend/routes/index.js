const mainRouter = require('express').Router();
const NotFoundError = require('../errors/not-found-err');

// Импорт роутеров
const cards = require('./cards');
const users = require('./users');
const signin = require('./signin');
const signup = require('./signup');

// Импорт авторизации
const auth = require('../middlewares/auth');

mainRouter.use('/signin', signin);
mainRouter.use('/signup', signup);
mainRouter.use('/users', auth, users);
mainRouter.use('/cards', auth, cards);
mainRouter.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = mainRouter;

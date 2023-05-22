const mainRouter = require('express').Router();

// Импорт роутеров
const cards = require('./cards');
const users = require('./users');
const signin = require('./signin');
const signup = require('./signup');

// Импорт авторизации
const auth = require('../middlewares/auth');

mainRouter.use('/signin', signin);
mainRouter.use('/signup', signup);
mainRouter.use(auth);
mainRouter.use('/users', users);
mainRouter.use('/cards', cards);

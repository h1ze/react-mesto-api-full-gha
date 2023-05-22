require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
// const { celebrate, Joi, errors } = require('celebrate');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const { PORT = 3000 } = process.env;
const mainRouter = require('./routes/index');
// const userRouter = require('./routes/users');
// const cardRouter = require('./routes/cards');
// const { login, createUser } = require('./controllers/users');
// const auth = require('./middlewares/auth');
// const NotFoundError = require('./errors/not-found-err');
// const REG_EXP = require('./config/regular');
const cors = require('./middlewares/cors');

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

app.use(helmet());

app.use(requestLogger); // подключаем логгер запросов до всех обработчиков роутов

app.use(cors); // подключаем обработку CORS запросов

// Роут для краш теста сервера
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(mainRouter);

// роуты, не требующие авторизации

// app.post('/signin', celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().required().email(),
//     password: Joi.string().required(),
//   }),
// }), login);

// app.post('/signup', celebrate({
//   body: Joi.object().keys({
//     name: Joi.string().min(2).max(30),
//     about: Joi.string().min(2).max(30),
//     avatar: Joi.string().pattern(REG_EXP),
//     email: Joi.string().required().email(),
//     password: Joi.string().required(),
//   }),
// }), createUser);

// авторизация
// app.use(auth);

// роуты, которым авторизация нужна
// app.use('/users', userRouter);
// app.use('/cards', cardRouter);

// app.use('*', (req, res, next) => {
//   next(new NotFoundError('Страница не найдена'));
// });

// обработчики ошибок

app.use(errorLogger); // подключаем логгер ошибок после обработчиков роутов до обработчиков ошибок

app.use(errors()); // обработчик ошибок celebrate

// централизованный обработчик ошибок

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });

  next();
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});

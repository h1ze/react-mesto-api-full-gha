require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const mainErorHandler = require('./middlewares/mainErorHandler');

const app = express();
const { PORT = 3000 } = process.env;
const mainRouter = require('./routes/index');
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

app.use('/', mainRouter);

// обработчики ошибок

app.use(errorLogger); // подключаем логгер ошибок после обработчиков роутов до обработчиков ошибок

app.use(errors()); // обработчик ошибок celebrate

// централизованный обработчик ошибок

app.use(mainErorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});

const { ValidationError, CastError, DocumentNotFoundError } = require('mongoose').Error;
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateToken } = require('../utils/token');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-err');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(201).send({
      data: {
        name: user.name, about: user.about, avatar: user.avatar, email: user.email,
      },
    }))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequestError('Некорректные данные при запросе'));
      } else if (err.code === 11000) {
        next(new ConflictError('Email должен быть уникальным'));
      } else {
        next(err);
      }
    });
};

// module.exports.getUserByID = (req, res, next) => {
//   User.findById(req.params.userId)
//     .orFail()
//     .then((user) => {
//       res.send({ data: user });
//     })
//     .catch((err) => {
//       if (err instanceof CastError) {
//         next(new BadRequestError('Некорректные данные при запросе'));
//       } else if (err instanceof DocumentNotFoundError) {
//         next(NotFoundError('Запрашиваемый пользователь не найден'));
//       } else {
//         next(err);
//       }
//     });
// };

// module.exports.getCurrentUser = (req, res, next) => {
//   User.findById(req.user._id)
//     .orFail()
//     .then((user) => {
//       res.send({ data: user });
//     })
//     .catch((err) => {
//       if (err instanceof DocumentNotFoundError) {
//         next(NotFoundError('Запрашиваемый пользователь не найден'));
//       } else {
//         next(err);
//       }
//     });
// };

function findUser(id, res, next) {
  User.findById(id)
    .orFail()
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err instanceof DocumentNotFoundError) {
        next(new NotFoundError(`Пользователь с ID ${id} не найден.`));
      } else if (err instanceof CastError) {
        next(new BadRequestError('Некорректные данные при запросе'));
      } else {
        next(err);
      }
    });
}

module.exports.getCurrentUser = (req, res, next) => {
  findUser(req.user._id, res, next);
};

module.exports.getUser = (req, res, next) => {
  findUser(req.params.userId, res, next);
};

// module.exports.updateUser = ((req, res, next) => {
//   // обновим имя найденного по _id пользователя
//   const { name, about } = req.body;
//   User.findByIdAndUpdate(req.user._id, { name, about }, {
//     new: true, // обработчик then получит на вход обновлённую запись
//     runValidators: true, // данные будут валидированы перед изменением
//   })
//     .orFail()
//     .then((user) => res.send({ data: user }))
//     .catch((err) => {
//       if (err instanceof ValidationError) {
//         next(new BadRequestError('Некорректные данные при запросе'));
//       } else if (err instanceof DocumentNotFoundError) {
//         next(NotFoundError('Запрашиваемый пользователь не найден'));
//       } else {
//         next(err);
//       }
//     });
// });

// module.exports.updateAvatar = ((req, res, next) => {
//   const { avatar } = req.body;
//   User.findByIdAndUpdate(req.user._id, { avatar }, {
//     new: true, // обработчик then получит на вход обновлённую запись
//     runValidators: true, // данные будут валидированы перед изменением
//   })
//     .orFail()
//     .then((user) => res.send({ data: user }))
//     .catch((err) => {
//       if (err instanceof ValidationError) {
//         next(new BadRequestError('Некорректные данные при запросе'));
//       } else if (err instanceof DocumentNotFoundError) {
//         next(NotFoundError('Запрашиваемый пользователь не найден'));
//       } else {
//         next(err);
//       }
//     });
// });

function updateUserData(userId, data, res, next) {
  User.findByIdAndUpdate(userId, data, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
  })
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequestError('Некорректные данные при запросе'));
      } else if (err instanceof DocumentNotFoundError) {
        next(NotFoundError('Запрашиваемый пользователь не найден'));
      } else {
        next(err);
      }
    });
}

module.exports.updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  updateUserData(req.user._id, { name, about }, res, next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  updateUserData(req.user._id, { avatar }, res, next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password, next)
    .then((user) => {
    // аутентификация успешна! пользователь в переменной user
      const token = generateToken({ _id: user._id });
      res.send({ token });
    })
    .catch(next);
};

const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const REG_EXP = require('../config/regular');

const {
  getUser, getUsers, updateUserInfo, updateAvatar, getCurrentUser,
} = require('../controllers/users');

userRouter.get('/', getUsers);

userRouter.get('/me', getCurrentUser);

userRouter.get('/:userId', celebrate({
  // валидируем userId
  params: Joi.object().keys({
    userId: Joi.string().required().length(24).hex(),
  }),
}), getUser);

userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUserInfo);

userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(REG_EXP),
  }),
}), updateAvatar);

module.exports = userRouter;

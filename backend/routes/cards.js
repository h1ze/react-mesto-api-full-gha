const cardRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const REG_EXP = require('../config/regular');

const {
  createCard, deleteCardByID, getCards, likeCard, dislikeCard,
} = require('../controllers/cards');

cardRouter.get('/', getCards);

cardRouter.delete('/:cardId', celebrate({
  // валидируем cardId
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
}), deleteCardByID);

cardRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(REG_EXP),
  }),
}), createCard);

cardRouter.put('/:cardId/likes', celebrate({
  // валидируем cardId
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
}), likeCard);

cardRouter.delete('/:cardId/likes', celebrate({
  // валидируем cardId
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
}), dislikeCard);

module.exports = cardRouter;

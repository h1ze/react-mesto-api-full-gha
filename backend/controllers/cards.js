const { ValidationError, CastError, DocumentNotFoundError } = require('mongoose').Error;
const Card = require('../models/card');
const ForbiddenError = require('../errors/forbidden-err');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => card.populate('owner'))
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequestError('Некорректные данные при запросе'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCardByID = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail()
    .then((card) => {
      if (card.owner._id.toString() !== req.user._id) {
        throw new ForbiddenError('Нельзя удалить чужие карточки');
      }
      card.deleteOne()
        .then(() => res.send({ message: 'Карточка успешно удалена' }))
        .catch(next);
    })
    .catch((err) => {
      if (err instanceof CastError) {
        next(new BadRequestError('Некорректные данные при запросе'));
      } else if (err instanceof DocumentNotFoundError) {
        throw new NotFoundError('Не найдена карточка с таким ID');
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail()
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err instanceof CastError) {
        next(new BadRequestError('Некорректные данные при запросе'));
      } else if (err instanceof DocumentNotFoundError) {
        throw new NotFoundError('Не найдена карточка с таким ID');
      } else {
        next(err);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Не найдена карточка с таким ID');
    })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err instanceof CastError) {
        next(new BadRequestError('Некорректные данные при запросе'));
      } else if (err instanceof DocumentNotFoundError) {
        throw new NotFoundError('Не найдена карточка с таким ID');
      } else {
        next(err);
      }
    });
};

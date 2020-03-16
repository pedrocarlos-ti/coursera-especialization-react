const express = require('express');
const FavoritesRouter = express.Router();
const FavoritesModel = require('../models/favorite');

const authenticate = require('../authenticate');

FavoritesRouter.use(express.json());

FavoritesRouter.route('/')
  .get(authenticate.verifyUser, (req, res) => {
    FavoritesModel.find({ user: req.user._id })
      .populate('user')
      .populate('dishes')
      .then(fav => res.json(fav));
  })
  .post(authenticate.verifyUser, (req, res, next) => {
    if (req.body.length) {
      FavoritesModel.find({ user: req.user._id }).then(favorite => {
        if (favorite.length) {
          const allFavorites = [
            ...favorite[0].dishes.map(f => String(f)),
            ...req.body.map(f => String(f._id))
          ];

          favorite[0].dishes = allFavorites.filter(
            (a, b) => allFavorites.indexOf(a) === b
          );
          favorite[0]
            .save()
            .then(update => res.json(update))
            .catch(err => res.json(err));
        } else {
          const payload = {
            user: req.user._id,
            dishes: req.body.map(f => f._id)
          };

          FavoritesModel.create(payload)
            .then(fav => res.json(fav))
            .catch(err => res.json(err));
        }
      });
    } else {
      const err = new Error('Body empty');
      err.status = 404;
      next(err);
    }
  })
  .delete(authenticate.verifyUser, (req, res) => {
    FavoritesModel.remove({ user: req.user._id })
      .then(_ => res.json(_))
      .catch(err => res.json(err));
  });

FavoritesRouter.route('/:id')
  .post(authenticate.verifyUser, (req, res) => {
    FavoritesModel.findOne({ user: req.user._id })
      .then(favorite => {
        favorite.dishes = favorite.dishes.filter(f => f != req.params.id);
        favorite.save().then(update => res.json(update));
      })
      .catch(err => res.json(err));
  })
  .delete(authenticate.verifyUser, (req, res, next) => {
    FavoritesModel.find({ user: req.user._id })
      .then(favorite => {
        if (favorite.length) {
          const favoritesLeft = favorite[0].dishes.filter(
            f => f != req.params.id
          );

          favorite[0].dishes = favoritesLeft;

          favorite[0].save().then(_ => res.json(_));
        } else {
          const err = new Error('Dish not valid');
          err.status = 404;
          next(err);
        }
      })
      .catch(err => res.json(err));
  });

module.exports = FavoritesRouter;

const express = require('express');
const mongoose = require('mongoose');
const dishRouter = express.Router();

const DishesModel = require('../models/dishes');

dishRouter.use(express.json());

dishRouter
  .route('/')
  .get((req, res, next) => {
    DishesModel.find({}).then(dish => {
      res.status(200).json(dish);
    });
  })
  .post((req, res, next) => {
    DishesModel.create(req.body)
      .then(dish => {
        res.status(200).json(dish);
      })
      .catch(err => res.status(400).send(err.toString()));
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
  })

  .delete((req, res, next) => {
    DishesModel.remove({}).then(del => res.json(del));
  });

dishRouter
  .route('/:id')
  .get((req, res, next) => {
    DishesModel.findById(req.params.id)
      .then(dish => {
        res.status(200).json(dish);
      })
      .catch(err => res.send(err.toString()));
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    DishesModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body
      },
      {
        new: true
      }
    ).then(dish => {
      res.status(200).json(dish);
    });
  })

  .delete((req, res, next) => {
    DishesModel.findByIdAndRemove(req.params.id).then(dish => res.json(dish));
  });

dishRouter
  .route('/:dishId/comments')
  .get((req, res, next) => {
    DishesModel.findById(req.params.dishId)
      .then(
        dish => {
          if (dish != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish.comments);
          } else {
            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
          }
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .post((req, res, next) => {
    DishesModel.findById(req.params.dishId)
      .then(
        dish => {
          if (dish != null) {
            dish.comments.push(req.body);
            dish.save().then(
              dish => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
              },
              err => next(err)
            );
          } else {
            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
          }
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end(
      'PUT operation not supported on /dishes/' +
        req.params.dishId +
        '/comments'
    );
  })
  .delete((req, res, next) => {
    DishesModel.findById(req.params.dishId)
      .then(
        dish => {
          if (dish != null) {
            for (var i = dish.comments.length - 1; i >= 0; i--) {
              dish.comments.id(dish.comments[i]._id).remove();
            }
            dish.save().then(
              dish => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
              },
              err => next(err)
            );
          } else {
            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
          }
        },
        err => next(err)
      )
      .catch(err => next(err));
  });

dishRouter
  .route('/:dishId/comments/:commentId')
  .get((req, res, next) => {
    DishesModel.findById(req.params.dishId)
      .then(
        dish => {
          if (dish != null && dish.comments.id(req.params.commentId) != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish.comments.id(req.params.commentId));
          } else if (dish == null) {
            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
          } else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);
          }
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end(
      'POST operation not supported on /dishes/' +
        req.params.dishId +
        '/comments/' +
        req.params.commentId
    );
  })
  .put((req, res, next) => {
    DishesModel.findById(req.params.dishId)
      .then(
        dish => {
          if (dish != null && dish.comments.id(req.params.commentId) != null) {
            if (req.body.rating) {
              dish.comments.id(req.params.commentId).rating = req.body.rating;
            }
            if (req.body.comment) {
              dish.comments.id(req.params.commentId).comment = req.body.comment;
            }
            dish.save().then(
              dish => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
              },
              err => next(err)
            );
          } else if (dish == null) {
            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
          } else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);
          }
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .delete((req, res, next) => {
    DishesModel.findById(req.params.dishId)
      .then(
        dish => {
          if (dish != null && dish.comments.id(req.params.commentId) != null) {
            dish.comments.id(req.params.commentId).remove();
            dish.save().then(
              dish => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
              },
              err => next(err)
            );
          } else if (dish == null) {
            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
          } else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);
          }
        },
        err => next(err)
      )
      .catch(err => next(err));
  });

module.exports = dishRouter;

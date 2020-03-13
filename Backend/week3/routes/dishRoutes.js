const express = require('express');
const dishRouter = express.Router();
const authenticate = require('../authenticate');

const DishesModel = require('../models/dishes');

dishRouter.use(express.json());

dishRouter
  .route('/')
  .get((req, res, next) => {
    DishesModel.find({})
      .populate('comments.author')
      .then(dish => {
        res.status(200).json(dish);
      })
      .catch(err => next(err));
  })
  .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    DishesModel.create(req.body)
      .then(dish => {
        res.status(200).json(dish);
      })
      .catch(err => res.status(400).send(err.toString()));
  })
  .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
  })

  .delete(
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      DishesModel.remove({}).then(del => res.json(del));
    }
  );

dishRouter
  .route('/:id')
  .get((req, res, next) => {
    DishesModel.findById(req.params.id)
      .populate('comments.author')
      .then(dish => {
        res.status(200).json(dish);
      })
      .catch(err => next(err));
  })
  .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
  })
  .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
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

  .delete(
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      DishesModel.findByIdAndRemove(req.params.id).then(dish => res.json(dish));
    }
  );

dishRouter
  .route('/:dishId/comments')
  .get((req, res, next) => {
    DishesModel.findById(req.params.dishId)
      .populate('comments.author')
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
  .post(authenticate.verifyUser, (req, res, next) => {
    DishesModel.findById(req.params.dishId)
      .then(
        dish => {
          if (dish != null) {
            console.log(req.user);
            req.body.author = req.user._id;
            dish.comments.push(req.body);
            dish
              .save()
              .then(dish => {
                DishesModel.findById(dish._id)
                  .populate('comments.author')
                  .then(dish => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(dish);
                  }),
                  err => next(err);
              })
              .catch(err => next(err));
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
  .put(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end(
      'PUT operation not supported on /dishes/' +
        req.params.dishId +
        '/comments'
    );
  })
  .delete(
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
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
    }
  );

dishRouter
  .route('/:dishId/comments/:commentId')
  .get((req, res, next) => {
    DishesModel.findById(req.params.dishId)
      .populate('comments.author')
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
  .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end(
      'POST operation not supported on /dishes/' +
        req.params.dishId +
        '/comments/' +
        req.params.commentId
    );
  })
  .put(authenticate.verifyUser, (req, res, next) => {
    const userID = req.user._id;
    const commentID = req.params.commentId;

    DishesModel.findById(req.params.dishId)
      .then(
        dish => {
          const userComment = dish.comments.find(
            comment => comment._id == commentID
          );

          const oldComments = dish.comments.filter(
            comment => comment._id != commentID
          );

          if (userComment) {
            const isUser = userID == userComment.author.toString();

            if (isUser) {
              if (userComment._id == commentID) {
                if (req.body.rating) {
                  userComment.rating = req.body.rating;
                }
                if (req.body.comment) {
                  userComment.comment = req.body.comment;
                }
              }

              dish
                .save({ dish, comments: [...oldComments, userComment] })
                .then(dish => {
                  DishesModel.findById(dish._id)
                    .populate('comments.author')
                    .then(dish => {
                      res.statusCode = 200;
                      res.setHeader('Content-Type', 'application/json');
                      res.json(dish);
                    }),
                    err => next(err);
                });
            } else {
              err = new Error(
                'Just the user that create the comment can delete'
              );
              err.status = 404;
              return next(err);
            }
          } else {
            err = new Error('Comment not exists');
            err.status = 404;
            return next(err);
          }
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .delete(authenticate.verifyUser, (req, res, next) => {
    const userID = req.user._id;
    const commentID = req.params.commentId;

    DishesModel.findById(req.params.dishId)
      .then(
        dish => {
          const userComment = dish.comments.find(
            comment => comment._id == commentID
          );

          if (userComment) {
            const isUser = userID == userComment.author.toString();

            if (isUser) {
              dish.comments.id(req.params.commentId).remove();
              dish.save().then(dish => {
                DishesModel.findById(dish._id)
                  .populate('comments.author')
                  .then(dish => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(dish);
                  }),
                  err => next(err);
              });
            } else {
              err = new Error(
                'Just the user that create the comment can delete'
              );
              err.status = 404;
              return next(err);
            }
          } else {
            err = new Error('Comment not exist');
            err.status = 404;
            return next(err);
          }
        },
        err => next(err)
      )
      .catch(err => next(err));
  });

module.exports = dishRouter;

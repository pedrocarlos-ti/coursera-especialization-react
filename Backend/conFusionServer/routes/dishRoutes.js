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

module.exports = dishRouter;

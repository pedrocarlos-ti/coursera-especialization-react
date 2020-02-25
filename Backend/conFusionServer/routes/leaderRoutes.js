const express = require('express');
const leaderRouter = express.Router();
const LeaderModel = require('../models/leaders');

leaderRouter.use(express.json());

leaderRouter
  .route('/')
  .get((req, res, next) => {
    LeaderModel.find({})
      .then(leader => res.json(leader))
      .catch(err => res.send(err));
  })
  .post((req, res, next) => {
    LeaderModel.create(req.body)
      .then(leader => res.json(leader))
      .catch(err => res.status(400).send(err));
  })
  .put((req, res, next) => {
    LeaderModel.findOne({ name: req.body.name })
      .then(leader => {
        if (leader) {
          return leader.update({
            $set: req.body
          });
        }
      })
      .then(leader => res.json(leader))
      .catch(err => res.send(err));
  })

  .delete((req, res, next) => {
    LeaderModel.remove({})
      .then(leader => res.json(leader))
      .catch(err => res.send(err));
  });

leaderRouter
  .route('/:id')
  .get((req, res, next) => {
    LeaderModel.findById(req.params.id)
      .then(leader => res.json(leader))
      .catch(err => res.send(err));
  })
  .post((req, res, next) => {
    res.end('Not necessary');
  })
  .put((req, res, next) => {
    LeaderModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body
      },
      { new: true }
    )
      .then(leader => res.json(leader))
      .catch(err => res.send(err));
  })

  .delete((req, res, next) => {
    LeaderModel.findByIdAndDelete(req.params.id)
      .then(leader => res.json(leader))
      .catch(err => res.send(err));
  });

module.exports = leaderRouter;

const express = require('express');
const promoRouter = express.Router();
const PromoModel = require('../models/promotions');

promoRouter.use(express.json());

promoRouter
  .route('/')
  .get((req, res, next) => {
    PromoModel.find({})
      .then(promo => res.json(promo))
      .catch(err => res.send(err));
  })
  .post((req, res, next) => {
    PromoModel.create(req.body)
      .then(newPromo => res.json(newPromo))
      .catch(err => res.status(400).send(err));
  })
  .put((req, res, next) => {
    PromoModel.findOne({ name: req.body.name })
      .then(promo => {
        if (promo) {
          return promo.update({
            $set: req.body
          });
        }
      })
      .then(promo => res.json(promo))
      .catch(err => res.send(err));
  })

  .delete((req, res, next) => {
    PromoModel.remove({})
      .then(promo => res.json(promo))
      .catch(err => res.send(err));
  });

promoRouter
  .route('/:id')
  .get((req, res, next) => {
    PromoModel.findById(req.params.id)
      .then(promo => res.json(promo))
      .catch(err => res.send(err));
  })
  .post((req, res, next) => {
    res.status(501).end();
  })
  .put((req, res, next) => {
    PromoModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body
      },
      { new: true }
    )
      .then(promo => res.json(promo))
      .catch(err => res.send(err));
  })

  .delete((req, res, next) => {
    PromoModel.findByIdAndDelete(req.params.id)
      .then(promo => res.json(promo))
      .catch(err => res.send(err));
  });

module.exports = promoRouter;

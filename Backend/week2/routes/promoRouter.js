const express = require("express");
const promoRouter = express.Router();

promoRouter.use(express.json());

promoRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res, next) => {
    res.end("Will send all the promotions to you!");
  })
  .post((req, res, next) => {
    res.end(
      "Will add the promotion: " +
        req.body.name +
        " with details: " +
        req.body.description
    );
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /promotions");
  })

  .delete((req, res, next) => {
    res.end("Deleting all promotions");
  });

promoRouter
  .route("/:id")
  .get((req, res, next) => {
    res.end(`Will send promotion ${req.params.id} to you!`);
  })
  .post((req, res, next) => {
    res.end(
      "Will add the promotion: " +
        req.body.name +
        " with details: " +
        req.body.description +
        " and id " +
        req.params.id
    );
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /promotions/" + req.params.id);
  })

  .delete((req, res, next) => {
    res.end("Deleting promotion " + req.params.id);
  });

module.exports = promoRouter;

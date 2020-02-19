const express = require("express");
const leaderRouter = express.Router();

leaderRouter.use(express.json());

leaderRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res, next) => {
    res.end("Will send all the leaders to you!");
  })
  .post((req, res, next) => {
    res.end(
      "Will add the leader: " +
        req.body.name +
        " with details: " +
        req.body.description
    );
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /leaders");
  })

  .delete((req, res, next) => {
    res.end("Deleting all leaders");
  });

leaderRouter
  .route("/:id")
  .get((req, res, next) => {
    res.end(`Will send leader ${req.params.id} to you!`);
  })
  .post((req, res, next) => {
    res.end(
      "Will add the leader: " +
        req.body.name +
        " with details: " +
        req.body.description +
        " and id " +
        req.params.id
    );
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /leaders/" + req.params.id);
  })

  .delete((req, res, next) => {
    res.end("Deleting leader " + req.params.id);
  });

module.exports = leaderRouter;

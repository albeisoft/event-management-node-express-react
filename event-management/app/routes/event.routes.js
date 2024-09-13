const { authJwt } = require("../middleware");
const controller = require("../controllers/event.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Get events (access to testEvents Events controller action) if user is logged in (default role is User)
  //app.get("/api/event", [authJwt.verifyToken], controller.testEvents);

  // Get events if user is logged in and have role of Moderator
  //app.get("/api/event", [authJwt.verifyToken, authJwt.isModerator], controller.testEvents);

  // Get all events filter by title
  //app.get("/api/event", controller.findAll);

  // Get all events filtred by city id and date
  app.get("/api/event", controller.findAllEventsByCityIdAndDate);

  // authenticated requests can create, modify, or delete events

  // Create a new event
  app.post("/api/event", [authJwt.verifyToken], controller.create);

  // Update event
  app.put("/api/event/:id", [authJwt.verifyToken], controller.update);

  // Delete event
  app.delete("/api/event/:id", [authJwt.verifyToken], controller.delete);
};

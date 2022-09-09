const route = require("express").Router();
const eventController = require("../controllers/event.controller");

// sortie event
route.get("/:id", eventController.readEvent);
route.post("/", eventController.createEvent);

route.get("/user/event", eventController.readAllUserEvent)


module.exports = route
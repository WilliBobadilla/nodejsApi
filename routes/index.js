// Animals endpoints for API

var express = require("express");
const app = require("../app");
const animalController = require("../controllers/animals");
const auth = require("../middlewares/authVerification");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.render("index");
});

router.post("/v1/animal", auth.verifyUser, animalController.add);

router.get("/v1/animal", auth.verifyUser, animalController.get);

router.get("/v1/animal/:id", auth.verifyUser, animalController.getById);

router.put("/v1/animal/:id", auth.verifyUser, animalController.update);

router.delete("/v1/animal/:id", auth.verifyUser, animalController.remove);

module.exports = router;

// Animals endpoints for API

const { json } = require("express");
var express = require("express");
const app = require("../app");
const animalcontroller = require("../controllers/animals");
const auth = require("../middlewares/authVerification");
var router = express.Router();
const { Animal } = require("../sequelize");

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/v1/animal", auth.verifyUser, animalcontroller.add);

router.get("/v1/animal", auth.verifyUser, animalcontroller.get);

router.get("/v1/animal/:id", auth.verifyUser, animalcontroller.getById);

router.put("/v1/animal/:id", auth.verifyUser, animalcontroller.update);

router.delete("/v1/animal/:id", auth.verifyUser, animalcontroller.remove);

module.exports = router;

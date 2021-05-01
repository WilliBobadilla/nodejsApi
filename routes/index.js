// Animals endpoints for API

const { json } = require("express");
var express = require("express");
const app = require("../app");
const animalcontroller = require("../controllers/animals");
var router = express.Router();
const { Animal } = require("../sequelize");

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/v1/animal/add", animalcontroller.add);

router.get("/v1/animal", animalcontroller.get);

router.get("/v1/animal/:id", animalcontroller.getById);

router.put("/v1/animal/:id/update", animalcontroller.update);

router.delete("/v1/animal/:id/delete", animalcontroller.remove);

module.exports = router;

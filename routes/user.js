// Animals endpoints for API

const { json } = require("express");
var express = require("express");
const app = require("../app");
const userController = require("../controllers/user");
const auth = require("../middlewares/authVerification");
var router = express.Router();
const { User } = require("../sequelize");

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/v1/user", userController.add);

//router.get("/v1/user", auth.verifyUser, userController.get);

//router.get("/v1/user/:id", auth.verifyUser, userController.getById);

router.put("/v1/user/:id", auth.verifyUser, userController.update);

router.delete("/v1/user/:id", auth.verifyUser, userController.remove);

router.post("/v1/user/login", userController.login);

module.exports = router;

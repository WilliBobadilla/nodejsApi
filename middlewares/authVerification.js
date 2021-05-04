const tokenUtil = require("../utils/tokenUtil");

function verifyUser(req, res, next) {
  if (!req.headers.authorization) {
    res.status(404).json({ error: "Auth token not found" });
    return;
  }
}

module.exports = { verifyUser };

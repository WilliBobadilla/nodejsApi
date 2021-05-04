const { token } = require("morgan");
const tokenUtil = require("../utils/tokenUtil");

async function verifyUser(req, res, next) {
  if (!req.headers.authorization) {
    res.status(404).json({ error: "Auth token not found" });
    return;
  }
  const verificationUser = await tokenUtil.decode(req.headers.authorization);
  console.log(verificationUser);
  if (verificationUser) {
    next();
  } else {
    return res.status(403).json({
      message: "Not authorized",
    });
  }
}

module.exports = { verifyUser };

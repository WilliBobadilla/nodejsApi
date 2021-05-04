const jwt = require("jsonwebtoken");
const Animal = require("../models/animals"); //model of animal
const { User } = require("../sequelize");
const SECRETKEY = "secretkeytogeneratetoken";
async function checkToken(token) {
  let currentUser = null; //dont't touch this, it works
  try {
    currentUser = await jwt.decode(token);
  } catch (e) {
    return false;
  }
  try {
    const user = await User.findOne({ where: { id: currentUser.id } });
    if (user) {
      const token = jwt.sign({ _id: user.id }, SECRETKEY, {
        expiresIn: "1h",
      });
      return token;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

function encode(id, email) {
  const token = jwt.sign({ id: id, email: email }, SECRETKEY, {
    expiresIn: "100",
  });
  return token;
}

async function decode(token) {
  try {
    const id = await jwt.verify(token, SECRETKEY);
    const user = await User.findOne({ where: { id: id } }); //fetch user
    if (user) {
      return user;
    } else {
      return false;
    }
  } catch (error) {
    const newToken = await checkToken(token);
    return newToken;
  }
}

module.exports = {
  encode,
  decode,
};

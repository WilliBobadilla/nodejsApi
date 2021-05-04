//user controller
const { User } = require("../sequelize");
const bcrypt = require("bcryptjs");
const token = require("../utils/tokenUtil");
/* POST method for user:
Example data in body request:
  {
    "name":"Pinkie",
    "age":12,
    "type":1,
    "direction":"Fossati y Palma, San Antonio"
  }
*/
async function add(req, res, next) {
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.json({ error: error });
  }
}

/*GET method for users
  fetchs all user in db
*/
async function get(req, res, next) {
  try {
    const query = await User.findAll();
    res.status(200).json(query);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
/*GET method for user with id 
fetchs user by id
*/
async function getById(req, res, next) {
  try {
    let id = req.params.id;
    const query = await User.findOne({ where: { id: id } });
    if (query == null)
      res.status(404).json({
        error: "There is not User with id " + id,
        message: "There was an error",
      });
    res.status(200).json(query);
  } catch (error) {
    res.status(500).json({
      error: error,
      message: "There was an error",
    });
  }
}
/*PUT method for update User with id in url:
example in url, where id is a number:
  baseUrl/api/animal/{id}
example data in body request, where :
  {
    "name":"pinkie",
    "age":13,
    "type":1
    "direction":"boqueron y fossatti"
  }
*/
async function update(req, res, next) {
  try {
    let data = req.body;
    let id = req.params.id;
    const query = await Animal.findOne({ where: { id: id } });
    if (query == null) {
      res.status(404).json({
        error: "There is not User with id " + id,
        message: "There was an error",
      });
      return;
    }
    const dataUpdated = await query.update(data);
    res.status(200).json({ data: dataUpdated });
  } catch (error) {
    res.status(500).json({
      error: error,
      message: "There was an error",
    });
  }
}
/*DELETE metthod to remove data with id:
example in url, where id is a number:
  baseUrl/api/animal/id
*/
async function remove(req, res, next) {
  try {
    let id = req.params.id;
    const result = await Animal.destroy({ where: { id: id } });
    if (result === 1) {
      res.status(200).json({ msg: "Deleted succesully", id: id });
      return;
    }
    res.status(404).json({
      error: "There is no register with id " + id,
      message: "There was an error",
    });
  } catch (error) {
    res.status(500).json({
      error: error,
      message: "There was an error",
    });
  }
}

async function login(req, res, next) {
  try {
    let user = await User.findOne({
      where: { email: req.body.email },
    });
    console.log(user);
    if (user) {
      //there is an user in db
      console.log("user" + user.password);
      console.log("body");
      //let verifyPass = await bcrypt.compare(req.body.password, user.password);
      let verifyPass = req.body.password == user.password ? true : false;
      console.log(verifyPass);
      if (verifyPass) {
        //create the toeken with user id, and email
        let generatedToken = await token.encode(user.id, user.email);
        res.status(200).json({ user: user, token: generatedToken });
      } else {
        //pass incorrect, but we don't have to say explicitly the error
        res.status(200).json({ msg: "Wrong Password or Email" });
      }
    } else {
      //user not found, but we don't have to say explicitly the error again
      res.status(200).json({ msg: "Wrong Password or Email" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
}

module.exports = { add, get, getById, update, remove, login };

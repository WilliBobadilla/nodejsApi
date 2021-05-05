//user controller
const { User } = require("../sequelize");
const token = require("../utils/tokenUtil");

/* POST method for user:
Example data in body request:
  {
    "name":"Williams",
    "lastName":"Bobadilla",
    "phoneNumber":"0979874",
    "idNumber":"999999",
    "email":"willi1997.1@gmail.com",
    "password":"admin321",
    "direction":"San antonio"

}
*/
async function add(req, res, next) {
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      error: error,
      message: "There was an error",
    });
  }
}

/*GET method for users
  fetchs all user in db
*/
async function get(req, res, next) {
  try {
    const query = await User.findAll();
    // to display the users, make sure that password is not shown
    // it is just a workarround for this problem

    query.forEach((user) => {
      console.log(user.password);
      user.password = "";
    });

    res.status(200).json(query);
  } catch (error) {
    res.status(500).json({
      error: error,
      message: "There was an error",
    });
  }
}
/*GET method for user with id 
fetchs user by id
example in url, where id is a number:
  baseUrl/user/{id}
*/
async function getById(req, res, next) {
  try {
    let id = req.params.id;
    const query = await User.findOne({ where: { id: id } });
    query.password = ""; //hide pass
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
  baseUrl/user/{id}
example data in body request:
 {
    "name":"Williams",
    "lastName":"Bobadilla",
    "phoneNumber":"0979874",
    "idNumber":"999999",
    "email":"willi1997.1@gmail.com",
    "password":"admin321",
    "direction":"San antonio"

}
example response:
{
    "data": {
        "id": 1,
        "name": "Williams",
        "lastName": "Bobadilla",
        "phoneNumber": "777777777",
        "idNumber": "7777777777",
        "email": "willi1997.1@gmail.com",
        "password": "admin321",
        "direction": "San Roque",
        "createdAt": "2021-05-04T16:59:44.866Z",
        "updatedAt": "2021-05-04T17:00:54.495Z"
    }
}
*/
async function update(req, res, next) {
  try {
    let data = req.body;
    let id = req.params.id;
    const query = await User.findOne({ where: { id: id } });
    if (query == null) {
      res.status(404).json({
        error: "There is not register with id " + id,
        message: "There was an error",
      });
      return;
    }
    const dataUpdated = await query.update(data);
    res.status(200).json(dataUpdated);
  } catch (error) {
    res.status(500).json({
      error: error,
      message: "There was an error",
    });
  }
}
/*DELETE metthod to remove User with id:
example in url, where id is a number:
  baseUrl/user/{id}
*/
async function remove(req, res, next) {
  try {
    let id = req.params.id;
    const result = await User.destroy({ where: { id: id } });
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
/*
Login function
example data in body request:
 {
    "email":"willi1997.1@gmail.com",
    "password":"admin321",
}
example response: 
{
    "user": {
        "id": 1,
        "name": "Williams",
        "lastName": "Bobadilla",
        "phoneNumber": "0979874",
        "idNumber": "999999",
        "email": "willi1997.1@gmail.com",
        "password": "admin321",
        "direction": "San antonio",
        "createdAt": "2021-05-04T16:48:20.346Z",
        "updatedAt": "2021-05-04T16:48:20.346Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ3aWxsaTE5OTcuMUBnbWFpbC5jb20iLCJpYXQiOjE2MjAxNDY5MDMsImV4cCI6MTYyMDE0NjkwM30.npdbfRrpBejtZAOZ1KfFKAb1jqNqzVrKUXMC7WTdhNo"
}
*/
async function login(req, res, next) {
  try {
    let user = await User.findOne({
      where: { email: req.body.email },
    });
    if (user) {
      //there is an user in db
      let verifyPass = req.body.password == user.password ? true : false;
      console.log(verifyPass);
      if (verifyPass) {
        //create the toeken with user id, and email
        let generatedToken = await token.encode(user.id, user.email);
        res.status(200).json({ user: user, token: generatedToken });
      } else {
        //pass incorrect, but we don't have to say explicitly the error
        res.status(404).json({
          error: "Wrong password or email",
          message: "There was an error",
        });
      }
    } else {
      //user not found, but we don't have to say explicitly the error again
      res.status(404).json({
        error: "Wrong password or email",
        message: "There was an error",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
      message: "There was an error",
    });
  }
}

module.exports = { add, get, getById, update, remove, login };

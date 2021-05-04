const Sequelize = require("sequelize");
const fs = require("fs");
const AnimalModel = require("./models/animals");
const UserModel = require("./models/user");
//const { Json } = require("sequelize/types/lib/utils");

const sequelize = new Sequelize("animalsdb", "root", "root", {
  dialect: "sqlite",
  storage: "./veterinaria.sqlite",
});

const Animal = AnimalModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);
sequelize.sync({ force: true }).then(() => {
  console.log(`Connected to DataBase`);
});

fs.readFile("data/UserData.json", "utf-8", function (err, data) {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
  //const response = User.bulkCreate(JSON.parse(data.toString()));
  //console.log(response);
});

module.exports = {
  Animal,
  User,
};

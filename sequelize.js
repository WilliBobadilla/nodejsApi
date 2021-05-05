const Sequelize = require("sequelize");
const fs = require("fs");
const AnimalModel = require("./models/animals");
const UserModel = require("./models/user");

const sequelize = new Sequelize("animalsdb", "root", "root", {
  dialect: "sqlite",
  storage: "./vet.sqlite",
});

const Animal = AnimalModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);
sequelize.sync().then(() => {
  console.log(`Connected to DataBase`);
});

//create users in the db
fs.readFile("data/UserData.json", "utf-8", async function (err, data) {
  if (err) {
    console.error(err);
    return;
  }
  jsonData = JSON.parse(data);
  await User.bulkCreate(jsonData, { returning: true });
});
//create animals in the db
fs.readFile("data/AnimalData.json", "utf-8", async function (err, data) {
  if (err) {
    console.error(err);
    return;
  }
  jsonData = JSON.parse(data);
  await Animal.bulkCreate(jsonData, { returning: true });
});
module.exports = {
  Animal,
  User,
};

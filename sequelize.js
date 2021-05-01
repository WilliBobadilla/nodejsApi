const Sequelize = require("sequelize");
const AnimalModel = require("./models/animals");

const sequelize = new Sequelize("codementor", "root", "root", {
  dialect: "sqlite",
  storage: "veterinaria.sqlite",
});

const Animal = AnimalModel(sequelize, Sequelize);

sequelize.sync({ force: true }).then(() => {
  console.log(`Connected to DataBase`);
});

module.exports = {
  Animal,
};

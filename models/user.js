module.exports = function (sequelize, DataTypes) {
  return sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    idNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      // set(value) {
      //   // Storing passwords in plaintext in the database is terrible.
      //   // Hashing the value with an appropriate cryptographic hash function is better.
      //   // Using the username as a salt is better.

      //   this.setDataValue("password", hash(this.name + value));
      // },
    },
    direction: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

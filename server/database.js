const { Sequelize } = require("sequelize");

module.exports = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_LOGIN,
    process.env.DB_PASSWORD,
    {
        dialect: "postgres",
        host: process.env.DB_HOST
    }
);
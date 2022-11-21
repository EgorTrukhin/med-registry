const sequelize = require("../database");
const { DataTypes } = require("sequelize");

const Type = sequelize.define("type", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING}
});

const Treat = sequelize.define("treat", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING}
});

Type.hasMany(Treat)
Treat.belongsTo(Type)

module.exports = { Type, Treat }
"use strict";
const { Sequelize } = require("sequelize");
//requires Sequelize package

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);
const connectMysql = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Successful connection to MySQL Database ${process.env.DB_NAME}`); //connection message
  } catch (error) {
    console.error("Unable to connect to MySQL database:", error); //error message for unsuccessful connection
    process.exit(1);
  }
};
connectMysql();
module.exports = {
  Sequelize: sequelize,
  connectMysql,
};

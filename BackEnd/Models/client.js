const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class Client extends Model {}

Client.init(
  {
    clientID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING(30),
      allowNull: false,
      required: true,
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      required: true,
    },
    emailAddress: {
      type: DataTypes.STRING(200),
      allowNull: false,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    address: {
      type: DataTypes.STRING(250),
      allowNull: false,
      required: true,
    },
    buyingOrSelling: {
      type: DataTypes.STRING(20),
      allowNull: false,
      required: true,
    },
    reqBedsMin: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
    },
    reqBedsMax: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
    },
    reqBaths: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
    },
    reqLiving: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
    },
    reqGarage: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    reqSuburb: {
      type: DataTypes.STRING(100),
      allowNull: false,
      required: true,
    },
    priceLimit: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
    },
    userID: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "userID",
      },
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "clients", // use lowercase plural format
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Client;

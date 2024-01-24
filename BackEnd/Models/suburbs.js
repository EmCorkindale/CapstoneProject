const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class Suburbs extends Model {}

Suburbs.init(

  {
    suburbID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    clientID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "clients",
        key: "clientID",
    }},
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      required: true,
    },
    

  },
  {
    sequelize: sequelizeInstance,
    modelName: "suburbs", // use lowercase plural format
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Suburbs;

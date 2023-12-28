const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class Property extends Model {}

Property.init(
  {
    propertyID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    propertyAddress: {
      type: DataTypes.STRING(100),
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
    modelName: "properties", // use lowercase plural format
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Property;

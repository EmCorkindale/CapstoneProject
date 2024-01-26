const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class OpenHomeAttendee extends Model {}

OpenHomeAttendee.init(
  {
    openHomeAttendeeID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    propertyID: {
      type: DataTypes.INTEGER,
      references: {
        model: "properties",
        key: "propertyID",
      },
    },
    clientID: {
      type: DataTypes.INTEGER,
      references: {
        model: "clients",
        key: "clientID",
      },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  },
  {
    sequelize: sequelizeInstance,
    modelName: "openHomeAttendees", // use lowercase plural format
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = OpenHomeAttendee;
 
const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;
class User extends Model { }
//Sequelize will create this table if it doesn't exist on startup
User.init({
userID: {
type: DataTypes.INTEGER, allowNull: false, autoIncrement:
true, primaryKey: true
},
firstName: {
type: DataTypes.STRING, allowNull: false, required: true
},
lastName: {
type: DataTypes.STRING, allowNull: false, required: true
},
emailAddress: {
type: DataTypes.STRING, allowNull: false, required: true,
unique: true
},
password: {
type: DataTypes.STRING, allowNull: false, required: true
}},
{
sequelize: sequelizeInstance, modelName: 'users', //use lowercase plural format
timestamps: false, freezeTableName: true
}
)
module.exports = User;
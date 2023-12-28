const { DataTypes, Model } = require("sequelize");
const crypto = require("crypto");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

// Function to hash the password using Node.js crypto module (this is irreversable and doesn't store the acual password. User enters their password on login and it will hash it and compare to hashed password)
const hash = (password) => {
  const hash = crypto.createHash("sha256");
  hash.update(password);
  return hash.digest("hex");
};

class User extends Model {}

User.init(
  {
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      set(value) {
        // Hashes the password using the defined hash function
        this.setDataValue("password", hash(value));
      },
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "users", // use lowercase plural format
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = User;

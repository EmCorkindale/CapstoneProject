"use strict";
const Client = require("./client"); // require the client model
const User = require("./user"); // require the user model
const Property = require("./property"); //require the property model

async function init() {
  try {
    // Sync models
    await User.sync();
    await Client.sync();
    await Property.sync();

    // Setting up the foreign key "userID" in the Client table
    User.hasMany(Client, { foreignKey: "userID" });
    Client.belongsTo(User, { foreignKey: "userID" });
  } catch (error) {
    console.error("Error syncing models:", error);
  }
// Setting up the foreign key "userID" in Properties table
User.hasMany(Property, {foreignKey: "userID"});
Property.belongsTo(User, {foreignKey: "userID"});
}

// Call the init function to set up the models and relationships
init();

module.exports = {
  User, // export the User model
  Client, // export the Client model
  Property // export the Property model
};

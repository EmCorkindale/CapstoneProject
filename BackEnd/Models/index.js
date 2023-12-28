"use strict";
const Client = require("./client"); // require the client model
const User = require("./user"); // require the user model

async function init() {
  try {
    // Sync both User and Client models
    await User.sync();
    await Client.sync();

    // Setting up the foreign key "userID" in the Client table
    User.hasMany(Client, { foreignKey: "userID" });
    Client.belongsTo(User, { foreignKey: "userID" });
  } catch (error) {
    console.error("Error syncing models:", error);
  }
}

// Call the init function to set up the models and relationships
init();

module.exports = {
  User, // export the User model
  Client, // export the Client model
};

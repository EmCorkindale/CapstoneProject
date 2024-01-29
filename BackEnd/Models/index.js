"use strict";
const Client = require("./client"); // require the client model
const User = require("./user"); // require the user model
const Property = require("./property"); //require the property model
const OpenHomeAttendee = require("./openHomeAttendee"); // require the openHomeAttendee model
const Suburbs = require("./suburbs"); //require the suburb model

async function init() {
  try {
    // Sync models
    await User.sync();
    await Client.sync();
    await Property.sync();
    await OpenHomeAttendee.sync();
    await Suburbs.sync();

    // Setting up the foreign key "userID" in the Client table
    User.hasMany(Client, { foreignKey: "userID" });
    Client.belongsTo(User, { foreignKey: "userID" });

    // Setting up the foreign key "userID" in Properties table
    User.hasMany(Property, { foreignKey: "userID" });
    Property.belongsTo(User, { foreignKey: "userID" });

    // Setting up the foreign key "clientID" in Suburbs table
    Client.hasMany(Suburbs, {as: "selectedSuburbs",  foreignKey: "clientID" });
    Suburbs.belongsTo(Client, { foreignKey: "clientID" });

    // Setting up the foreign keys 'propertyID' and 'clientID' in the openHomeAttendees table
    Property.hasMany(OpenHomeAttendee, { foreignKey: "propertyID" });
    OpenHomeAttendee.belongsTo(Property, { foreignKey: "propertyID" });
    Client.hasMany(OpenHomeAttendee, { foreignKey: "clientID" });
    OpenHomeAttendee.belongsTo(Client, { foreignKey: "clientID" });
  } catch (error) {
    console.error("Error syncing models:", error);
  }
}

// Call the init function to set up the models and relationships
init();

module.exports = {
  User,
  Client,
  Property,
  OpenHomeAttendee,
  Suburbs,
};

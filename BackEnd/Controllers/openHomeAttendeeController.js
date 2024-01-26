"use strict";
const { DATE } = require("sequelize");
const Models = require("../Models");

//Function to return all people that attended an open home.
const getOpenHomeAttendees = (req, res) => {
  Models.OpenHomeAttendee.findAll({})
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};

//function to add add open home attendees and check for new clients / existing clients
const addOpenHomeAttendees = async (req, res) => {
  const {
    firstName,
    lastName,
    emailAddress,
    phoneNumber,
    address,
    buyingOrSelling,
    reqBedsMin,
    reqBedsMax,
    reqBaths,
    reqLiving,
    reqGarage,
    priceLimit,
    suburbNames,
  } = req.body;

  // Check if a client with the given email exists
  let client = await Models.Client.findOne({
    where: { emailAddress: emailAddress },
  });

  let openHomeAttendee = {}; // Define openHomeAttendee

  if (client) {
    // Client with the email exists, use the existing client's ID
    openHomeAttendee.clientID = client.clientID;
  } else {
    // Client with the email does not exist, create a new client
    client = await Models.Client.create({
      firstName,
      lastName,
      emailAddress,
      phoneNumber,
      address,
      buyingOrSelling,
      reqBedsMin,
      reqBedsMax,
      reqBaths,
      reqLiving,
      reqGarage,
      priceLimit,
    });

    // Associate suburbs with the new client
    const suburbsToAdd = Array.isArray(suburbNames) ? suburbNames : [];
    await Models.Suburbs.bulkCreate(
      suburbNames.map((suburbName) => ({
        name: suburbName, // Use suburbName here
        clientID: client.clientID,
      }))
    );

    openHomeAttendee.clientID = client.clientID;
  }

  // Add the openHomeAttendee to the OpenHomeAttendee table
  openHomeAttendee.propertyID = req.params.propertyID;
  openHomeAttendee.date = new Date();
  const createdOpenHomeAttendee = await Models.OpenHomeAttendee.create(
    openHomeAttendee
  );

  // Send a response if needed
  res.send({ result: 204 });
};

module.exports = { getOpenHomeAttendees, addOpenHomeAttendees };

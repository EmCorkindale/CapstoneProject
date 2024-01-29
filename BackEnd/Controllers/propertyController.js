"use strict";
const Models = require("../Models");
const OpenHomeAttendee = require("../Models/openHomeAttendee");

//Function to return all properties that the user has loaded on the open home page
const getProperties = (req, res) => {
  Models.Property.findAll({
    /*where: {userID: req.userID}*/
  }) // only returns property for selected user
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};

//Function to add new properties to users' open home properties
const addProperties = async (req, res) => {
  try {
    const property = req.body;
    /*const userID = req.userID; 

    // Add userId to the property object before creating it
    property.userID = userID;*/

    const createdProperty = await Models.Property.create(property);
    res.status(200).json({ result: 200, property: createdProperty });
  } catch (error) {
    res.status(500).json({ error: "Error adding property" });
  }
};

// Function for deleting properties on the open home page
const deleteProperty = async (req, res) => {
  try {
    // Delete OpenHomeAttendee records first
    await Models.OpenHomeAttendee.destroy({
      where: { propertyID: req.params.propertyID },
    });

    // Then, delete the Property record
    const result = await Models.Property.destroy({
      where: { propertyID: req.params.propertyID },
    });

    if (result === 0) {
      // No records were deleted (property not found)
      return res.status(404).send({ error: "Property not found" });
    }

    res.status(204).send(); // Successful deletion, no content response
  } catch (error) {
    console.error("Error deleting property:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//function to update property details
const updateProperty = async (req, res) => {
  await Models.Property.update(req.body, {
    where: { propertyID: req.params.propertyID },
  });
  res.send({ result: 200, property: req.body });
};
module.exports = {
  getProperties,
  addProperties,
  deleteProperty,
  updateProperty,
};

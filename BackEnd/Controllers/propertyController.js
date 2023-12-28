"use strict";
const Models = require("../Models");

//Function to return all properties that the user has loaded on the open home page
const getProperties = (req, res) => {
  Models.Property.findAll({})
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};


//Function to add new properties to users' open home properties
const addProperties = async (req, res) => {
  const property = req.body;
  const createdProperty = await Models.Property.create(property);
  res.send({ result: 200, property: createdProperty });
};

//Function for deleting properties on open home page
const deleteProperty = async (req, res) => {
  await Models.Property.destroy({
    where: { propertyID: req.params.propertyID },
  });
  res.send({ result: 204 });
};

//function to update property details
const updateProperty = async (req, res) => {
  await Models.Property.update(req.body, {
    where: { propertyID: req.params.propertyID },
  });
  res.send({ result: 200, property: req.body });
};
module.exports = { getProperties, addProperties, deleteProperty, updateProperty };

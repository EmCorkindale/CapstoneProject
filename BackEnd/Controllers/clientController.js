"use strict";
const { query } = require("express");
const Models = require("../Models");

//Function to return all clients in the users' client base
const getClients = (req, res) => {
  Models.Client.findAll({})
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};

//Function to add new client to users' client base
const addClient = async (req, res) => {
  const client = req.body;
  const createdClient = await Models.Client.create(client);
  res.send({ result: 200, client: createdClient });
};

//Function for deleting clients
const deleteClient = async (req, res) => {
  await Models.Client.destroy({
    where: { clientID: req.params.clientID },
  });
  res.send({ result: 204 });
};

//function to update client details
const updateClient = async (req, res) => {
  await Models.Client.update(req.body, {
    where: { clientID: req.params.clientID },
  });
  res.send({ result: 200, client: req.body });
};

//function to filter clients based on external api search paramaters
const { Op } = require("sequelize");

const filterClients = async (req, res) => {
  try {
    
    const {  priceHigh, bedrooms, bathrooms } = req.query;
    const bedroomsInt = parseInt(bedrooms);
    const bathroomsInt = parseInt(bathrooms);

    // Build query parameters
    let filters = {};

    if (bedroomsInt) {
      filters.reqBedsMin= {
        [Op.lte]: bedroomsInt,
      };
    }

    // if (suburbIds) {
    //   filters.suburbId = suburbIds;
    // }

    if (priceHigh) {
      filters.priceLimit = {
        [Op.lte]: priceHigh,
      };
    }

    if (bedroomsInt) {
      filters.reqBedsMax = {
        [Op.gte]: bedroomsInt,
      };
    }

    if (bathroomsInt) {
      filters.reqBaths = bathroomsInt;
    }
    console.log(filters);
    const clients = await Models.Client.findAll({
      where: filters,
    });

    res.json({
      clients: clients,
    });
  } catch (err) {
    console.error("Error filtering clients:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = {
  getClients,
  addClient,
  deleteClient,
  updateClient,
  filterClients,
};

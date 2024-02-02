"use strict";
const { query } = require("express");
const Models = require("../Models");
const { Op, where } = require("sequelize");

//Function to return all clients in the users' client base
// const getClients = (req, res) => {
//   const clientID = Models.Client.clientID;

//   Models.Client.findAll({
//     where: { clientID },
//     include: [{
//       model: Models.Suburbs,
//       required: true
//     }]
//   })
//     .then(function (data) {
//       res.send({ result: 200, data: data });
//     })
//     .catch((err) => {
//       throw err;
//     });
// };
const getClients = async (req, res) => {
  try {
    const clientsData = await Models.Client.findAll({
      include: [{
        model: Models.Suburbs,
        as: 'selectedSuburbs',
        attributes: ['name'],
      }],
    });

    res.send({ result: 200, data: clientsData });
  } catch (err) {
    console.error("Error fetching clients:", err);
    res.status(500).send({ result: 500, error: "Internal Server Error" });
  }
};
//Function to return a specific client in the users' client base by their clientID
const getSpecificClient = (req, res) => {
  const { clientID } = req.params;

  Models.Client.findOne({
    where: {
      clientID: clientID,
    },
  })
    .then(function (data) {
      if (data) {
        res.send({ result: 200, data: data });
      } else {
        res.status(404).send({ result: 404, error: "Client not found" });
      }
    })
    .catch((err) => {
      console.error("Error fetching specific client:", err);
      res.status(500).send({ result: 500, error: "Internal Server Error" });
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

//function to add suburbs to client's property wishlist
const addSuburb = async (req, res) => {
  const suburb = req.body;
  const suburbCreate = await Models.Suburbs.create(suburb);
  res.send({ result: 200, client: suburbCreate });
};

//function to filter clients based on external api search paramaters
const filterClients = async (req, res) => {
  try {
    const { priceHigh, bedrooms, bathrooms, suburb } = req.query;
    const bedroomsInt = parseInt(bedrooms);
    const bathroomsInt = parseInt(bathrooms);

    // Build query parameters for Clients
    let clientFilters = {};

    if (bedroomsInt) {
      clientFilters.reqBedsMin = {
        [Op.lte]: bedroomsInt,
      };
      clientFilters.reqBedsMax = {
        [Op.gte]: bedroomsInt,
      };
    }

    // if (priceHigh) {
    //   clientFilters.priceLimit = {
    //     [Op.lte]: priceHigh,
    //   };
    // }

    if (bathroomsInt) {
      clientFilters.reqBaths = {
        [Op.lte]: bathroomsInt,
      };
    }

    // Build query parameters for Suburbs
    let suburbFilters = {};

    if (suburb) {
      suburbFilters.name = suburb;
    }

    // Perform a join operation
    const clients = await Models.Client.findAll({
      where: clientFilters,
      include: [
        {
          model: Models.Suburbs,
          as: 'selectedSuburbs',
          where: suburbFilters,
        },
      ],
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
  getSpecificClient,
  addClient,
  deleteClient,
  updateClient,
  filterClients,
  addSuburb,
};

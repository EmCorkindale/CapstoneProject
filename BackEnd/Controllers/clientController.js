"use strict";
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
module.exports = { getClients, addClient, deleteClient, updateClient };

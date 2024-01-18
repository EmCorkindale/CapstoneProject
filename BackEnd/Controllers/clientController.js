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
const filterClients = async (req, res) => {
  const { suburbIds } = req.params;
  const { PriceLow } = req.params;
  const { PriceHigh } = req.params;
  const { Bedrooms } = req.params;
  const { Bathrooms } = req.params;
  try {
    const response = await axios.get(
      `https://api.tmsandbox.co.nz/v1/Search/Property/Residential.json?suburb=${req.query.suburbIds}&price_min=${req.query.PriceLow}&price_max=${req.query.PriceHigh}&bedrooms_min=${req.query.Bedrooms}&bathrooms_min=${req.query.Bathrooms}`,
    {
        headers: {
          Authorization:
            'OAuth oauth_consumer_key=EC3038651DE14CEF11D0F8A176D435D1 , oauth_signature_method="PLAINTEXT", oauth_signature="1792449D599CA95F63F353905FC78518&"',
        },
      }
    );

    const propertyInfo = response.data.data;

    const clients = await Models.Client.findAll({
      where: {
        reqSuburb: propertyInfo.List.Suburb,
        priceLimit: propertyInfo.StartPrice,
        reqBedrooms: propertyInfo.Bedrooms,
        reqBathrooms: propertyInfo.Bathrooms,
      },
    });

    res.json({
      property: propertyInfo,
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

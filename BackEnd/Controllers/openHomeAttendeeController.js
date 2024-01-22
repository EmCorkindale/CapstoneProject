"use strict";
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


//Function to add new attendees to open home register
const addOpenHomeAttendees = async (req, res) => {
  const openHomeAttendee = req.body;
  const createdOpenHomeAttendee = await Models.OpenHomeAttendee.create(openHomeAttendee);
  res.send({ result: 200, openHomeAttendee: createdOpenHomeAttendee });
};

// //Function for deleting attendees from open home
// const deleteOpenHomeAttendee = async (req, res) => {
//   await Models.OpenHomeAttendee.destroy({
//     where: { propertyID: req.params.openHomeAttendeeID },
//   });
//   res.send({ result: 204 });
// };

// //function to update open home attendee details
// const updateOpenHomeAttendee = async (req, res) => {
//   await Models.OpenHomeAttendee.update(req.body, {
//     where: { openHomeAttendeeID: req.params.openHomeAttendeeID },
//   });
//   res.send({ result: 200, openHomeAttendee: req.body });
// };
module.exports = { getOpenHomeAttendees, addOpenHomeAttendees };

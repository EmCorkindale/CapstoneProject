"use strict";
const Models = require("../Models");

//get user function to return all users in database
const getUsers = (req,res) => {
  Models.User.findAll({})
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};

//add user function to add new users to database
const addUser = async (req, res) => {
  const user = req.body;
  const createdUser = await Models.User.create(user);
  res.send({ result: 200, user: createdUser });
};

//delete user function for deleting users
const deleteUser = async (req, res) => {
  await User.destroy({
    where: { userID: req.params.userID },
  });
  res.send({ result: 204 });
};

//function to update user details
const updateUser = async (req, res) => {
  await User.update(req.body, {
    where: { userID: req.params.userID },
  });
  res.send({ result: 200, user: req.body });
};
module.exports = { getUsers, addUser, deleteUser, updateUser };

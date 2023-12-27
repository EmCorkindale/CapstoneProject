const express = require("express");
const router = express.Router();
const usersController = require("../Controllers/userController");
router.get("/", usersController.getUsers);
router.post("/", usersController.addUser);
router.delete("/:userID", usersController.deleteUser);
router.put("/:userID", usersController.updateUser);
module.exports = router;

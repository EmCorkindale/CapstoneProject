const express = require("express");
const router = express.Router();
const clientController = require("../Controllers/clientController");
router.get("/", clientController.getClients);
router.post("/", clientController.addClient);
router.delete("/:clientID", clientController.deleteClient);
router.put("/:clientID", clientController.updateClient);
module.exports = router;

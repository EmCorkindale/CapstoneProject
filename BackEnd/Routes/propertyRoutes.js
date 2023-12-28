const express = require("express");
const router = express.Router();
const propertyController = require("../Controllers/propertyController");
router.get("/", propertyController.getProperties);
router.post("/", propertyController.addProperties);
router.delete("/:propertyID", propertyController.deleteProperty);
router.put("/:propertyID", propertyController.updateProperty);
module.exports = router;

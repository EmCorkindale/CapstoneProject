const express = require("express");
const router = express.Router();
const propertyController = require("../Controllers/propertyController");
router.get("/getProperties", propertyController.getProperties);
router.post("/addProperty", propertyController.addProperties);
router.delete("/:propertyID", propertyController.deleteProperty);
router.put("/:propertyID", propertyController.updateProperty);
module.exports = router;

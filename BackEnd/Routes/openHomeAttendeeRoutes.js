const express = require("express");
const router = express.Router();
const openHomeAttendeeController = require("../Controllers/openHomeAttendeeController");
router.get("/getOpenHomeAttendees/:propertyID", openHomeAttendeeController.getOpenHomeAttendees);
router.post("/addOpenHomeAttendees/:propertyID", openHomeAttendeeController.addOpenHomeAttendees);
module.exports = router;

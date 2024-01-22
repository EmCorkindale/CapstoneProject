const express = require("express");
const router = express.Router();
const openHomeAttendeeController = require("../Controllers/openHomeAttendeeController");
router.get("/", openHomeAttendeeController.getOpenHomeAttendees);
router.post("/", openHomeAttendeeController.addOpenHomeAttendees);
module.exports = router;

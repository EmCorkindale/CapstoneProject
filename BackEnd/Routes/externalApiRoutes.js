const express = require("express");
const router = express.Router();
const externalApiController = require("../Controllers/externalApiController");

router.get("/getRegions", externalApiController.fetchRegions);
router.get("/getDistricts/:regionId", externalApiController.fetchDistricts); 
router.get("/getSuburbs/:regionId/:districtId", externalApiController.fetchSuburbs);
router.get("/getSuburb/:regionId/:districtId/:suburbId", externalApiController.fetchIndividualSuburb);
router.get("/getCurrentListings", externalApiController.fetchProperty);

module.exports = router;


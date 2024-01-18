const axios = require("axios");
const { response } = require("express");
const { TIME } = require("sequelize");
//Fetches regions of nz
const fetchRegions = (req, res) => {
  axios
    .get("https://api.trademe.co.nz/v1/Localities.json")
    .then((response) => {
      // Send a response with the data from the Trademe API
      res.status(200).json({ result: 200, data: response.data });
    })
    .catch((error) => {
      // Handle errors and send an appropriate response
      console.error(error);
      res.status(500).json({ result: 500, error: "Internal Server Error" });
    });
};
//For fetching districts based on user's selection
const fetchDistricts = (req, res) => {
  const { regionId } = req.params;

  axios
    .get(`https://api.trademe.co.nz/v1/Localities/Region/${regionId}.json`)
    .then((response) => {
      // Send a response with the data from the Trademe API
      res.status(200).json({ result: 200, data: response.data });
    })
    .catch((error) => {
      // Handle errors and send an appropriate response
      console.error(error);
      res.status(500).json({ result: 500, error: "Internal Server Error" });
    });
};
//For fetching suburbs based on user's selection
const fetchSuburbs = (req, res) => {
  const { regionId } = req.params;
  const { districtId } = req.params;

  axios
    .get(
      `https://api.trademe.co.nz/v1/Localities/Region/${regionId}/${districtId}.json`
    )
    .then((response) => {
      // Send a response with the data from the Trademe API
      res.status(200).json({ result: 200, data: response.data });
    })
    .catch((error) => {
      // Handle errors and send an appropriate response
      console.error(error);
      res.status(500).json({ result: 500, error: "Internal Server Error" });
    });
};

const fetchIndividualSuburb = (req, res) => {
  const { regionId } = req.params;
  const { districtId } = req.params;
  const { suburbId } = req.params;
  axios
    .get(
      `https://api.trademe.co.nz/v1/Localities/Region/${regionId}/${districtId}/${suburbId}.json`
    )
    .then((response) => {
      // Send a response with the data from the Trademe API
      res.status(200).json({ result: 200, data: response.data });
    })
    .catch((error) => {
      // Handle errors and send an appropriate response
      console.error(error);
      res.status(500).json({ result: 500, error: "Internal Server Error" });
    });
};

const fetchAdjacentSuburbs = (req, res) => {
  const { regionId } = req.params;
  const { districtId } = req.params;
  const { suburbId } = req.params;
  axios
    .get(
      `https://api.trademe.co.nz/v1/Localities/Region/${regionId}/${districtId}/${suburbId}.json`
    )
    .then((response) => {
      // Send a response with the data from the Trademe API
      res.status(200).json({ result: 200, data: response.data });
    })
    .catch((error) => {
      // Handle errors and send an appropriate response
      console.error(error);
      res.status(500).json({ result: 500, error: "Internal Server Error" });
    });
};

const fetchMatchingProperty = async (req, res) => {
  const { suburbIds, priceLow, priceHigh, bedrooms, bathrooms } = req.query;
console.log(req.query);
  try {
    const accessToken = process.env.oauth_token;
    console.log(accessToken);
    let queryParams = `suburb=${suburbIds}`;

    if (priceLow) {
      queryParams += `&price_min=${priceLow}`;
    }

    if (priceHigh) {
      queryParams += `&price_max=${priceHigh}`; 
    }

    if (bedrooms) {
      queryParams += `&bedrooms_min=${bedrooms}`; 
    }

    if (bathrooms) {
      queryParams += `&bathrooms_min=${bathrooms}`;
    }

    // Use OAuth token to fetch residential property data
    const response = await axios.get(
      `https://api.tmsandbox.co.nz/v1/Search/Property/Residential.json?${queryParams}`,
      {
        headers: {
          Authorization:
            'OAuth oauth_consumer_key=EC3038651DE14CEF11D0F8A176D435D1, oauth_signature_method="PLAINTEXT", oauth_signature="1792449D599CA95F63F353905FC78518&"',
        },
      }
    );

    // Send a response with the data from the Trade Me API
    res.status(200).json({ result: 200, data: response.data });
  } catch (error) {
    // Handle errors and send an appropriate response
    console.error(error);
    res.status(500).json({ result: 500, error: "Internal Server Error" });
  }
};

module.exports = {
  fetchRegions,
  fetchDistricts,
  fetchSuburbs,
  fetchIndividualSuburb,
  fetchMatchingProperty,
};

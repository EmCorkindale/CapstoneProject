import axios from "axios";

export async function getRegion() {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/currentListings/getRegions"
    );
    return response.data.data; // Extract the 'data' property from the response
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw error; // Handle the error as needed
  }
}

export async function getDistrict(regionId) {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/currentListings/getDistricts/${regionId}`
    );

    return response.data.data[0].Districts; // Extract the 'data' property from the response
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw error; // Handle the error as needed
  }
}


export async function getSuburbs(regionId, districtId) {
  try {
    const response = await axios.get(`http://localhost:8080/api/currentListings/getSuburbs/${regionId}/${districtId}`);
    return response.data.data[0].Districts[0].Suburbs; // Extract the 'data' property from the response
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw error; // Handle the error as needed
  }
}

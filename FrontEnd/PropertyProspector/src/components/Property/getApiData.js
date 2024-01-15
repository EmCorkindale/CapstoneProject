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
    const response = await axios.get(
      `http://localhost:8080/api/currentListings/getSuburbs/${regionId}/${districtId}`
    );
    return response.data.data[0].Districts[0].Suburbs; // Extract the 'data' property from the response
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw error; // Handle the error as needed
  }
}
export async function getAllSuburbProperty(suburbIds) {
  try {
    // Check if suburbIds is an array
    if (!Array.isArray(suburbIds)) {
      throw new Error("Suburb IDs should be an array");
    }

    // Check if suburbIds array is not empty
    if (suburbIds.length === 0) {
      throw new Error("Suburb IDs array is empty");
    }

    // Ensure suburbIds is properly encoded and join them with commas
    const encodedSuburbIds = encodeURIComponent(suburbIds.join(","));

    // Construct the URL with the correct query parameter name
    const response = await axios.get(
      `http://localhost:8080/api/currentListings/getCurrentListings?suburbIds=${encodedSuburbIds}`
    );

      return response.data.data.List;
   
  } catch (error) {
    // Handle errors and throw or log as needed
    console.error("Error fetching properties:", error);
    throw error;
  }
}

import axios from "axios";

export async function getSuburbs() {
  try {
    const response = await axios.get("http://localhost:8080/api/currentListings/getSuburbs/:regionId/:districtId");
    return response.data.data; // Extract the 'data' property from the response
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw error; // Handle the error as needed
  }
}

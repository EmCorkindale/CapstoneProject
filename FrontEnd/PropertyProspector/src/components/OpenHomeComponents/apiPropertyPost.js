import axios from "axios";


export async function apiPropertyPost(propertyID) {
  try {
    const response = await axios.post("http://localhost:8080/api/property/addProperty",{
      propertyID: propertyID
    });
  return response.data
  } catch (error) {
    console.error("Error adding property:", error);
    throw error; // Handle the error as needed
  }
}

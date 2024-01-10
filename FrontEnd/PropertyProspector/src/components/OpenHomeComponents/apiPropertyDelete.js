// apiPropertyDelete.js
import axios from "axios";

export async function apiPropertyDelete(propertyID) {
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/property/${propertyID}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting property:", error);
    throw error; // Handle the error as needed
  }
}

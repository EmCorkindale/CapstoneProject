import axios from "axios";

export async function apiGetOpenHomeAttendees() {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/openHomeAttendees/getOpenHomeAttendees"
    );
    return response.data.data; // Extract the 'data' property from the response
  } catch (error) {
    console.error("Error adding open home attendee:", error);
    throw error; // Handle the error as needed
  }
}

export async function apiAddOpenHomeAttendees(propertyID, clientID) {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/openHomeAttendees/addOpenHomeAttendees",
      {
        propertyID: propertyID,
        clientID: clientID,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding open home attendee:", error);
    throw error; // Handle the error as needed
  }
}

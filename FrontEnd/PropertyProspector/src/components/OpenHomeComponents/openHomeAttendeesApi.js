import axios from "axios";

export async function apiGetOpenHomeAttendees(propertyID) {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/openHomeAttendees/getOpenHomeAttendees/${propertyID}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching open home attendees:", error);
    throw error;
  }
}


export async function apiAddOpenHomeAttendees(propertyID, formData) {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/openHomeAttendees/addOpenHomeAttendees/${propertyID}`,
      formData
    );
    return response.data;
  } catch (error) {
    console.error("Error adding open home attendee:", error);
    throw error; // Handle the error as needed
  }
}
import axios from "axios";


export async function apiPropertyPost(propertyAddress, propertyImage) {
  try {
    const response = await axios.post("http://localhost:8080/api/property/addProperty",{
      propertyAddress: propertyAddress,
      propertyImage: propertyImage
    });
  return response.data
  } catch (error) {
    console.error("Error adding property:", error);
    throw error; // Handle the error as needed
  }
}

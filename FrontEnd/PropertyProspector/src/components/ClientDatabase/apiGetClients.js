import axios from "axios";


export async function apiGetClients() {
  try {
    const response = await axios.get("http://localhost:8080/api/clients/getClients",{
    

    });
  return response.data.data
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw error; 
  }
}

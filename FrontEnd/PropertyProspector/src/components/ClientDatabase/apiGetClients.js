import axios from "axios";


export async function apiGetClients(firstName, lastName, emailAddress, phoneNumber, address, buyingOrSelling, reqBeds, reqBaths, reqLiving, reqGarage, reqSuburb, ) {
  try {
    const response = await axios.get("http://localhost:8080/api/clients/getClients",{
      firstName,
      lastName,
      emailAddress,
      phoneNumber,
      address,
      buyingOrSelling,
      reqBeds,
      reqBaths,
      reqLiving,
      reqGarage,
      reqSuburb,

    });
  return response.data
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw error; 
  }
}

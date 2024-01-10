import axios from "axios";


export async function apiGetClients(firstName, lastName, emailAddress, phoneNumber, address, buyingOrSelling, reqBeds, reqBaths, reqLiving, reqGarage, reqSuburb, ) {
  try {
    const response = await axios.post("http://localhost:8080/api/clients/getClients",{
      firstName: firstName,
      lastName: lastName,
      emailAddress: emailAddress,
      phoneNumber: phoneNumber,
      address: address,
      buyingOrSelling: buyingOrSelling,
      reqBeds: reqBeds,
      reqBaths: reqBaths,
      reqLiving: reqLiving,
      reqGarage: reqGarage,
      reqSuburb: reqSuburb

    });
  return response.data
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw error; 
  }
}

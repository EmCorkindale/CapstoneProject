import axios from "axios";

export async function apiAddClients(
  firstName,
  lastName,
  emailAddress,
  phoneNumber,
  address,
  buyingOrSelling,
  reqBedsMin,
  reqBedsMax,
  reqBaths,
  reqLiving,
  reqGarage,
  priceLimit,
  suburbNames
) {
  try {
    // Create the client
    const createdClientResponse = await axios.post(
      "http://localhost:8080/api/clients/addClients",
      {
        firstName,
        lastName,
        emailAddress,
        phoneNumber,
        address,
        buyingOrSelling,
        reqBedsMin,
        reqBedsMax,
        reqBaths,
        reqLiving,
        reqGarage,
        priceLimit,
      }
    );

    const createdClient = createdClientResponse.data;

    // Associate suburbs with the new client
    const addSuburbResponse = await axios.post(
      "http://localhost:8080/api/clients/addSuburb",
      {
        suburbNames,
        clientID: createdClient.clientID,
      }
    );

    return addSuburbResponse.data;
  } catch (error) {
    console.error("Error adding client:", error);
    throw error; // Handle the error as needed
  }
}
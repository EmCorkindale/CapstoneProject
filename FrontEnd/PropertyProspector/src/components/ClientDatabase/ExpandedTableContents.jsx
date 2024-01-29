import { useEffect, useState } from "react";
import { apiGetClients } from "./apiGetClients";
import { Table } from "react-bootstrap";

export function ExpandedTableContents({ clientID }) {
  const [client, setClient] = useState(null);

  useEffect(() => {
    // Fetch the specific client using apiGetClients and update the state
    apiGetClients().then((data) => {
      const selectedClient = data.find((client) => client.clientID === clientID);
      setClient(selectedClient);
    });
  }, [clientID]);

  if (!client) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <p>Bedrooms: {client.reqBedsMin}-{client.reqBedsMax}, Bathrooms: {client.reqBaths}, Living: {client.reqLiving}, Garage: {client.reqGarage}, Suburbs: {client.selectedSuburbs.map((suburb)=>{return suburb.name}).join(", ")}, Buying or Selling: {client.buyingOrSelling},Price limit: {client.priceLimit}</p>
    </div>
  );
}
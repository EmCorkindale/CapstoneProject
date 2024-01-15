import React, { useEffect, useState } from "react";
import { apiGetClients } from "./apiGetClients";
import { Table } from "react-bootstrap";

export function ExpandedTableContents() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    // Fetch all clients using apiGetClients and update the state
    apiGetClients().then((data) => setClients(data));
  }, []);

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Bedrooms</th>
          <th>Bathrooms</th>
          <th>Living</th>
          <th>Garage</th>
          <th>Suburb</th>
          <th>Buying or Selling?</th>
          <th>Price limit</th>
        </tr>
      </thead>
      <tbody>
        {clients.map((client) => (
          <tr key={client.id}>
            <td>{client.reqBeds}</td>
            <td>{client.reqBaths}</td>
            <td>{client.reqLiving}</td>
            <td>{client.reqGarage}</td>
            <td>{client.reqSuburb}</td>
            <td>{client.buyingOrSelling}</td>
            <td>{client.priceLimit}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

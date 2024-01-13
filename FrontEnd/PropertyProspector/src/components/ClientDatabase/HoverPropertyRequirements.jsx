import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Table } from 'react-bootstrap';

function HoverPropertyRequirements({ client }) {
  const Link = ({ id, children }) => (
    <OverlayTrigger overlay={<Tooltip id={id}>{children}</Tooltip>}>
      <a href="#">{children}</a>
    </OverlayTrigger>
  );

  return (
    <Link title="Default title" id="t-1">
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Bedrooms</th>
            <th>Bathrooms</th>
            <th>Living</th>
            <th>Garage</th>
            <th>Suburb</th>
            <th>Buying or Selling?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{client.reqBeds}</td>
            <td>{client.reqBaths}</td>
            <td>{client.reqLiving}</td>
            <td>{client.reqGarage}</td>
            <td>{client.reqSuburb}</td>
            <td>{client.buyingOrSelling}</td>
          </tr>
        </tbody>
      </Table>
    </Link>
  );
}

export default HoverPropertyRequirements;

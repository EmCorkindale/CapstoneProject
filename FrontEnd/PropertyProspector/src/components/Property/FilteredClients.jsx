import React, { useState, Fragment } from 'react';  // Import Fragment from React
import { filterClients } from "../../../../../BackEnd/Controllers/clientController";
import { ExpandedTableHeading } from "../ClientDatabase/ExpandedTableHeading";
import { Container, Table, FormCheck } from "react-bootstrap";  // Use named import for Table

const YourComponent = () => {
    const [returnedClients, setReturnedClients] = useState([]);  // Use state to store returned clients

    const handleFilter = async () => {
        try {
            // Set the required parameters
            const suburb = 'your_suburbs'; // Replace with actual values
            const price_min = 'your_price_min'; // Replace with actual values
            const bedrooms_min = 'your_bedrooms_min'; // Replace with actual values
            const bathrooms_min = 'your_bathrooms_min'; // Replace with actual values

            // Make API request to backend
            const clients = await filterClients(suburb, price_min, bedrooms_min, bathrooms_min);

            // Update state with returned clients
            setReturnedClients(clients);

            // Log the returned clients
            console.log(clients);
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle errors as needed
        }
    };

    return (
        <Container>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Select</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email Address</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {returnedClients.map((client) => (
                        <Fragment key={client.id}>
                            <tr>
                                <td>
                                    <FormCheck type="checkbox" className='clientSelect' />
                                </td>
                                <td>{client.firstName}</td>
                                <td>{client.lastName}</td>
                                <td>{client.emailAddress}</td>
                                <td>{client.phoneNumber}</td>
                                <td>{client.address}</td>
                            </tr>
                            <tr>
                                <td colSpan={6}>
                                    <ExpandedTableHeading />
                                </td>
                            </tr>
                        </Fragment>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default YourComponent;

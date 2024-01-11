import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { apiGetClients } from '../components/ClientDatabase/apiGetClients';


export function ClientDatabase() {
    const [clients, setClients] = useState([]);
    useEffect(() => {
        // Fetch all properties using apiPropertyGet and update the state
        apiGetClients().then((data) => setClients(data));
    });
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
                    {clients.map((client) => (
                        <tr key={client.id}>
                            <td scope="col">
                                <input type="radio" className='clientSelect' />
                            </td>
                            <td>{client.firstName}</td>
                            <td>{client.lastName}</td>
                            <td>{client.email}</td>
                            <td>{client.phoneNumber}</td>
                            <td>{client.address}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}
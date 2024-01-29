import { useEffect, useState, Fragment, React } from 'react';
import { Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { FormCheck } from 'react-bootstrap';
import { apiGetClients } from '../components/ClientDatabase/apiGetClients';
import { ExpandedTableHeading } from '../components/ClientDatabase/ExpandedTableHeading';

export function ClientDatabase() {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        // Fetch all properties using apiPropertyGet and update the state
        apiGetClients().then((data) => setClients(data));
    }, []);

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
                    {clients.map((client) =>  (
                            <Fragment key={client.clientID}>
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
                                        <ExpandedTableHeading clientID={client.clientID}/>
                                    </td>
                                </tr>
                            </Fragment>
                        )
                    )}
                </tbody>
            </Table>
        </Container>
    );
}

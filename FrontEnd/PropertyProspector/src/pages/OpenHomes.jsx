// OpenHomes.jsx
import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import CardBody from 'react-bootstrap';
import { apiPropertyGet } from '../components/OpenHomeComponents/apiPropertyGet';
import { apiPropertyDelete } from '../components/OpenHomeComponents/apiPropertyDelete';
import { SubmitNewProperty } from '../components/OpenHomeComponents/submitNewProperty';
import { CardFooter } from 'react-bootstrap';

export function OpenHomes() {
    const [properties, setProperties] = useState([]);
    const [deletedProperty, setDeletedProperty] = useState(null);

    useEffect(() => {
        // Fetch all properties using apiPropertyGet and update the state
        apiPropertyGet().then((data) => setProperties(data));
    }, []);

    const handleDelete = (propertyID) => {
        // Call the delete API function with the propertyID
        apiPropertyDelete(propertyID)
            .then((response) => {
                // Handle the response, set state, or perform any other actions
                setDeletedProperty(response);
                // After deleting, fetch updated properties
                apiPropertyGet().then((data) => setProperties(data));
            })
            .catch((error) => {
                // Handle error
                console.error('Error deleting property:', error);
            });
    };

    return (
        <Container>
            <h1 className='properties'>My Properties</h1>
            <Row>
                {properties.map((property) => (
                    <Col key={property.propertyID}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>{property.propertyAddress}</Card.Title>
                                <Card.Img src={property.propertyImage} alt="Property" />
                            </Card.Body>
                            <CardFooter>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDelete(property.propertyID)}
                                >
                                    Delete Property
                                </Button>
                            </CardFooter>
                        </Card>
                    </Col>
                ))}
                <SubmitNewProperty />
            </Row>
        </Container>
    );
}

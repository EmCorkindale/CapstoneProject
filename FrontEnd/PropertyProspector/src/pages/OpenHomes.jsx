import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

import { apiPropertyGet } from '../components/OpenHomeComponents/apiPropertyGet';
import { apiPropertyDelete } from '../components/OpenHomeComponents/apiPropertyDelete';
import { SubmitNewProperty } from '../components/OpenHomeComponents/submitNewProperty';
import { CardFooter } from 'react-bootstrap';
import { OpenHomeRegister } from '../components/OpenHomeComponents/OpenHomeRegister';



export function OpenHomes() {
    const [properties, setProperties] = useState([]); // Rename to 'properties' for clarity
    const [deletedProperty, setDeletedProperty] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        apiPropertyGet().then((data) => setProperties(data));
    }, []);

    const handleAddProperty = (newProperty) => {
        setProperties((state) => [...state, newProperty]);
    }

    const handleDelete = (propertyID) => {
        apiPropertyDelete(propertyID)
            .then((response) => {
                setDeletedProperty(response);
                apiPropertyGet().then((data) => setProperties(data));
            })
            .catch((error) => {
                console.error('Error deleting property:', error);
            });
    };

    const handleCardClick = (propertyID) => {
        navigate(`/openHomeRegister/${propertyID}`);
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
                                {property.showOpenHomeRegister && (
                                    <OpenHomeRegister propertyID={property.propertyID} />
                                )}
                                <Button onClick={() => handleCardClick(property.propertyID)}>
                                    Open Home Register
                                </Button>
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
                <SubmitNewProperty handleAddProperty={handleAddProperty} />
            </Row>
        </Container>
    );
}

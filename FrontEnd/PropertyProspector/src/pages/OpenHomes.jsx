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
import { BottomSection } from '../components/Reusable/BottomSection';



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
        <>
            <div className='openHomeHeading'>
                <h1 className='properties'>My Properties</h1>
            </div>
            <section className='openHomeCardsContainer'>
                <Row className="flex-grid">
                    {properties.map((property) => (
                        <Col key={property.propertyID}>
                            <Card style={{ width: '18rem' }} className='propertyCard' >
                                <Card.Body className='propertyCardBody'>
                                    <Card.Title>{property.propertyAddress}</Card.Title>
                                    <Card.Img src={property.propertyImage} alt="Property" className='openHomeCardImage' style={{ height: '150px', filter: "brightness(80%) contrast(90%) blur(0.75px)" }} />
                                </Card.Body>
                                <CardFooter className='d-flex justify-content-between'>
                                    {property.showOpenHomeRegister && (
                                        <OpenHomeRegister propertyID={property.propertyID} />
                                    )}
                                    <button role="button" onClick={() => handleCardClick(property.propertyID)} className='openHomeRegisterButton'>
                                       Open Homes
                                    </button>
                                    <button role="button" onClick={() => handleDelete(property.propertyID)} className='openHomeDeleteButton'>
                                        Delete Property
                                    </button>
                                </CardFooter>
                            </Card>
                        </Col>
                    ))}
                    <Col>
                        <SubmitNewProperty handleAddProperty={handleAddProperty} />
                    </Col>
                </Row>
            </section>
            <BottomSection />
        </>
    );
}

import { Col, Card, Container, Row, CardFooter, Button, Modal } from "react-bootstrap";
import { useState } from "react";
import MatchingClients from "./MatchingClients";

export function PropertyResults({ matchingProperties, searchPerformed }) {
    const [modalShow, setModalShow] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState(null);

    const openModal = (property) => {
        setSelectedProperty(property);
        setModalShow(true);
    };

console.log("matchingProperties", typeof matchingProperties);
    return (
        <Container>
            <Row>
                {searchPerformed && Array.isArray(matchingProperties) && matchingProperties.length > 0 ? (
                    matchingProperties.map((property) => {
                        console.log("PROPERTY", property);
                        return (
                            <Col key={property.ListingId}>
                                <Card style={{ width: "18rem" }} onClick={() => openModal(property)}>
                                    <Card.Body>
                                        <Card.Title>{property.Address}</Card.Title>
                                        <Card.Img src={property.PictureHref ? property.PictureHref : property.PhotoUrls} alt="PropertyImage" />
                                    </Card.Body>
                                    <CardFooter>
                                        {`${property.Bedrooms} Bedrooms, ${property.Bathrooms} Bathrooms, ${property.Parking},  ${property.Lounges !== null ? property.Lounges + " Living," : ""} Parking: ${property.TotalParking} Property Type:${property.PropertyType}, Area: ${property.Area} `}
                                        <Button variant="primary" onClick={() => openModal(property)}>
                                            Match to database
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </Col>
                        )
                    })
                ) : (
                    searchPerformed && <p>No matching properties found.</p>
                )}
            </Row>
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={modalShow}
                onHide={() => setModalShow(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {selectedProperty && selectedProperty.Address}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedProperty && (
                        <p>
                            <Card.Img src={selectedProperty.PictureHref ? selectedProperty.PictureHref : selectedProperty.PhotoUrls} alt="PropertyImage" />
                            Bedrooms: {selectedProperty.Bedrooms}, Bathrooms: {selectedProperty.Bathrooms}, Living:{selectedProperty.Lounges}, Parking: {selectedProperty.Parking}, Property Type: {selectedProperty.PropertyType}, Area: {selectedProperty.Area}, Land Area: {selectedProperty.LandArea}
                            {/* Add more details as needed */}
                        </p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <MatchingClients selectedProperty={selectedProperty}/>
                    <Button onClick={() => setModalShow(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

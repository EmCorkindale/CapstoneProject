import { Col, Card, Container, Row, CardFooter, Button, Modal } from "react-bootstrap";
import { useState } from "react";
import MatchingClients from "./MatchingClients";
import { MdBathroom, MdBedroomChild, MdGarage, MdHouse, MdLiving, MdLocalParking, MdLocationPin, MdOutlineBathroom, MdSquareFoot } from "react-icons/md";
import homeImage from "../../assets/homeImage.png";

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
                        return (
                            <Col key={property.ListingId}>
                                <Card style={{ width: "18rem" }} onClick={() => openModal(property)} className="matchingPropertyCard">
                                    <Card.Body className="matchingPropertyCardBody">
                                        <Card.Title>{property.Address}</Card.Title>
                                        <Card.Img
                                            src={property.PictureHref || homeImage}
                                            alt="PropertyImage"
                                            className="MatchingPropertyImage"
                                        />
                                    </Card.Body>
                                    <CardFooter className="matchingPropertyCardFooter">
                                        <p className="propertyInfo">
                                            {property.Bedrooms !== undefined && (
                                                <p><MdBedroomChild className="smallIcon" />{`${property.Bedrooms} Bedrooms,`}</p>
                                            )}
                                            {property.Bathrooms !== undefined && (
                                                <p><MdOutlineBathroom className="smallIcon" />{`${property.Bathrooms} Bathrooms,`}</p>
                                            )}
                                            {property.Lounges !== undefined && property.Lounges !== null && (
                                                <p><MdLiving className="smallIcon" />{`${property.Lounges} Living,`}</p>
                                            )}
                                            {property.TotalParking !== undefined && (
                                                <p><MdGarage className="smallIcon" />{`Parking: ${property.TotalParking}`}</p>
                                            )}
                                            {property.PropertyType !== undefined && (
                                                <p><MdHouse className="smallIcon" />{`Property Type: ${property.PropertyType},`}</p>
                                            )}
                                        </p>
                                        <div>
                                            <button className="databaseMatchButton" onClick={() => openModal(property)}>
                                                Match to clients
                                            </button>
                                        </div>
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
                <Modal.Body className="expandedPropertyModal">
                    {selectedProperty && (
                        <>
                            <div>
                                <img
                                    src={ homeImage}
                                    alt="PropertyImage"
                                    className="biggerImage"
                                />
                            </div>
                            <ul className="matchingClientsRequirementsExpanded">
                                {selectedProperty.Bedrooms !== undefined && (
                                    <li>
                                        <MdBedroomChild /> Bedrooms: {selectedProperty.Bedrooms}
                                    </li>
                                )}
                                {selectedProperty.Bathrooms !== undefined && (
                                    <li>
                                        <MdBathroom /> Bathrooms: {selectedProperty.Bathrooms}
                                    </li>
                                )}
                                {selectedProperty.Lounges !== undefined && selectedProperty.Lounges !== null && (
                                    <li>
                                        <MdLiving /> Living: {selectedProperty.Lounges}
                                    </li>
                                )}
                                {selectedProperty.Parking !== undefined && (
                                    <li>
                                        <MdLocalParking /> Parking: {selectedProperty.Parking}
                                    </li>
                                )}
                                {selectedProperty.PropertyType !== undefined && (
                                    <li>
                                        <MdHouse /> Property Type: {selectedProperty.PropertyType}
                                    </li>
                                )}
                                {selectedProperty.Area !== undefined && (
                                    <li>
                                        <MdSquareFoot /> Area: {selectedProperty.Area}
                                    </li>
                                )}
                                {selectedProperty.LandArea !== undefined && (
                                    <li>
                                        <MdLocationPin /> Land Area: {selectedProperty.LandArea}
                                    </li>
                                )}
                                {/* Add more details as needed */}
                            </ul>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer className="expandedClientRequirementsModalFooter">
                    <MatchingClients suburb={selectedProperty?.Suburb} bedrooms={selectedProperty?.Bedrooms} bathrooms={selectedProperty?.Bathrooms} />
                    {/* <button className='' onClick={() => setModalShow(false)}>Close</button> */}
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

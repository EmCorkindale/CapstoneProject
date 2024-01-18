import { Col, Card, Container, Row, CardFooter } from "react-bootstrap";

export function PropertyResults({ matchingProperties, searchPerformed }) {
    return (
        <Container>
            <Row>
                {searchPerformed && Array.isArray(matchingProperties) && matchingProperties.length > 0 ? (
                    matchingProperties.map((property) => (
                        <Col key={property.ListingId}>
                            <Card style={{ width: "18rem" }}>
                                <Card.Body>
                                    <Card.Title>{property.Address}</Card.Title>
                                    <Card.Img src={property.PictureHref} alt="PropertyImage" />
                                </Card.Body>
                                <CardFooter>
                                    {`${property.Bedrooms} Bedrooms, ${property.Bathrooms} Bathrooms, ${property.Parking}, ${property.Lounges} Living, Parking: ${property.TotalParking} Property Type:${property.PropertyType}, `}
                                </CardFooter>
                            </Card>
                        </Col>
                    ))
                ) : (
                    searchPerformed && <p>No matching properties found.</p>
                )}
            </Row>
        </Container>
    );
}

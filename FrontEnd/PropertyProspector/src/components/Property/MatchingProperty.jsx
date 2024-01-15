import  { useState, useEffect } from "react";
import { Col, Card, Container, Row, CardFooter } from "react-bootstrap";
import { getAllSuburbProperty } from "./getApiData";

export function MatchingProperty({suburbIds }) {
    const [matchingProperties, setMatchingProperties] = useState([]);

    useEffect(() => {
        if (!suburbIds || suburbIds.length === 0) {
            // No need to make an API call if selectedSuburbs is undefined or empty
            setMatchingProperties([]);
            return;
        }

        // Fetch properties based on selected suburb IDs
        getAllSuburbProperty(suburbIds)
            .then((data) => setMatchingProperties(data))
            .catch((error) => {
                console.error("Error fetching matching properties:", error);
                // Handle errors as needed
            });
    }, [suburbIds]);

    return (
        <Container>
            <Row>
                {matchingProperties.map((property) => (
                    <Col key={property.ListingId}>
                        <Card style={{ width: "18rem" }}>
                            <Card.Body>
                                <Card.Title>{property.Address}</Card.Title>
                                <Card.Img src={property.PictureHref} alt="PropertyImage" />
                            </Card.Body>
                            <CardFooter>
                                {/* Additional actions or buttons can be added here */}
                            </CardFooter>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

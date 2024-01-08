import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Home() {

    return (

        <Container className='homeComponent'>
            <Row>
                <Col>
                    <h1>Welcome to Property Prospector,<br /> your property matching partner.</h1>
                </Col>
                <Col xs lg="2">
                    <img src={"../src/assets/homeImage.jpg"}></img>
                </Col>
            </Row>
            <Row>
                <p className="homeText">Lorem ipsum dolor sit amet consectetur adipisicing elit.<br /> Aperiam fuga tempore nostrum repellat consectetur et facilis minus corrupti qui minima veniam, modi tenetur natus magnam a? Ea sit dolores corporis?</p>
            </Row>
        </Container>
    )
}
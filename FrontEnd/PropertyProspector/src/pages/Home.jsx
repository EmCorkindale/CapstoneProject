import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Image } from 'react-bootstrap';

export default function Home() {

    return (

        <Container className='homeComponent'>
            <Row>
                <Col>
                    <h1 className='homeHeading'>Welcome to Property Prospector,<br/> your property matching partner.</h1>
                </Col>
                <Col>
                    <Image src={"../src/assets/homeImage.png"} className='homeImage'/>
                </Col>
            </Row>
            <Row>
                <p className="homeText">Property Prospector is aimed at making your life easier! Our goal is to reduce the amount of time you spend hunting for houses. We aim to actively target your passive database and increase your bottom line.</p>
            </Row>
        </Container>
    )
}
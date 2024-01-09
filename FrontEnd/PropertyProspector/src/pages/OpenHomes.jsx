import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import SubmitProperty from '../components/OpenHomeComponents/SubmitProperty';


const properties = [{ title: "54 Perekia Street", imgUrl: "kfsdkhfsdk", id: 1 }, { title: "12 House Place", imgUrl: "kfsdkhf", id: 2 }]

export function OpenHomes() {

    return (
        <Container>
            <h1 className='properties'>My Properties</h1>
            <Row>
                {properties && properties.map((property) => {
                    return (
                        <Col key={property.id}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src="holder.js/100px180" />
                                <Card.Body>
                                    <Card.Title>{property.title}</Card.Title>
                                    <Card.Text>
                                        img url = {property.imgUrl}
                                    </Card.Text>
                                    <Button variant="primary">Go somewhere</Button>
                                </Card.Body>
                            </Card>
                        </Col>

                    )
                })}
                <SubmitProperty/>
            </Row>
        </Container>

    )
}
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function NavBar() {
    return (
        <Navbar expand="lg" className="NavBar">
            <Container fluid>
                <Navbar.Brand href="/"><img src={"../src/assets/logo.png"} className='logo'></img></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/database">My Database</Nav.Link>
                        <Nav.Link href="/openHomes">Open Homes</Nav.Link>
                        <Nav.Link href="/property">Property</Nav.Link>
                        <Nav.Link href="/login" >Login / Sign up </Nav.Link>
                        <Navbar.Collapse className="justify-content-end">
                        </Navbar.Collapse>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
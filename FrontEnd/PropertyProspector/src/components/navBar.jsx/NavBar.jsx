import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar() {
    return (
        <Navbar expand="lg" className="NavBar">
            <Container fluid>
                <Navbar.Brand href="#home"><img src={"../src/assets/logo.png"} className='logo'></img></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#database">My Database</Nav.Link>
                        <Nav.Link href="#openHomes">Open Homes</Nav.Link>
                        <Nav.Link href="#property">Property</Nav.Link>
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                <a href="#login">Login / Sign up </a>
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
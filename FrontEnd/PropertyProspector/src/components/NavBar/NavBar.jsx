import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from "react-bootstrap/NavDropdown";
import { Button } from 'react-bootstrap';
import Login from '../Login/Login';
import Register from '../SignUp/Register';
import { useUser } from '../../contexts/userContext';
import { NavLink as ReactRouterNavLink, useNavigate, useLocation } from 'react-router-dom';

export default function NavBar() {
    const [showLogin, setShowLogin] = useState(false);
    const handleCloseLogin = () => setShowLogin(false);
    const [showRegister, setShowRegister] = useState(false);
    const handleCloseRegister = () => setShowRegister(false);
    const { user, handleLogout } = useUser();
    const location = useLocation(); 
    const navigate = useNavigate();
    

    return (
        <>
            <Navbar expand="lg" className="NavBar">
                <Container fluid>
                    <Navbar.Brand onClick={() => { navigate('/') }}><img src={"../src/assets/logo.png"} className='logo' alt="Logo" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="d-flex ms-auto">
                            {user ? (
                                <ReactRouterNavLink to="/database" className={location.pathname === '/database' ? 'bold-link' : ''}>
                                    My Database
                                </ReactRouterNavLink>
                            ) : (
                                <NavLink style={{ visibility: 'hidden' }}>My Database</NavLink>
                            )}

                            {user ? (
                                <ReactRouterNavLink to="/openHomes" className={location.pathname === '/openHomes' ? 'bold-link' : ''}>
                                    Open Homes
                                </ReactRouterNavLink>
                            ) : (
                                <NavLink style={{ visibility: 'hidden' }}>Open Homes</NavLink>
                            )}

                            {user ? (
                                <ReactRouterNavLink to="/property" className={location.pathname === '/property' ? 'bold-link' : ''}>
                                    Property
                                </ReactRouterNavLink>
                            ) : (
                                <NavLink style={{ visibility: 'hidden' }}>Property</NavLink>
                            )}

                            {user ? (
                                <NavDropdown title={`Welcome ${user.username}`} className='ml-auto'>
                                    <ReactRouterNavLink to="#myAccount" className={location.pathname === '/myAccount' ? 'bold-link' : ''}>
                                        My Account
                                    </ReactRouterNavLink>
                                    <NavDropdown.Item onClick={handleLogout}>Sign Out</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <Container className="login/signup">
                                    <Button variant='outline' onClick={() => { setShowLogin(true) }} className='loginButton'>
                                        Login
                                    </Button>
                                    <Button variant='outline' onClick={() => { setShowRegister(true) }} className='SignUpButton'>
                                        Sign up
                                    </Button>
                                </Container>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Login show={showLogin} handleClose={handleCloseLogin} />
            <Register show={showRegister} handleClose={handleCloseRegister}/>
        </>
    );
}

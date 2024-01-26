// import React from 'react';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from "react-bootstrap/NavDropdown";
import { Button } from 'react-bootstrap';
import Login from '../Login/Login';
import Register from '../SignUp/Register';
import { useUser } from '../../contexts/userContext';
import NavLink from 'react-bootstrap/esm/NavLink';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {

    const [showLogin, setShowLogin] = useState(false);
    const handleCloseLogin = () => setShowLogin(false);
    const [showRegister, setShowRegister] = useState(false);
    const handleCloseRegister = () => setShowRegister(false);
    const { user, handleLogout } = useUser();
    const navigate = useNavigate();
    return (
        <>
            <Navbar expand="lg" className="NavBar">
                <Container fluid>
                    <Navbar.Brand onClick={() => { navigate('/') }}><img src={"../src/assets/logo.png"} className='logo' alt="Logo"></img></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="d-flex ms-auto">
                            {user ? (<NavLink onClick={() => { navigate('/database') }}>My Database</NavLink>) : (
                                <NavLink style={{ visibility: 'hidden' }}>My Database</NavLink>
                            )}
                            {user ? (<NavLink onClick={() => { navigate('/openHomes') }}>Open Homes</NavLink>) : (
                                <NavLink style={{ visibility: 'hidden' }}>OpenHomes</NavLink>
                            )}
                            {user ? (<NavLink onClick={() => { navigate('/property') }}>Property</NavLink>) : (
                                <NavLink style={{ visibility: 'hidden' }}>Property</NavLink>)}
                            {user ? (<NavDropdown title={`Welcome ${user.username}`} className= 'ml-auto'>
                                <NavDropdown.Item to="#myAccount">My Account</NavDropdown.Item>
                                <NavDropdown.Item onClick={handleLogout}>Sign Out</NavDropdown.Item>
                            </NavDropdown>) : (
                                <Container className="login/signup">
                                    <Button  variant='outline' onClick={() => { setShowLogin(true) }} className='loginButton'>
                                        Login
                                    </Button>
                                    <Button  variant='outline' onClick={() => { setShowRegister(true) }} className='SignUpButton'>
                                        Sign up
                                    </Button>
                                </Container>)}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Login show={showLogin} handleClose={handleCloseLogin} />
            <Register show={showRegister} handleClose={handleCloseRegister}/>
        </>
    );
}


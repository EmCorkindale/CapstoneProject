// import React from 'react';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from "react-bootstrap/NavDropdown";
import Login from '../Login/Login';
import { useUser } from '../../contexts/userContext';
import NavLink from 'react-bootstrap/esm/NavLink';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const { user, handleLogout } = useUser();
    const navigate = useNavigate();
    return (
        <>
            <Navbar expand="lg" className="NavBar">
                <Container fluid>
                    <Navbar.Brand onClick={() => { navigate('/') }}><img src={"../src/assets/logo.png"} className='logo' alt="Logo"></img></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {user ? (<NavLink onClick={() => { navigate('/database') }}>My Database</NavLink>) : (
                                <NavLink style={{ visibility: 'hidden' }}>My Database</NavLink>
                            )}
                            {user ? (<NavLink onClick={() => { navigate('/openHomes') }}>Open Homes</NavLink>) : (
                                <NavLink style={{ visibility: 'hidden' }}>OpenHomes</NavLink>
                            )}
                            {user ? (<NavLink onClick={() => { navigate('/property') }}>Property</NavLink>) : (
                                <NavLink style={{ visibility: 'hidden' }}>Property</NavLink>)}
                            {user ? (<NavDropdown title={`Welcome ${user.username}`}>
                                <NavDropdown.Item to="#myAccount">My Account</NavDropdown.Item>
                                <NavDropdown.Item onClick={handleLogout}>Sign Out</NavDropdown.Item>
                            </NavDropdown>) : (
                                <NavLink className="justify-content-end" onClick={() => { setShow(true) }}>
                                    Login / Sign up
                                </NavLink>)}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Login show={show} handleClose={handleClose} />
        </>
    );
}


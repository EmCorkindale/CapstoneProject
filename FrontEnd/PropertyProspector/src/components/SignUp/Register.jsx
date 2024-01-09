import { useState } from "react";
import {Button, Form, Modal} from 'react-bootstrap';
import { apiSignup } from "./apiSignup";
import { validateForm } from "./validateForm";


export default function Register({ show, handleClose }) {
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');

    const handleError = (error) => {
        console.error(error);
        setError('Registration failed. Please check your details.');
    };


    const handleSubmit = () => {
        // Perform form validation
        const errorMessage = validateForm(username, firstName, lastName, password, emailAddress);
        if (errorMessage) {
            setError(errorMessage);
            return;
        }

        apiSignup(username, firstName, lastName, password, emailAddress)
            .then((response) => {
                // Handle successful registration
                "You have successfully registered. Please login."
                console.log(response.data);
                handleClose(); // Close the modal on successful registration
            })
            .catch((error) => {
                // Handle registration error
                handleError(error);
            });
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>

                    <Modal.Title>Welcome to Property Prospector!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="username"
                                autoFocus
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="John"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Smith"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="emailAddress">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="example@email.com"
                                value={emailAddress}
                                onChange={(e) => setEmailAddress(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="*******"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                    <br />
                    <p>
                        Your details are safe with us.
                    </p>
                </Modal.Footer>
            </Modal>
        </>
    )
}


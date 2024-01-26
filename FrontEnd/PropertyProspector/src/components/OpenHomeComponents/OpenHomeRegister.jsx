import { Button, Table, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function OpenHomeRegister({ propertyID }) {
    const navigate = useNavigate();
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "firstName") {
            setFirstName(value);
        } else if (name === "lastName") {
            setLastName(value);
        }
    };

    const handleSubmit = () => {
        // Implement the logic to handle form submission, e.g., send data to the server
        // Reset the form state or close the modal after successful submission
        setShow(false);
    };
    function returnToOpenHomes() {
        // Navigate back to Open Home page when the 'x' button is clicked
        navigate("/openHomes");
    }

    return (
        <>
            <Button onClick={() => handleShow(fullscreen)}>
                Add attendees to register
                {typeof fullscreen === 'string' && `below ${fullscreen.split('-')[0]}`}</Button>
            <Button variant="danger" onClick={returnToOpenHomes} className="returnToOpenHomes">
                x
            </Button>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Select</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email Address</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td colSpan={6} />
                        </tr>
                    </tbody>
                </Table>
                <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                    <Form.Header closeButton>
                        <Form.Title>Register your details below</Form.Title>
                    </Form.Header>
                    <Form.Group controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your first name"
                            name="firstName"
                            value={firstName}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your last name"
                            name="lastName"
                            value={lastName}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Modal>
        </>
    );
}

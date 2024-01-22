import React from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function OpenHomeRegister({propertyId}) {
    const navigate = useNavigate();

    function returnToOpenHomes() {
        // Navigate back to Open Home page when the 'x' button is clicked
        navigate("/openHomes");
    }

    return (
        <Container>
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
        </Container>
    );
}

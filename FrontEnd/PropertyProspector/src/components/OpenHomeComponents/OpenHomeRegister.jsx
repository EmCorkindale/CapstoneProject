import { Button, Table, Modal, FormGroup, FormLabel, FormControl, FormSelect, ModalTitle, ModalHeader } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiGetOpenHomeAttendees } from "./openHomeAttendeesApi";
import { apiAddOpenHomeAttendees } from "./openHomeAttendeesApi";


export function OpenHomeRegister() {
    const { propertyID } = useParams();
    const navigate = useNavigate();
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const [attendees, setAttendees] = useState([]); // State to hold fetched attendees
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        emailAddress: "",
        phoneNumber: "",
        address: "",
        buyingOrSelling: "",
        reqBedsMin: "",
        reqBedsMax: "",
        reqBaths: "",
        reqLiving: "",
        reqGarage: "",
        priceLimit: "",
        suburbNames: "",
    });

    // Fetch attendees when the component mounts or when propertyID changes
    useEffect(() => {
        // Check if propertyID is valid before making the API call
        if (propertyID) {
            apiGetOpenHomeAttendees(propertyID)
                .then((result) => {
                    setAttendees(result.attendeeDetails)
                })
                .catch((error) => {
                    console.error("Error fetching attendees:", error);
                });
        }
    }, [propertyID]);


    const handleShow = (breakpoint) => {
        setFullscreen(breakpoint);
        setShow(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "suburbNames") {
            const suburbNames = value.split(",").map(x => x.trim()).filter(x => !!x);
            setFormData({
                ...formData,
                suburbNames
            });
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
        console.log(name, value)
    };

    const handleSubmit = () => {
        console.log(formData);
        // Call the API function to add open home attendees
        apiAddOpenHomeAttendees(propertyID, formData)
            .then((result) => {
                console.log("Attendee added successfully:", result);
                // Handle success, reset the form state without closing the modal
                setFormData({
                    firstName: "",
                    lastName: "",
                    emailAddress: "",
                    phoneNumber: "",
                    address: "",
                    buyingOrSelling: "",
                    reqBedsMin: "",
                    reqBedsMax: "",
                    reqBaths: "",
                    reqLiving: "",
                    reqGarage: "",
                    priceLimit: "",
                    suburbNames: "",
                });
            })
            .catch((error) => {
                console.error("Error adding attendee:", error);
                // Handle the error, show an alert, or update your UI with an error message
            });
    };


    function returnToOpenHomes() {
        // Navigate back to Open Home page when the 'x' button is clicked
        navigate("/openHomes");
    }
    function closeForm() {
        // Close modale when the 'x' button is clicked
        setShow(false);
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
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email Address</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th>Date Attended</th>
                        <th>Comments</th>
                    </tr>
                </thead>
                <tbody>
                    {attendees.map((attendee) => (
                        <tr key={attendee.openHomeAttendeeID}>
                            <td>{attendee.firstName}</td>
                            <td>{attendee.lastName}</td>
                            <td>{attendee.emailAddress}</td>
                            <td>{attendee.phoneNumber}</td>
                            <td>{attendee.address}</td>
                            <td>{attendee.dateAttended}</td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                <ModalHeader closeButton>
                    <ModalTitle>Register your details below</ModalTitle>
                    <Button variant="outline" onClick={closeForm}>x</Button>
                </ModalHeader>
                <FormGroup controlId="firstName">
                    <FormLabel>First Name</FormLabel>
                    <FormControl
                        type="text"
                        placeholder="Enter your first name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <FormGroup controlId="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl
                        type="text"
                        placeholder="Enter your last name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <FormGroup controlId="emailAddress">
                    <FormLabel>Email Address</FormLabel>
                    <FormControl
                        type="text"
                        placeholder="Enter your email address"
                        name="emailAddress"
                        value={formData.emailAddress}
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <FormGroup controlId="phoneNumber">
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl
                        type="text"
                        placeholder="Enter your phone number"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <FormGroup controlId="address">
                    <FormLabel>Address</FormLabel>
                    <FormControl
                        type="text"
                        placeholder="Enter your address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <FormGroup controlId="buyingOrSelling">
                    <FormLabel>Buying or Selling?</FormLabel>
                    <FormSelect
                        placeholder="Buying or Selling?"
                        name="buyingOrSelling"
                        value={formData.buyingOrSelling}
                        onChange={handleInputChange}
                    >
                        <option value="Buying">Buying</option>
                        <option value="Selling">Selling</option>
                    </FormSelect>
                </FormGroup>
                Property Requirements
                <FormGroup controlId="reqBedsMin">
                    <FormLabel>Minimum Bedrooms Required</FormLabel>
                    <FormControl
                        type="text"
                        placeholder="Enter your minimum required bedrooms"
                        name="reqBedsMin"
                        value={formData.reqBedsMin}
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <FormGroup controlId="reqBedsMax">
                    <FormLabel>Maximum Bedrooms Required</FormLabel>
                    <FormControl
                        type="text"
                        placeholder="Enter your maximum required bedrooms"
                        name="reqBedsMax"
                        value={formData.reqBedsMax}
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <FormGroup controlId="reqBaths">
                    <FormLabel>Number of Bathrooms Required</FormLabel>
                    <FormControl
                        type="text"
                        placeholder="Enter your required bathrooms"
                        name="reqBaths"
                        value={formData.reqBaths}
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <FormGroup controlId="reqLiving">
                    <FormLabel>Living</FormLabel>
                    <FormSelect
                        placeholder="Select living requirements"
                        name="reqLiving"
                        value={formData.reqLiving}
                        onChange={handleInputChange}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>

                    </FormSelect>
                </FormGroup>
                <FormGroup controlId="reqGarage">
                    <FormLabel>Garages</FormLabel>
                    <FormSelect
                        placeholder="Select garage requirements"
                        name="reqGarage"
                        value={formData.reqGarage}
                        onChange={handleInputChange}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10+">10</option>
                    </FormSelect>
                </FormGroup>
                <FormGroup controlId="priceLimit">
                    <FormLabel>Price Limit</FormLabel>
                    <FormSelect
                        placeholder="Select price Limit"
                        name="priceLimit"
                        value={formData.priceLimit}
                        onChange={handleInputChange}
                    >
                        <option value="400000">$400k</option>
                        <option value="500000">$500k</option>
                        <option value="600000">$600k</option>
                        <option value="700000">$700k</option>
                        <option value="800000">$800k</option>
                        <option value="900000">$900k</option>
                        <option value="1000000">$1M</option>
                        <option value="1100000">$1.1M</option>
                        <option value="1200000">$1.2M</option>
                        <option value="1300000">$1.3M</option>
                        <option value="1400000">$1.4M</option>
                        <option value="1500000">$1.5M</option>
                        <option value="1600000">$1.6M</option>
                        <option value="1700000">$1.7M</option>
                        <option value="1800000">$1.8M</option>
                        <option value="1900000">$1.9M</option>
                        <option value="2000000">$2M</option>
                        <option value="2250000">$2.25M</option>
                        <option value="2500000">$2.5M</option>
                        <option value="2750000">$2.75M</option>
                        <option value="3000000">$3M</option>
                        <option value="3500000">$3.5M</option>
                        <option value="4000000">$4M</option>
                        <option value="4500000">$4.5M</option>
                        <option value="5000000">$5M</option>
                    </FormSelect>
                </FormGroup>
                <FormGroup controlId="suburbNames">
                    <FormLabel>Suburbs Required</FormLabel>
                    <FormControl
                        type="text"
                        placeholder="Enter your required suburbs"
                        name="suburbNames"
                        value={formData.suburbNames}
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <Button onClick={handleSubmit}>Submit</Button>
            </Modal>
        </>
    );
}

import { Button, Modal, FormGroup, FormLabel, FormControl, FormSelect, ModalTitle, ModalHeader } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiGetOpenHomeAttendees } from "./openHomeAttendeesApi";
import { apiAddOpenHomeAttendees } from "./openHomeAttendeesApi";
import { BottomSection } from "../Reusable/BottomSection";

export function OpenHomeRegister() {
    const { propertyID } = useParams();
    const navigate = useNavigate();
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const [attendees, setAttendees] = useState([]);
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

    const [formErrors, setFormErrors] = useState({
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

    useEffect(() => {
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

        // Clear error message when the user starts typing
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    };

    const handleSubmit = () => {
        // Check for required fields and display error messages
        const errors = {};
        Object.keys(formData).forEach((field) => {
            if (!formData[field]) {
                errors[field] = "This field is required.";
            }
        });

        if (Object.keys(errors).length > 0) {
            // Display error messages and prevent form submission
            setFormErrors(errors);
            return;
        }

        apiAddOpenHomeAttendees(propertyID, formData)
            .then((result) => {
                console.log("Attendee added successfully:", result);
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
            });
    };

    const handleClose = () => {
        setShow(false);
        apiGetOpenHomeAttendees(propertyID)
            .then((result) => {
                setAttendees(result.attendeeDetails);
            })
            .catch((error) => {
                console.error("Error fetching attendees:", error);
            });
    };

    function returnToOpenHomes() {
        navigate("/openHomes");
    }

    return (
        <>
            <div className="openHomeRegisterHeading">
                <h1>Open Home Register</h1>
            </div>
            <section className="openHomeRegister">
                <table className="openHomeRegisterTable">
                    <thead className="openHomeRegisterTableHeadings">
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email Address</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                            <th>Date Attended</th>
                        </tr>
                    </thead>
                    <tbody className="openHomeRegisterBody">
                        {attendees.map((attendee, index) => (
                            <tr key={attendee.openHomeAttendeeID}
                                className={index % 2 === 0 ? 'OpenHomeEvenRow' : 'OpenHomeOddRow'}>
                                <td>{attendee.firstName}</td>
                                <td>{attendee.lastName}</td>
                                <td>{attendee.emailAddress}</td>
                                <td>{attendee.phoneNumber}</td>
                                <td>{attendee.address}</td>
                                <td>{attendee.dateAttended}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
            <div className="openHomeAttendeesButtons">
                <button onClick={() => handleShow(fullscreen)} className="addOpenHomeAttendeesButton">
                    Add attendees to register
                    {typeof fullscreen === 'string' && `below ${fullscreen.split('-')[0]}`}</button>
                <button onClick={returnToOpenHomes} className="returnToOpenHomesButton">
                    x
                </button>
            </div>
            <section>
                <BottomSection />
            </section>
            <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)} className="openHomeForm">
                <ModalHeader closeButton onClick={handleClose}>
                    <ModalTitle>Register your details below</ModalTitle>
                    <Button variant="outline" onClick={handleClose}>x</Button>
                </ModalHeader>
                <div className="form-fields-container">
                    <div className="contactContainer">
                        <p className="contactContainerP">Contact Details</p> 
                        <div className="firstAndLastName">
                            <FormGroup controlId="firstName" className="form-field" style={{ marginleft: '10px', marginRight: '10px' }}>
                                <FormLabel>First Name</FormLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter your first name"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    isInvalid={!!formErrors.firstName}
                                />
                                <FormControl.Feedback type="invalid">
                                    {formErrors.firstName}
                                </FormControl.Feedback>
                            </FormGroup>
                            <FormGroup controlId="lastName" className="form-field" style={{ marginleft: '10px', marginRight: '10px' }}>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter your last name"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    isInvalid={!!formErrors.lastName}
                                />
                                <FormControl.Feedback type="invalid">
                                    {formErrors.lastName}
                                </FormControl.Feedback>
                            </FormGroup>
                        </div>
                        <div className="contactDetails">
                            <FormGroup controlId="emailAddress" className="form-field" style={{ marginleft: '10px', marginRight: '10px' }}>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter your email address"
                                    name="emailAddress"
                                    value={formData.emailAddress}
                                    onChange={handleInputChange}
                                    isInvalid={!!formErrors.emailAddress}
                                />
                                <FormControl.Feedback type="invalid">
                                    {formErrors.emailAddress}
                                </FormControl.Feedback>
                            </FormGroup>
                            <FormGroup controlId="phoneNumber" className="form-field" style={{ marginleft: '10px', marginRight: '10px' }}>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter your phone number"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    isInvalid={!!formErrors.phoneNumber}
                                />
                                <FormControl.Feedback type="invalid">
                                    {formErrors.phoneNumber}
                                </FormControl.Feedback>
                            </FormGroup>

                            <FormGroup controlId="address" style={{ marginleft: '10px', marginRight: '10px' }}>
                                <FormLabel>Address</FormLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter your address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    isInvalid={!!formErrors.address}
                                />
                                <FormControl.Feedback type="invalid">
                                    {formErrors.address}
                                </FormControl.Feedback>
                            </FormGroup>
                        </div>
                    </div>
                    <div className="propertyRequirements">
                        <p className="propertyRequirementsP">Property Requirements</p>
                        <div className="buyingStatusAndBeds">
                            <FormGroup controlId="buyingOrSelling" className="form-field" style={{ marginleft: '10px', marginRight: '10px' }}>
                                <FormLabel>Buying or Selling?</FormLabel>
                                <FormSelect
                                    placeholder="Buying or Selling?"
                                    name="buyingOrSelling"
                                    value={formData.buyingOrSelling}
                                    onChange={handleInputChange}
                                    isInvalid={!!formErrors.buyingOrSelling}
                                >
                                    <option value="">Select</option>
                                    <option value="Buying">Buying</option>
                                    <option value="Selling">Selling</option>
                                </FormSelect>
                                <FormControl.Feedback type="invalid">
                                    {formErrors.buyingOrSelling}
                                </FormControl.Feedback>
                            </FormGroup>
                            <FormGroup controlId="reqBedsMin" className="form-field" style={{ marginleft: '10px', marginRight: '10px' }}>
                                <FormLabel>Minimum Bedrooms Required</FormLabel>
                                <FormSelect
                                    placeholder="Enter your minimum required bedrooms"
                                    name="reqBedsMin"
                                    value={formData.reqBedsMin}
                                    onChange={handleInputChange}
                                    isInvalid={!!formErrors.reqBedsMin}
                                >
                                    <option value="">Select</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                </FormSelect>
                                <FormControl.Feedback type="invalid">
                                    {formErrors.reqBedsMin}
                                </FormControl.Feedback>
                            </FormGroup>
                            <FormGroup controlId="reqBedsMax" className="form-field" style={{ marginleft: '10px', marginRight: '10px' }}>
                                <FormLabel>Maximum Bedrooms Required</FormLabel>
                                <FormSelect
                                    placeholder="Enter your maximum required bedrooms"
                                    name="reqBedsMax"
                                    value={formData.reqBedsMax}
                                    onChange={handleInputChange}
                                    isInvalid={!!formErrors.reqBedsMax}
                                >
                                    <option value="">Select</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </FormSelect>
                                <FormControl.Feedback type="invalid">
                                    {formErrors.reqBedsMax}
                                </FormControl.Feedback>
                            </FormGroup>
                        </div>
                        <div className="bathsLivingAndGarage">
                            <FormGroup controlId="reqBaths" className="form-field" style={{ marginleft: '10px', marginRight: '10px' }}>
                                <FormLabel>Number of Bathrooms Required</FormLabel>
                                <FormSelect
                                    type="text"
                                    placeholder="Enter your required bathrooms"
                                    name="reqBaths"
                                    value={formData.reqBaths}
                                    onChange={handleInputChange}
                                    isInvalid={!!formErrors.reqBaths}
                                >
                                    <option value="">Select</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                </FormSelect>
                                <FormControl.Feedback type="invalid">
                                    {formErrors.reqBaths}
                                </FormControl.Feedback>
                            </FormGroup>
                            <FormGroup controlId="reqLiving" className="form-field" style={{ marginleft: '10px', marginRight: '10px' }}>
                                <FormLabel>Living</FormLabel>
                                <FormSelect
                                    placeholder="Select living requirements"
                                    name="reqLiving"
                                    value={formData.reqLiving}
                                    onChange={handleInputChange}
                                    isInvalid={!!formErrors.reqLiving}
                                >
                                    <option value="">Select</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </FormSelect>
                                <FormControl.Feedback type="invalid">
                                    {formErrors.reqLiving}
                                </FormControl.Feedback>
                            </FormGroup>
                            <FormGroup controlId="reqGarage" className="form-field" style={{ marginleft: '10px', marginRight: '10px' }}>
                                <FormLabel>Garages</FormLabel>
                                <FormSelect
                                    placeholder="Select garage requirements"
                                    name="reqGarage"
                                    value={formData.reqGarage}
                                    onChange={handleInputChange}
                                    isInvalid={!!formErrors.reqGarage}
                                >
                                    <option value="">Select</option>
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
                                <FormControl.Feedback type="invalid">
                                    {formErrors.reqGarage}
                                </FormControl.Feedback>
                            </FormGroup>
                        </div>
                        <div className="priceAndSuburb">
                            <FormGroup controlId="priceLimit" className="form-field" style={{ marginleft: '10px', marginRight: '10px' }}>
                                <FormLabel>Price Limit</FormLabel>
                                <FormSelect
                                    placeholder="Select price Limit"
                                    name="priceLimit"
                                    value={formData.priceLimit}
                                    onChange={handleInputChange}
                                    isInvalid={!!formErrors.priceLimit}
                                >
                                    <option value="">Select</option>
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
                                <FormControl.Feedback type="invalid">
                                    {formErrors.priceLimit}
                                </FormControl.Feedback>
                            </FormGroup>
                            <FormGroup controlId="suburbNames" className="form-field">
                                <FormLabel>Suburbs Required</FormLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter your required suburbs"
                                    name="suburbNames"
                                    value={formData.suburbNames}
                                    onChange={handleInputChange}
                                    isInvalid={!!formErrors.suburbNames}
                                />
                                <FormControl.Feedback type="invalid">
                                    {formErrors.suburbNames}
                                </FormControl.Feedback>
                            </FormGroup>
                        </div>
                    </div>
                </div>
                <button className="submitOpenHomeRegisterForm" onClick={handleSubmit}>Submit</button>
                <BottomSection/>
            </Modal>
        </>
    );
}

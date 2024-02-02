import React, { useState } from "react";
import { Button, Modal, FormGroup, FormLabel, FormControl, FormSelect, ModalTitle, ModalHeader } from 'react-bootstrap';
import { apiAddClients } from "./apiAddClients";

export function AddClients() {
    const [show, setShow] = useState(false);
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
    const [formErrors, setFormErrors] = useState({});
    const [error, setError] = useState("");
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = () => {
        // Reset error state before making the API call
        setError("");
        setFormErrors({}); // Reset form errors
    
        // Check if required fields are filled
        const requiredFields = ['firstName', 'lastName', 'emailAddress', 'phoneNumber'];
        const missingFields = requiredFields.filter(field => !formData[field]);
    
        if (missingFields.length > 0) {
            setError(`Please fill in the required fields: ${missingFields.join(', ')}`);
            return;
        }
    
        // Call the API function with the form data
        apiAddClients(formData)
            .then((response) => {
                console.log(response);
                // Handle success
                // Implement the logic to handle the successful response, e.g., show a success message or redirect
            })
            .catch((error) => {
                console.error("Error adding client:", error);
                // Set error state for displaying the error message
                setError("Error adding client. Please try again.");
    
                // If the error response contains field-specific errors, update the formErrors state
                if (error.response && error.response.data && error.response.data.errors) {
                    setFormErrors(error.response.data.errors);
                }
            });
    };

    return (
        <>
            <button onClick={() => setShow(true)}>Open Modal</button>
             <Modal show={show} onHide={() => setShow(false)} className="openHomeForm">
                <ModalHeader closeButton onClick={()=>setShow(false)}>
                    <ModalTitle>Register your details below</ModalTitle>
                    <Button variant="outline" onClick={()=>setShow(false)}>x</Button>
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
            </Modal>
            </>
    )
};
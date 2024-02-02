import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { apiPropertyPost } from './apiPropertyPost';
import { apiPropertyGet } from './apiPropertyGet';
import { Form, Col, CardFooter } from 'react-bootstrap';


export function SubmitNewProperty({handleAddProperty}) {
  const [propertyAddress, setAddress] = useState('');
  const [propertyImage, setImage] = useState('');
  const [smShow, setSmShow] = useState(false);
  const [error, setError] = useState('');
  
  const updateProperty = () => {
    // Fetch updated properties after adding a new one
    apiPropertyGet().then((data) => setProperties(data));

  }
  const addProperty = () => {
    // Reset error state before making the API call
    setError('');

    apiPropertyPost(propertyAddress, propertyImage)
      .then((response) => {
        console.log(response);
        // Handle success
        handleAddProperty(response.property)
      })
      .catch((error) => {
        console.error("Error adding property:", error);
        // Set error state for displaying the error message
        setError("Error adding property. Please try again.");
      });
  };

  // Function to add Property to the database and close the modal after submitting
  const onClickFunc = () => {
    addProperty();
    setSmShow(false);
    updateProperty();
  };

  return (
    <>
    <div className='addPropertyCard' onClick={() => setSmShow(true)}>
        <Card style={{ width: '18rem', height:'310px', color: '#656762', borderColor: '#656762' }}>
          <Card.Body>
            <Card.Title>Add new property</Card.Title>
          </Card.Body>
          <CardFooter>
          <img src={'./src/assets/add.svg'} alt="Add Property" />
          </CardFooter>
        </Card>
      </div>
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
        className='addPropertyModal'
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            <Form.Control
              type="text"
              value={propertyAddress}
              placeholder="Enter property address"
              onChange={(e) => setAddress(e.target.value)}
              className="addPropertyAddress"
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Add image URL"
            value={propertyImage}
            onChange={(e) => setImage(e.target.value)}
            className="addPropertyImage"
          />
        </Modal.Body>
        <Modal.Footer>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button role='button' variant="primary" onClick={onClickFunc} className='submitPropertyButton'>
            Add Property
          </button>
        </Modal.Footer>
      </Modal>
    
    </>
  );
}

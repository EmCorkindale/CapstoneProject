import { useState } from 'react';
import Axios from 'axios';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const SubmitProperty = () => {
  const [userID, setUserID] = useState("");
  const [address, setAddress] = useState("");
  const [smShow, setSmShow] = useState(false);

  const addProperty = () => {
    Axios.post('http://localhost:3306/api/property', { userID: userID, address: address })
      .then((response) => {
        console.log(response.data);
        // Handle success, e.g., update state or show a success message
      })
      .catch((error) => {
        console.error("Error adding property:", error);
        // Handle error, e.g., show an error message
      });

    setSmShow(false); // Close the modal after submitting
  };

  return (
    <>
      <Col className='addPropertyCard' onClick={() => setSmShow(true)}>
        <Card style={{ width: '18rem', color: '#656762', borderColor: '#656762' }}>
          <Card.Body>
            <Card.Title>Add new property</Card.Title>
            <Card.Text>
              <img src={'./src/assets/add.svg'} alt="Add Property" />
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            <input
              type="text"
              placeholder="Enter address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>...</Modal.Body>
        <Button variant="primary" onClick={addProperty}>
          Add Property
        </Button>
      </Modal>
    </>
  );
};

export default SubmitProperty;

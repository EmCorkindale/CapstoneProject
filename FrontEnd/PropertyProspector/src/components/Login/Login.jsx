import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import NavLink from 'react-bootstrap/esm/NavLink';

// function Login() {
//   const [user, setUser] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:8080/api/users')
//       .then(response => response.json())
//       .then( => setUser(user));
// //   }, []);

//   return (


function Login() {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);


  return (
    <>
 
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Welcome to property prospector!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='*******'
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Login
          </Button><br></br>
          <p>Don't have an account? <NavLink to="signUp">Sign up</NavLink> today!</p>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Login;

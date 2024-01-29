import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useUser } from '../../contexts/userContext';



function Login({ show, handleClose }) {

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [error, setError] = useState('');
  const { handleLogin, handleSuccess } = useUser()

  const handleError = (error) => {
    console.error(error);
    setError('Login failed. Please check your credentials.')
  }

  const resetError=()=>{setError("")}
  const handleSubmit = () => {
    resetError()
    handleLogin(
      userEmail,
      userPassword,
      () => {
        if (!error) {
          // Handle successful login if needed
          handleClose();
        }
      },
      handleError(error)
    );
  };
  useEffect(() => {
    if (handleSuccess) {
      handleClose();
    }
  }, [handleSuccess, handleClose]);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Welcome to Property Prospector!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                aria-label="Email Address"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="*******"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                aria-label="Password"
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
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Login;

import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import HrNavbar from './HrNavbar/HrNavbar';

const HrProfile = () => {
  // State for editing mode
  const [editing, setEditing] = useState(false);

  // Sample HR data (replace with your actual data logic)
  const hrDetails = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    profileImage: 'https://placekitten.com/200/200', // Replace with actual image URL
    // Add more details as needed
  };

  // Function to toggle editing mode
  const toggleEditing = () => {
    setEditing(!editing);
  };

  // Function to handle form submission (replace with actual submit logic)
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic
    // Example: Update HR details in backend
    console.log('Form submitted!');
    toggleEditing(); // Exit editing mode after submission
  };

  return (
    <><HrNavbar/>
    <Container className="mt-4">
      <Row>
        <Col md={6} lg={6}>
          <img src={hrDetails.profileImage} alt="HR Profile" className="img-fluid rounded-circle mb-3 mr-5" />
          {!editing && (
            <Button variant="primary" onClick={toggleEditing} className="mb-3">
              Edit Profile
            </Button>
          )}
        </Col>
        <Col md={6}>
          <h2>{hrDetails.name}</h2>
          {editing ? (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" defaultValue={hrDetails.email} required />
              </Form.Group>
              <Form.Group controlId="formBasicPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="text" placeholder="Enter phone number" defaultValue={hrDetails.phone} required />
              </Form.Group>
              {/* Add more fields as needed */}
              <Button variant="primary" type="submit">
                Save
              </Button>
              <Button variant="secondary" className="ml-2" onClick={toggleEditing}>
                Cancel
              </Button>
            </Form>
          ) : (
            <div>
              <p><strong>Email:</strong> {hrDetails.email}</p>
              <p><strong>Phone:</strong> {hrDetails.phone}</p>
              {/* Add more details display */}
            </div>
          )}
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default HrProfile;

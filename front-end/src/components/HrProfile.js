import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HrProfile.css';
import HrNavbar from './HrNavbar/HrNavbar';

const ProfilePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Naveen',
    email: 'naveensathya.vanamoju@gmail.com',
    phone: '9515982621',
    jobTitle: 'HR Manager',
    department: 'Human Resources',
    location: 'Hyderabad, ',
    bio: 'Experienced HR manager with over 10 years in the industry working in Ramanasoft.',
  });

  const handleEdit = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleSave = () => {
    // Save profile logic
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  return (
    <>
    <HrNavbar/>
    <Container fluid className="profile-page ">
      <Row className="justify-content-center">
        <Col md={8}>
          
            <Card.Header className="text-center">
              <img
                src="https://via.placeholder.com/150"
                alt="Profile"
                className="rounded-circle mb-3"
                width="150"
                height="150"
              />
              <h2>{profile.name}</h2>
              <p>{profile.jobTitle}</p>
            </Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Col sm={4}><strong>Email:</strong></Col>
                <Col sm={8}>{profile.email}</Col>
              </Row>
              <Row className="mb-3">
                <Col sm={4}><strong>Phone:</strong></Col>
                <Col sm={8}>{profile.phone}</Col>
              </Row>
              <Row className="mb-3">
                <Col sm={4}><strong>Department:</strong></Col>
                <Col sm={8}>{profile.department}</Col>
              </Row>
              <Row className="mb-3">
                <Col sm={4}><strong>Location:</strong></Col>
                <Col sm={8}>{profile.location}</Col>
              </Row>
              <Row className="mb-3">
                <Col sm={4}><strong>Bio:</strong></Col>
                <Col sm={8}>{profile.bio}</Col>
              </Row>
              <div className="text-center">
                <Button variant="primary" onClick={handleEdit}>Edit Profile</Button>
              </div>
            </Card.Body>
          
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Job Title</Form.Label>
              <Form.Control
                type="text"
                name="jobTitle"
                value={profile.jobTitle}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                name="department"
                value={profile.department}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={profile.location}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="bio"
                value={profile.bio}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleSave}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </Container>
    </>
    
  );
};

export default ProfilePage;

import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Cookies from 'js-cookie';
import ramana from '../images/p3.jpeg';
import { useNavigate } from 'react-router-dom';

const JobPortal = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const verified = Cookies.get('verified');
    if (verified === undefined) {
      navigate('/login');
    }
  })
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [companies, setCompanies] = useState([]);

  const handleLanguageToggle = (language) => {
    const updatedLanguage = selectedLanguage === language ? null : language;

    setSelectedLanguage(updatedLanguage);


    const dummyData = {
      JavaScript: [
        { name: 'Tech Innovators Inc.', appliedCount: 42 },
        { name: 'CodeCrafters Ltd.', appliedCount: 55 },
      ],
      Python: [
        { name: 'DataMasters Corp.', appliedCount: 37 },
        { name: 'AI Pioneers Inc.', appliedCount: 29 },
      ],
      Java: [
        { name: 'Enterprise Solutions Ltd.', appliedCount: 48 },
        { name: 'Backend Builders LLC.', appliedCount: 53 },
      ],
      CSharp: [
        { name: 'DotNet Developers Inc.', appliedCount: 34 },
        { name: 'Sharp Coders Ltd.', appliedCount: 41 },
      ],
    };

    setCompanies(updatedLanguage ? dummyData[updatedLanguage] : []);
  };

  const getUserInitials = (name) => {
    const initials = name.split(' ').map((n) => n[0]).join('');
    return initials.toUpperCase();
  };

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src={ramana}
              width="200"
              className="d-inline-block align-top rounded"
              alt="Left Logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#about" className="fw-bold me-4 text-secondary">About</Nav.Link>
              <Nav.Link href="#applied" className="fw-bold me-4 text-secondary">Applied</Nav.Link>
              <Nav.Link href="#profile" className="fw-bold me-4 text-secondary">Profile</Nav.Link>
            </Nav>
            <Nav>
              <div className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center fw-bold" style={{ width: '50px', height: '50px' }}>
                {getUserInitials(sessionStorage.getItem('name')).toString()}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="container mt-5">
        <h1 className="mb-4">IT Job Portal</h1>
        <p className="mb-4">Welcome to our IT Job Portal. Select your preferred programming languages to see available job opportunities.</p>

        <div className="mb-4">
          {['JavaScript', 'Python', 'Java', 'CSharp'].map((language) => (
            <button
              key={language}
              className={`btn btn-outline-warning m-1 ${selectedLanguage === language ? 'active' : ''}`}
              onClick={() => handleLanguageToggle(language)}
            >
              {language}
            </button>
          ))}
        </div>

        <div>
          <hr></hr>
          {companies.length > 0 ? (
            companies.map((company, index) => (

              <div key={index} className="border rounded p-3 mb-3 d-flex justify-content-between">
                <h3 className="text-primary">{company.name}</h3>
                <p className='fw-bold'><i className="fa-solid fa-user"></i> {company.appliedCount}</p>
              </div>
            ))
          ) : (
            <p className='text-secondary text-center fw-bold mt-5'>No Job opportunities Available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobPortal;

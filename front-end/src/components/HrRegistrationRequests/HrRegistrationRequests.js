import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Form, Button,Row, Col} from 'react-bootstrap';
import Cookies from 'js-cookie';
import ramana from '../../images/p3.jpeg';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaCheck, FaTimes } from 'react-icons/fa';
import HrNavbar from '../HrNavbar/HrNavbar'
import './HrRegistrationRequests.css'

const HrRegistrationRequests = () => {
  const [candidates, setCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCandidates();
  }, []);

  // Dummy data for testing
  
  const fetchCandidates = async () => {
    try {
      // Replace with actual API call
      // const response = await axios.get('/api/candidates');
      axios.get("http://localhost:5000/hr-requests")
      .then(response=>{
        console.log(response)
        setCandidates(response.data)
      })
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };

  const handleAccept = async (acceptedCandidate) => {
    try {
        //onsole.log(candidate)
      // Replace with actual API call
      // await axios.put(`/api/candidates/${candidateId}/accept`);
      /*console.log(`Candidate ${acceptedCandidate.name} accepted`);
      const updatedCandidates = candidates.filter(candidate => candidate!== acceptedCandidate);
      console.log(updatedCandidates)
      setCandidates(updatedCandidates);*/
      // Optionally update state or fetch candidates again
      console.log(acceptedCandidate)
      await axios.post("http://localhost:5000/accept-hr",acceptedCandidate)
      .then(response=>{
        toast.success("Registration Accepted successfully!", {
          autoClose: 5000
        });
        fetchCandidates()
      })
      .catch(error=>{
        toast.error(`There was an error accepting the registration ${error}`, {
          autoClose: 5000
        })
      })
      
    } catch (error) {
      console.error('Error accepting candidate:', error);
    }
  };

  const getUserInitials = (hr) => {
    const initials = hr.split(' ').map((n) => n[0]).join('');
    return initials.toUpperCase();
  };

  const handleReject = async (rejectedCandidate) => {
    try {
      // Replace with actual API call
      // await axios.put(`/api/candidates/${candidateId}/reject`);
      await axios.post("http://localhost:5000/reject-hr",rejectedCandidate)
      .then(response=>{
        toast.success("Registration Rejected successfully!", {
          autoClose: 5000
        });
        fetchCandidates()
      })
      .catch(error=>{
        toast.error(`There was an error Rejecting the registration ${error}`, {
          autoClose: 5000
        })
      })
      
    } catch (error) {
      console.error('Error rejecting candidate:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  console.log("HR",candidates)
  const filteredCandidates = candidates.filter(candidate =>
    candidate.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.mobileNo.includes(searchTerm)
  );
  //console.log(filteredCandidates)

  return (
    <div style={{overflow:'hidden'}}>
      {/* Navbar */}
      <HrNavbar/>
      {/* Search input */}
      
      <Container className="my-4" >
      <h1 style={{color:'#888888',fontWeight:'bold',fontSize:'25px'}}> HR Requests</h1>
        <Form.Control
          type="text"
          placeholder="Search by name, email, or phone"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </Container>

      {/* Candidates list */}
      <Container fluid className='px-0 ml-auto mr-auto mb-3' style={{width:'95vw',height:"100vh"}}>
      <Row xs={1} sm={2} md={2} lg={3} className="g-4">
        {filteredCandidates.map(candidate => (
          <Col key={candidate.email}>
            <div className="card h-100" style={{'box-shadow': '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
              <div className="card-body">
                <h5 className="card-title">{candidate.fullName}</h5>
                <p className="card-text">Email: {candidate.email}</p>
                <p className="card-text">Phone: {candidate.mobileNo}</p>
                
                <div className="btn-container">
                  <Button className="accept-btn" onClick={() => handleAccept(candidate)}>
                    <FaCheck className="me-1" /> Accept
                  </Button>
                  <Button className="reject-btn" onClick={() => handleReject(candidate)}>
                    <FaTimes className="me-1" /> Reject
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
    </div>
  );
};

export default HrRegistrationRequests;

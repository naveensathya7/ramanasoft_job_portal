import React, { useEffect, useState } from 'react';
import { Table, Container, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaCheck, FaTimes } from 'react-icons/fa';
import HrNavbar from '../HrNavbar/HrNavbar';
import {io} from 'socket.io-client';
import './RegistrationRequests.css';
const socket = io('http://localhost:5000');

const RegistrationRequests = () => {
  const [candidates, setCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCandidates, setSelectedCandidates] = useState([]);

  useEffect(() => {
    fetchCandidates();
    socket.on('internRequestsUpdate', (updatedCandidates) => {
      console.log(updatedCandidates)
      setCandidates(updatedCandidates);
    });

    // Cleanup on component unmount
    return () => {
      socket.off('internRequestsUpdate');
    };
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await axios.get("http://localhost:5000/intern-requests");
      setCandidates(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };

  const handleAccept = async (acceptedCandidates) => {
    try {
      await axios.post("http://localhost:5000/accept-interns", acceptedCandidates)
      .then(response => {
        toast.success("Registration Accepted successfully!", {
          autoClose: 5000
        });
        fetchCandidates();
        setSelectedCandidates([]);
      })
      .catch(error => {
        toast.error(`There was an error accepting the registration ${error}`, {
          autoClose: 5000
        });
      });
    } catch (error) {
      console.error('Error accepting candidate:', error);
    }
  };

  const handleReject = async (rejectedCandidates) => {
    try {
      await axios.post("http://localhost:5000/reject-interns", rejectedCandidates)
      .then(response => {
        toast.success("Registration Rejected successfully!", {
          autoClose: 5000
        });
        fetchCandidates();
        setSelectedCandidates([]);
      })
      .catch(error => {
        toast.error(`There was an error rejecting the registration ${error}`, {
          autoClose: 5000
        });
      });
    } catch (error) {
      console.error('Error rejecting candidate:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSelectCandidate = (candidate) => {
    setSelectedCandidates(prevSelected => {
      if (prevSelected.includes(candidate)) {
        return prevSelected.filter(cand => cand._id !== candidate._id);
      } else {
        return [...prevSelected, candidate];
      }
    });
  };

  const handleSelectAllCandidates = () => {
    if (selectedCandidates.length === filteredCandidates.length) {
      setSelectedCandidates([]);
    } else {
      setSelectedCandidates(filteredCandidates.map(candidate => candidate));
    }
  };
  candidates.map(user=>console.log(user))
  const filteredCandidates = candidates.filter(candidate =>
    
    candidate.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.mobileno.includes(searchTerm)
  );
  console.log(candidates)
  return (
    <div style={{ overflow: 'hidden' }}>
      {/* Navbar */}
      <HrNavbar />

      {/* Search input */}
      <Container className="my-4">
        <h1 style={{ color: '#888888', fontWeight: 'bold', fontSize: '25px' }}>Intern Requests</h1>
        <Form.Control
          type="text"
          placeholder="Search by name, email, or phone"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </Container>

      {/* Candidates list */}
      <Container  className="px-0 ml-auto mr-auto mb-3" style={{ width: '100%' }}>
        <div className="table-responsive">
          <Table responsive bordered className="table" >
            <thead style={{backgroundColor:'green'}}>
              <tr style={{backgroundColor:'blue'}}>
                <th style={{backgroundColor:'#1b74a8',color:'white'}}>
                  <Form.Check 
                    type="checkbox" 
                    checked={selectedCandidates.length === filteredCandidates.length}
                    onChange={handleSelectAllCandidates}
                  />
                </th>
                <th style={{backgroundColor:'#1b74a8',color:'white'}}>Name</th>
                <th style={{backgroundColor:'#1b74a8',color:'white'}}>Email</th>
                <th style={{backgroundColor:'#1b74a8',color:'white'}}>Phone</th>
                <th style={{backgroundColor:'#1b74a8',color:'white'}}>Domain</th>
                <th style={{backgroundColor:'#1b74a8',color:'white'}}>Batch</th>
                <th style={{backgroundColor:'#1b74a8',color:'white'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCandidates.map(candidate => (
                <tr key={candidate._id}>
                  <td>
                    <Form.Check 
                      type="checkbox"
                      checked={selectedCandidates.includes(candidate)}
                      onChange={() => handleSelectCandidate(candidate)}
                    />
                  </td>
                  <td>{candidate.fullName}</td>
                  <td>{candidate.email}</td>
                  <td>{candidate.mobileNo}</td>
                  <td>{candidate.domain}</td>
                  <td>{candidate.batchNo}</td>
                  <td>
                    <Button 
                       style={{background:'transparent',border:'none',color:'green'}} 
                      onClick={() => handleAccept([candidate])}
                    >
                      <FaCheck className="me-1" /> Accept
                    </Button>
                    <Button 
                      style={{background:'transparent',border:'none',color:'red'}}
                      onClick={() => handleReject([candidate])}
                    >
                      <FaTimes className="me-1" /> Reject
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        {selectedCandidates.length > 0 && 
          <div className="d-flex justify-content-end">
            <Button 
              style={{background:'transparent',border:'none',color:'green'}} 
              onClick={() => handleAccept(selectedCandidates)}
              disabled={selectedCandidates.length === 0}
            >
              <FaCheck className="me-1" /> Accept Selected
            </Button>
            <Button 
              style={{background:'transparent',border:'none',color:'red'}}
              onClick={() => handleReject(selectedCandidates)}
              disabled={selectedCandidates.length === 0}
            >
              <FaTimes className="me-1" /> Reject Selected
            </Button>
          </div>
        }
      </Container>
    </div>
  );
};

export default RegistrationRequests;

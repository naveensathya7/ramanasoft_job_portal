import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Form, Button, Row, Col } from 'react-bootstrap';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { MdEdit, MdDelete } from 'react-icons/md';
import HrNavbar from '../HrNavbar/HrNavbar';
import EditJobModal from '../EditJobModal';
import './HrViewJobs.css';

const HrViewJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [sortCriteria, setSortCriteria] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    if (jobs.length > 0) {
      const filtered = jobs.filter(job =>
        job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.jobRole.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.phone.includes(searchTerm) ||
        job.jobCity.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredJobs(filtered);
    }
  }, [jobs, searchTerm]);

  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/view-jobs");
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleEdit = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const handleSave = async (updatedJob) => {
    const changedValues = {};
    const originalJob = filteredJobs.find(job => updatedJob.jobId === job.jobId);
    for (let key in updatedJob) {
      if (updatedJob.hasOwnProperty(key) && originalJob.hasOwnProperty(key)) {
        if (updatedJob[key] !== originalJob[key]) {
          changedValues[key] = updatedJob[key];
        }
      }
    }
    try {
      await axios.post("http://localhost:5000/update-job", { changedValues, jobId: updatedJob.jobId });
      toast.success(`Job updated successfully`, { autoClose: 5000 });
      setShowModal(false);
      fetchJobs();
    } catch (error) {
      console.error('There was an error updating the job!', error);
      toast.error(`${error.response.data.error}`, { autoClose: 5000 });
    }
  };

  const handleDelete = async (job) => {
    try {
      console.log(job)
      await axios.delete(`http://localhost:5000/delete-job/${job.jobId}`);
      toast.success("Job deleted successfully!", { autoClose: 5000 });
      fetchJobs();
    } catch (error) {
      console.error('Error deleting job:', error);
      toast.error(`There was an error deleting the job ${error}`, { autoClose: 5000 });
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (criteria) => {
    const sortedJobs = [...jobs].sort((a, b) => {
      if (criteria === 'name') {
        return a.jobRole.localeCompare(b.jobRole);
      } else if (criteria === 'date') {
        return new Date(b.postedOn) - new Date(a.postedOn);
      } else if (criteria === 'company') {
        return a.companyName.localeCompare(b.companyName);
      }
      return 0;
    });
    setSortCriteria(criteria);
    setJobs(sortedJobs);
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div style={{ overflowY: 'scroll',height:'150vh',paddingBottom:'10px' }}>
      <HrNavbar />
      <Container className="my-4">
        <div className="d-flex flex-row justify-content-between">
          <h1 style={{ color: '#888888', fontWeight: 'bold', fontSize: '25px' }}>Available Jobs</h1>
          <select
            id="sort"
            name="sort"
            value={sortCriteria}
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="">Select</option>
            <option value="name">Job Title</option>
            <option value="date">Date Posted</option>
            <option value="company">Company Name</option>
          </select>
        </div>
        <Form.Control
          type="text"
          placeholder="Search by name, email, or phone"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </Container>

      <Container fluid className="px-0 ml-auto mr-auto mb-5" style={{ width: '95vw', height: "100vh" }}>
        {filteredJobs.length > 0 ? (
          <Row xs={1} sm={1} md={2} lg={3} className="g-4">
            {filteredJobs.map(job => (
              <Col key={job.jobId}>
                <div className="card h-100" style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                  <div className="card-body">
                    <h5 className="card-title fw-bold">{job.jobRole}</h5>
                    <p className="card-text"><span className='span-text'>Company Name:</span> {job.companyName}</p>
                    <p className="card-text"><span className='span-text'>Required Skills:</span> {job.requiredSkills}</p>
                    <p className="card-text"><span className='span-text'>Location:</span> {job.jobCity}</p>
                    <p className="card-text"><span className='span-text'>Salary:</span> {job.salary}</p>
                    <p className="card-text"><span className='span-text'>Posted Date:</span> {formatDate(job.postedOn)}</p>
                    <p className="card-text"><span className='span-text'>Last Date:</span> {formatDate(job.lastDate)}</p>
                    <div className="btn-container">
                      <Button className="edit-btn" onClick={() => handleEdit(job)}>
                        <MdEdit className="me-1" /> Edit
                      </Button>
                      <EditJobModal
                        show={showModal}
                        handleClose={() => setShowModal(false)}
                        job={selectedJob}
                        handleSave={handleSave}
                      />
                      <Button className="delete-btn" onClick={() => handleDelete(job)}>
                        <MdDelete className="me-1" /> Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        ) : (
          <h2 className='text-center text-secondary'>No jobs to display</h2>
        )}
      </Container>
    </div>
  );
};

export default HrViewJobs;

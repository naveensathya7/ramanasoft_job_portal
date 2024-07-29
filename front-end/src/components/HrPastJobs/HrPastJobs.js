import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Form, Button,Row, Col} from 'react-bootstrap';
import Cookies from 'js-cookie';
import ramana from '../../images/p3.jpeg';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { MdEdit,MdDelete } from "react-icons/md";
import HrNavbar from '../HrNavbar/HrNavbar'
import EditJobModal from '../EditJobModal';
import './HrPastJobs.css'

const HrPastJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredJobs,setFilteredJObs]=useState([])
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [sortCriteria, setSortCriteria] = useState('');


  useEffect(() => {
    fetchJobs();
  }, []);


  useEffect(() => {
    if(jobs.length>0){
        console.log(searchTerm,jobs)
        const filtered = jobs.filter(candidate =>
            candidate.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            candidate.jobRole.toLowerCase().includes(searchTerm.toLowerCase()) ||
            candidate.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            candidate.phone.includes(searchTerm) ||
            candidate.jobCity.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setFilteredJObs(filtered);
    }
    

    
  }, [jobs, searchTerm]);


  // Dummy data for testing
  
  const fetchJobs = async () => {
    try {
      // Replace with actual API call
      // const response = await axios.get('/api/candidates');
      axios.get("http://localhost:5000/past-jobs")
      .then(response=>{
        console.log(response.data)
        setJobs(response.data)
      })
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };

  const handleEdit = (job) => {
    setSelectedJob(job);
    console.log("Job",job)
    setShowModal(true);
  };

  const handleSave = async(updatedJob) => {
    console.log(updatedJob)

    const changedValues={}
                const cand=jobs.find(job=>updatedJob.jobId===job._id)
                console.log("Updated Job:",cand,updatedJob)
                for (let key in updatedJob) {
                  // Ensure both objects have the property
                  if (updatedJob.hasOwnProperty(key) && cand.hasOwnProperty(key)) {
                    if (updatedJob[key] !== cand[key]) {
                      changedValues[key] = updatedJob[key];
                    }
                  }
                }
                 console.log("Changed values",changedValues)
    
    // Implement your save logic here, e.g., send updatedJob to the server
    await axios.post("http://localhost:5000/update-job",{changedValues,jobId:updatedJob.jobId})
      .then(response=>{
        console.log("Registration request sent",response)
        toast.success(`Job updated successfully`, {
          autoClose: 5000
        })
        
        
      })
      .catch(error=>{
        console.error('There was an error registering!', error);
                console.log(error)
                toast.error(`${error.response.data.error}`, {
                  autoClose: 5000
                })
                
                
      })
                
   setShowModal(false);
  };

  


  /*const handleEdit = async (jobToEdit) => {
    try {
        //onsole.log(candidate)
      // Replace with actual API call
      // await axios.put(`/api/candidates/${candidateId}/accept`);
      /*console.log(`Candidate ${acceptedCandidate.name} accepted`);
      const updatedCandidates = candidates.filter(candidate => candidate!== acceptedCandidate);
      console.log(updatedCandidates)
      setJobs(updatedCandidates);*
      // Optionally update state or fetch candidates again
      console.log(jobToEdit)
      await axios.post("http://localhost:5000/",jobToEdit)
      .then(response=>{
        toast.success("Registration Accepted successfully!", {
          autoClose: 5000
        });
        fetchJobs()
      })
      .catch(error=>{
        toast.error(`There was an error accepting the registration ${error}`, {
          autoClose: 5000
        })
      })
      
    } catch (error) {
      console.error('Error accepting candidate:', error);
    }
  };*/

  const getUserInitials = (hr) => {
    const initials = hr.split(' ').map((n) => n[0]).join('');
    return initials.toUpperCase();
  };

  const handleDelete = async (rejectedCandidate) => {
    try {
      // Replace with actual API call
      // await axios.put(`/api/candidates/${candidateId}/reject`);
      await axios.post("http://localhost:5000/reject-hr",rejectedCandidate)
      .then(response=>{
        toast.success("Registration Rejected successfully!", {
          autoClose: 5000
        });
        fetchJobs()
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
  console.log("HR",jobs)


  const handleSort = (criteria) => {
    const sortedJobs = jobs.sort((a, b) => {
      if (criteria === 'name') {
        return a.jobRole.localeCompare(b.jobRole);
      } else if (criteria === 'date') {
        console.log(a,b)
        console.log(Date(b.postedOn),Date(a.postedOn))
        return new Date(b.postedOn) - new Date(a.postedOn);
      } else if (criteria === 'company') {
        return a.companyName.localeCompare(b.companyName);
      }
      return 0;
    });
    console.log(sortedJobs)
    setSortCriteria(criteria);
    setJobs(sortedJobs);
  }
  
  return (
    <div style={{overflow:'hidden'}}>
      {/* Navbar */}
      <HrNavbar/>
      {/* Search input */}
      
      <Container className="my-4" >
        <div className='d-flex flex-row justify-content-between'> 
            <h1 style={{color:'#888888',fontWeight:'bold',fontSize:'25px'}}> Expired Jobs</h1>
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

      {/* Candidates list */}
      <Container fluid className='px-0 ml-auto mr-auto mb-3' style={{width:'95vw',height:"100vh"}}>
        {filteredJobs.length>0?(<Row xs={1} sm={2} md={2} lg={3} className="g-4">
        {filteredJobs.map(job => (
          <Col key={job.email}>
            <div className="card h-100" style={{'box-shadow': '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
              <div className="card-body">
                <h5 className="card-title fw-bold">{job.jobRole}</h5>
                <p className="card-text"><span  className='span-text'>Company Name:</span> {job.companyName}</p>
                <p className="card-text"><span className='span-text'>Required Skills:</span> {job.requiredSkills}</p>
                <p className='card-text'><span className='span-text'>Location:</span> {job.jobCity}</p>
                <p className='card-text'><span className='span-text'>Salary:</span> {job.salary}</p>
                <p className='card-text'><span className='span-text'>Expired Date:</span> {job.lastDate}</p>
                
              </div>
            </div>
          </Col>
        ))}
      </Row>):(<h2 className='text-center'>No jobs to view</h2>)}
      
    </Container>
    </div>
  );
};

export default HrPastJobs;
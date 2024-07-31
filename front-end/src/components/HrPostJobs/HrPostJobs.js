import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import HrNavbar from '../HrNavbar/HrNavbar';
import axios from 'axios'
import {toast} from 'react-toastify'

const validationSchema = Yup.object().shape({
  jobTitle: Yup.string().required('Job Title is required'),
  companyName: Yup.string().required('Company Name is required'),
  jobType: Yup.string().required('Job Type is required'),
  jobCategory: Yup.string().required('Job Category is required'),
  jobTags: Yup.string().required('Job Tags are required'),
  jobExperience: Yup.string().required('Job Experience is required'),
  jobQualification: Yup.string().required('Job Qualification is required'),
  requiredSkills: Yup.string().required('Required Skills are required'),
  jobRole: Yup.string().required('Job Role is required'),
  jobCity: Yup.string().required('Job City is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone is required'),
  postedOn: Yup.date().required('Posted On date is required'),
  lastDate: Yup.date().required('Last Date is required'),
  responsibilities: Yup.string().required('Responsibilities are required'),
  requirements: Yup.string().required('Requirements are required'),
  jobDescription: Yup.string().required('Job Description is required'),
  salary: Yup.string().required('Salary is required'),
  applicationUrl: Yup.string().url('Invalid URL').required('Application URL is required')
});

const HrPostJobs = () => {



  
  const handleSubmit = async(values, { setSubmitting, resetForm }) => {
    // Perform API call or further actions here
    console.log(values); // Replace with your API call

    // Example API call using fetch
    await axios.post("http://localhost:5000/post-job",{job:values})
      .then(response=>{
        console.log("Registration request sent",response)
        toast.success(`Job posted successfully`, {
          autoClose: 5000
        })
        resetForm();
        
        
      })
      .catch(error=>{
        console.error('There was an error registering!', error);
                console.log(error)
                toast.error(`${error.response.data.message}`, {
                  autoClose: 5000
                })
                
                
      })
    
     
      
  };

  return (
    <>
      <HrNavbar />
      <div style={{ overflow: 'auto', backgroundColor: '#BED7DC' }}>
        <Container className='mt-3 mb-3 p-2 pl-5' style={{ width: '95%', height: '90%', backgroundColor: 'white', overflowY: 'auto', overflowX: 'hidden', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', borderRadius: '5px' }}>
          <h1 className="my-4 fw-bold"  style={{color:'#6B92FA',fontStyle:'Roboto'}}>Post a New Job</h1>
          <Formik
            initialValues={{
              jobTitle: '',
              companyName: '',
              jobType: 'Full Time',
              jobCategory: 'Technical',
              jobTags: '',
              jobExperience: '0-1',
              jobQualification: '',
              requiredSkills: '',
              jobRole: '',
              jobCity: '',
              email: '',
              phone: '',
              postedOn: '',
              lastDate: '',
              responsibilities: '',
              requirements: '',
              jobDescription: '',
              salary: '',
              applicationUrl: ''
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, handleChange, handleSubmit, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Col>
                    <label htmlFor="jobTitle">Job Title *</label>
                    <Field name="jobTitle" type="text" className={`form-control ${touched.jobTitle && errors.jobTitle ? 'is-invalid' : ''}`} placeholder="Enter Your Job Title" />
                    <ErrorMessage name="jobTitle" component="div" className="invalid-feedback" />
                  </Col>
                  <Col>
                    <label htmlFor="companyName">Company Name *</label>
                    <Field name="companyName" type="text" className={`form-control ${touched.companyName && errors.companyName ? 'is-invalid' : ''}`} placeholder="Enter Your Company Name" />
                    <ErrorMessage name="companyName" component="div" className="invalid-feedback" />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <label htmlFor="jobType">Job Type *</label>
                    <Field name="jobType" as="select" className={`form-control ${touched.jobType && errors.jobType ? 'is-invalid' : ''}`}>
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                      <option value="Internship">Internship</option>
                      <option value="Contract">Contract</option>
                    </Field>
                    <ErrorMessage name="jobType" component="div" className="invalid-feedback" />
                  </Col>
                  <Col>
                    <label htmlFor="jobCategory">Job Category *</label>
                    <Field name="jobCategory" as="select" className={`form-control ${touched.jobCategory && errors.jobCategory ? 'is-invalid' : ''}`}>
                      <option value="Technical">Technical</option>
                      <option value="Non-Technical">Non-Technical</option>
                    </Field>
                    <ErrorMessage name="jobCategory" component="div" className="invalid-feedback" />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <label htmlFor="jobTags">Job Tags *</label>
                    <Field name="jobTags" type="text" className={`form-control ${touched.jobTags && errors.jobTags ? 'is-invalid' : ''}`} placeholder="Enter Your Job Tags" />
                    <ErrorMessage name="jobTags" component="div" className="invalid-feedback" />
                  </Col>
                  <Col>
                    <label htmlFor="jobExperience">Job Experience *</label>
                    <Field name="jobExperience" as="select" className={`form-control ${touched.jobExperience && errors.jobExperience ? 'is-invalid' : ''}`}>
                      <option value="0-1">0-1</option>
                      <option value="1-3">1-3</option>
                      <option value="3-5">3-5</option>
                      <option value="5+">5+</option>
                    </Field>
                    <ErrorMessage name="jobExperience" component="div" className="invalid-feedback" />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <label htmlFor="jobQualification">Job Qualification *</label>
                    <Field name="jobQualification" type="text" className={`form-control ${touched.jobQualification && errors.jobQualification ? 'is-invalid' : ''}`} placeholder="Enter Your Qualification" />
                    <ErrorMessage name="jobQualification" component="div" className="invalid-feedback" />
                  </Col>
                  <Col>
                    <label htmlFor="requiredSkills">Required Skills *</label>
                    <Field name="requiredSkills" type="text" className={`form-control ${touched.requiredSkills && errors.requiredSkills ? 'is-invalid' : ''}`} placeholder="Enter Your Required Skills" />
                    <ErrorMessage name="requiredSkills" component="div" className="invalid-feedback" />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <label htmlFor="jobRole">Job Role *</label>
                    <Field name="jobRole" type="text" className={`form-control ${touched.jobRole && errors.jobRole ? 'is-invalid' : ''}`} placeholder="Enter Your Role" />
                    <ErrorMessage name="jobRole" component="div" className="invalid-feedback" />
                  </Col>
                  <Col>
                    <label htmlFor="jobCity">Job City *</label>
                    <Field name="jobCity" type="text" className={`form-control ${touched.jobCity && errors.jobCity ? 'is-invalid' : ''}`} placeholder="Enter Your Location" />
                    <ErrorMessage name="jobCity" component="div" className="invalid-feedback" />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <label htmlFor="email">Email *</label>
                    <Field name="email" type="email" className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`} placeholder="Enter Your Email" />
                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                  </Col>
                  <Col>
                    <label htmlFor="phone">Phone *</label>
                    <Field name="phone" type="text" className={`form-control ${touched.phone && errors.phone ? 'is-invalid' : ''}`} placeholder="Enter Your Phone" />
                    <ErrorMessage name="phone" component="div" className="invalid-feedback" />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <label htmlFor="postedOn">Posted On *</label>
                    <Field name="postedOn" type="date" className={`form-control ${touched.postedOn && errors.postedOn ? 'is-invalid' : ''}`} />
                    <ErrorMessage name="postedOn" component="div" className="invalid-feedback" />
                  </Col>
                  <Col>
                    <label htmlFor="lastDate">Last Date *</label>
                    <Field name="lastDate" type="date" className={`form-control ${touched.lastDate && errors.lastDate ? 'is-invalid' : ''}`} />
                    <ErrorMessage name="lastDate" component="div" className="invalid-feedback" />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <label htmlFor="responsibilities">Responsibilities *</label>
                    <Field name="responsibilities" as="textarea" className={`form-control ${touched.responsibilities && errors.responsibilities ? 'is-invalid' : ''}`} placeholder="Enter Responsibilities" />
                    <ErrorMessage name="responsibilities" component="div" className="invalid-feedback" />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <label htmlFor="requirements">Requirements *</label>
                    <Field name="requirements" as="textarea" className={`form-control ${touched.requirements && errors.requirements ? 'is-invalid' : ''}`} placeholder="Enter Requirements" />
                    <ErrorMessage name="requirements" component="div" className="invalid-feedback" />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <label htmlFor="jobDescription">Job Description *</label>
                    <Field name="jobDescription" as="textarea" className={`form-control ${touched.jobDescription && errors.jobDescription ? 'is-invalid' : ''}`} placeholder="Enter Job Description" />
                    <ErrorMessage name="jobDescription" component="div" className="invalid-feedback" />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <label htmlFor="salary">Salary *</label>
                    <Field name="salary" type="text" className={`form-control ${touched.salary && errors.salary ? 'is-invalid' : ''}`} placeholder="Ex: 3.2-5.5 LPA" />
                    <ErrorMessage name="salary" component="div" className="invalid-feedback" />
                  </Col>
                  <Col>
                    <label htmlFor="applicationUrl">Application Email/URL *</label>
                    <Field name="applicationUrl" type="text" className={`form-control ${touched.applicationUrl && errors.applicationUrl ? 'is-invalid' : ''}`} placeholder="https://peramsons.com" />
                    <ErrorMessage name="applicationUrl" component="div" className="invalid-feedback" />
                  </Col>
                </Row>

                <Button type="submit" variant="primary" disabled={isSubmitting}>POST</Button>
              </Form>
            )}
          </Formik>
        </Container>
      </div>
    </>
  );
};

export default HrPostJobs;

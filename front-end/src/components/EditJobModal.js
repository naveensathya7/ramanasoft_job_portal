import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { MdEdit } from 'react-icons/md';
import * as Yup from 'yup';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import './EditJobModal.css'; // Custom CSS file for modal

const validationSchema = Yup.object().shape({
  jobTitle: Yup.string().required('Job Title is required'),
  companyName: Yup.string().required('Company Name is required'),
  jobCategory: Yup.string().required('Job Category is required'),
  jobDescription: Yup.string().required('Job Description is required'),
  jobExperience: Yup.string().required('Job Experience is required'),
  jobQualification: Yup.string().required('Job Qualification is required'),
  jobRole: Yup.string().required('Job Role is required'),
  jobTags: Yup.string(),
  jobType: Yup.string().required('Job Type is required'),
  salary: Yup.string().required('Salary is required'),
  phone: Yup.string().required('Phone is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  location: Yup.string().required('Location is required'),
  requirements: Yup.string().required('Job Requirements are required'),
  responsibilities: Yup.string().required('Job Responsibilities are required'),
  applicationUrl: Yup.string().url('Invalid URL').required('Application URL is required'),
  postedOn: Yup.date().required('Posted On date is required'),
  lastDate: Yup.date().required('Last Date is required'),
  // Add additional validations as needed
});

const EditJobModal = ({ show, handleClose, job, handleSave }) => {
  const [initialValues, setInitialValues] = useState({
    jobTitle: '',
    companyName: '',
    jobCategory: '',
    jobDescription: '',
    jobExperience: '',
    jobQualification: '',
    jobRole: '',
    jobTags: '',
    jobType: '',
    salary: '',
    phone: '',
    email: '',
    location: '',
    requirements: '',
    responsibilities: '',
    applicationUrl: '',
    postedOn: '',
    lastDate: '',
    // Add other fields as necessary
  });

  useEffect(() => {
    if (job) {
      setInitialValues({
        jobId:job.jobId,
        jobTitle: job.jobTitle || '',
        companyName: job.companyName || '',
        jobCategory: job.jobCategory || '',
        jobDescription: job.jobDescription || '',
        jobExperience: job.jobExperience || '',
        jobQualification: job.jobQualification || '',
        jobRole: job.jobRole || '',
        jobTags: job.jobTags || '',
        jobType: job.jobType || '',
        salary: job.salary || '',
        phone: job.phone || '',
        email: job.email || '',
        location: job.jobCity || '',
        requirements: job.requirements || '',
        responsibilities: job.responsibilities || '',
        applicationUrl: job.applicationUrl || '',
        postedOn: job.postedOn || '',
        lastDate: job.lastDate || '',
        // Add other fields as necessary
      });
    }
  }, [job]);

  const handleFormSubmit = (values) => {
    const updatedValues = {
      ...values,
      postedOn: new Date(values.postedOn).toISOString(),
      lastDate: new Date(values.lastDate).toISOString(),
    };
    console.log("Values",updatedValues)
    handleSave(updatedValues);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      dialogClassName="modal-80w" // Custom class for width
      aria-labelledby="edit-job-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="edit-job-modal">
          <MdEdit className="me-1" /> Edit Job
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          {({ isSubmitting }) => (
            <FormikForm>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="formJobTitle">
                    <Form.Label>Job Title</Form.Label>
                    <Field
                      type="text"
                      name="jobTitle"
                      as={Form.Control}
                      isInvalid={!!ErrorMessage['jobTitle']}
                    />
                    <ErrorMessage name="jobTitle" component="div" className="invalid-feedback" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formCompanyName">
                    <Form.Label>Company Name</Form.Label>
                    <Field
                      type="text"
                      name="companyName"
                      as={Form.Control}
                      isInvalid={!!ErrorMessage['companyName']}
                    />
                    <ErrorMessage name="companyName" component="div" className="invalid-feedback" />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="formJobCategory">
                    <Form.Label>Job Category</Form.Label>
                    <Field
                      as="select"
                      name="jobCategory"
                      className="form-control"
                    >
                      <option value="">Select Category</option>
                      <option value="Technical">Technical</option>
                      <option value="Non-Technical">Non-Technical</option>
                    </Field>
                    <ErrorMessage name="jobCategory" component="div" className="invalid-feedback" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formJobDescription">
                    <Form.Label>Job Description</Form.Label>
                    <Field
                      as="textarea"
                      name="jobDescription"
                      className="form-control"
                    />
                    <ErrorMessage name="jobDescription" component="div" className="invalid-feedback" />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="formJobExperience">
                    <Form.Label>Job Experience</Form.Label>
                    <Field
                      as="select"
                      name="jobExperience"
                      className="form-control"
                    >
                      <option value="">Select Experience</option>
                      <option value="1-2">1-2</option>
                      <option value="3-5">3-5</option>
                      <option value="5+">5+</option>
                    </Field>
                    <ErrorMessage name="jobExperience" component="div" className="invalid-feedback" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formJobQualification">
                    <Form.Label>Job Qualification</Form.Label>
                    <Field
                      type="text"
                      name="jobQualification"
                      as={Form.Control}
                      isInvalid={!!ErrorMessage['jobQualification']}
                    />
                    <ErrorMessage name="jobQualification" component="div" className="invalid-feedback" />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="formJobRole">
                    <Form.Label>Job Role</Form.Label>
                    <Field
                      type="text"
                      name="jobRole"
                      as={Form.Control}
                      isInvalid={!!ErrorMessage['jobRole']}
                    />
                    <ErrorMessage name="jobRole" component="div" className="invalid-feedback" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formJobTags">
                    <Form.Label>Job Tags</Form.Label>
                    <Field
                      type="text"
                      name="jobTags"
                      as={Form.Control}
                    />
                    <ErrorMessage name="jobTags" component="div" className="invalid-feedback" />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="formJobType">
                    <Form.Label>Job Type</Form.Label>
                    <Field
                      as="select"
                      name="jobType"
                      className="form-control"
                    >
                      <option value="">Select Type</option>
                      <option value="Internship">Internship</option>
                      <option value="Contract">Contract</option>
                      <option value="Full Time">Full Time</option>
                    </Field>
                    <ErrorMessage name="jobType" component="div" className="invalid-feedback" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formSalary">
                    <Form.Label>Salary</Form.Label>
                    <Field
                      type="text"
                      name="salary"
                      as={Form.Control}
                      isInvalid={!!ErrorMessage['salary']}
                    />
                    <ErrorMessage name="salary" component="div" className="invalid-feedback" />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="formPhone">
                    <Form.Label>Phone</Form.Label>
                    <Field
                      type="text"
                      name="phone"
                      as={Form.Control}
                      isInvalid={!!ErrorMessage['phone']}
                    />
                    <ErrorMessage name="phone" component="div" className="invalid-feedback" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Field
                      type="email"
                      name="email"
                      as={Form.Control}
                      isInvalid={!!ErrorMessage['email']}
                    />
                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="formLocation">
                    <Form.Label>Location</Form.Label>
                    <Field
                      type="text"
                      name="location"
                      as={Form.Control}
                      isInvalid={!!ErrorMessage['location']}
                    />
                    <ErrorMessage name="location" component="div" className="invalid-feedback" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formRequirements">
                    <Form.Label>Job Requirements</Form.Label>
                    <Field
                      as="textarea"
                      name="requirements"
                      className="form-control"
                    />
                    <ErrorMessage name="requirements" component="div" className="invalid-feedback" />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="formResponsibilities">
                    <Form.Label>Job Responsibilities</Form.Label>
                    <Field
                      as="textarea"
                      name="responsibilities"
                      className="form-control"
                    />
                    <ErrorMessage name="responsibilities" component="div" className="invalid-feedback" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formApplicationUrl">
                    <Form.Label>Application URL</Form.Label>
                    <Field
                      type="url"
                      name="applicationUrl"
                      as={Form.Control}
                      isInvalid={!!ErrorMessage['applicationUrl']}
                    />
                    <ErrorMessage name="applicationUrl" component="div" className="invalid-feedback" />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="formPostedOn">
                    <Form.Label>Posted On</Form.Label>
                    <Field
                      type="date"
                      name="postedOn"
                      as={Form.Control}
                      isInvalid={!!ErrorMessage['postedOn']}
                    />
                    <ErrorMessage name="postedOn" component="div" className="invalid-feedback" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formLastDate">
                    <Form.Label>Last Date</Form.Label>
                    <Field
                      type="date"
                      name="lastDate"
                      as={Form.Control}
                      isInvalid={!!ErrorMessage['lastDate']}
                    />
                    <ErrorMessage name="lastDate" component="div" className="invalid-feedback" />
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                Save Changes
              </Button>
              <Button variant="secondary" onClick={handleClose} className="ms-2">
                Cancel
              </Button>
            </FormikForm>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default EditJobModal;

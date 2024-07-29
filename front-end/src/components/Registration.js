import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, MenuItem, Select, InputLabel, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, InputAdornment } from '@mui/material';
import ramana from '../images/p3.jpeg';
import { toast } from 'react-toastify';
import '../App.css';
import { useNavigate } from 'react-router-dom';

//validation schema using Yup
const validationSchema = Yup.object({
  fullName: Yup.string()
  .required('fullname is required')
  .matches(/^[A-Za-z ]*$/, 'Only alphabets are allowed for this field'),
email: Yup.string()
  .required('Email is required')
  .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/, 'Invalid email format'),
  mobileno: Yup.string()
    .required('Mobile number is required')
    .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits'),
  altmobileno: Yup.string()
    .required('Alternative mobile number is required')
    .matches(/^[0-9]{10}$/, 'Alternative mobile number must be exactly 10 digits'),
  Address: Yup.string().required('Address is required'),
  Batchno: Yup.string().required('Batch number is required'),
  ModeOfInternship: Yup.string().required('This field is required'),
  belongedToVasaviFoundation: Yup.string().required('This field is required'),
  domain: Yup.string().required('Please select your domain'),
});


const Registration = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      mobileno: '',
      altmobileno: '',
      Address: '',
      domain: '',
      Batchno: '',
      ModeOfInternship: '',
      belongedToVasaviFoundation: '',
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm();
      toast.success("Registered successfully!",{
        autoClose: 5000
      });
      navigate('/login');
      sessionStorage.setItem('name', formik.values.fullName);
    },
  });

  return (
    <div className="container d-flex flex-column align-items-center register">
      <h3 className="text-center fw-bold text-secondary mb-4 mt-3">
        <img src={ramana} alt='logo' className='rounded' style={{width:'250px'}}/>
      </h3>
      <form className="w-100 border rounded shadow p-2 " onSubmit={formik.handleSubmit} autoComplete='off'>
        <div className="d-flex flex-column align-items-center">
          <h3 className='fw-semibold text-nowrap'style={{fontFamily:'monospace'}}>Registration Form <i class="fa-solid fa-fingerprint"></i></h3>
          <div className="col-12 col-md-6 mb-3">
            <TextField
              label="Full Name"
              variant="outlined"
              className="w-100"
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
              InputProps={{ className: 'fw-bold' }}
              InputLabelProps={{ className: 'fw-bold text-secondary' }}
              onKeyPress={(e) => {
                const onlyAlpha = /^[A-Za-z ]*$/;
                if (!onlyAlpha.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
          </div>
          <div className="col-12 col-md-6 mb-3">
            <TextField
              label="Email"
              variant="outlined"
              className="w-100"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              InputProps={{ className: 'fw-bold' }}
              InputLabelProps={{ className: 'fw-bold text-secondary' }}
            />
          </div>
          <div className="col-12 col-md-6 mb-3">
            <TextField
              label="Mobile No"
              variant="outlined"
              className="w-100"
              name="mobileno"
              value={formik.values.mobileno}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              error={formik.touched.mobileno && Boolean(formik.errors.mobileno)}
              helperText={formik.touched.mobileno && formik.errors.mobileno}
              inputProps={{ maxLength: 10 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <span className='bg-secondary-subtle rounded p-2'>+91</span>
                  </InputAdornment>
                ),
                className: 'fw-bold'
              }}
              InputLabelProps={{ className: 'fw-bold text-secondary' }}
              onKeyPress={(e) => {
                const isValidInput = /[0-9]/;
                if (!isValidInput.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
          </div>
          <div className="col-12 col-md-6 mb-3">
            <TextField
              label="Alternative Mobile No"
              variant="outlined"
              className="w-100"
              name="altmobileno"
              value={formik.values.altmobileno}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              error={formik.touched.altmobileno && Boolean(formik.errors.altmobileno)}
              helperText={formik.touched.altmobileno && formik.errors.altmobileno}
              inputProps={{ maxLength: 10 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <span className='bg-secondary-subtle rounded p-2'>+91</span>
                  </InputAdornment>
                ),
                className: 'fw-bold'
              }}
              InputLabelProps={{ className: 'fw-bold text-secondary' }}
              onKeyPress={(e) => {
                const isValidInput = /[0-9]/;
                if (!isValidInput.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
          </div>
          <div className="col-12 col-md-6 mb-3">
            <TextField
              label="Address"
              variant="outlined"
              className="w-100"
              name="Address"
              value={formik.values.Address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              error={formik.touched.Address && Boolean(formik.errors.Address)}
              helperText={formik.touched.Address && formik.errors.Address}
              InputProps={{ className: 'fw-bold' }}
              InputLabelProps={{ className: 'fw-bold text-secondary' }}
            />
          </div>
          <div className="col-12 col-md-6 mb-3">
            <TextField
              label="Batch No"
              variant="outlined"
              className="w-100"
              name="Batchno"
              value={formik.values.Batchno}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              error={formik.touched.Batchno && Boolean(formik.errors.Batchno)}
              helperText={formik.touched.Batchno && formik.errors.Batchno}
              InputProps={{ className: 'fw-bold' }}
              InputLabelProps={{ className: 'fw-bold text-secondary' }}
            />
          </div>
          <div className="col-12 col-md-6 mb-3">
            <FormControl component="fieldset" className="w-100" error={formik.touched.ModeOfInternship && Boolean(formik.errors.ModeOfInternship)}>
              <FormLabel component="legend" className="fw-bold text-secondary">Mode of Internship</FormLabel>
              <RadioGroup
                name="ModeOfInternship"
                value={formik.values.ModeOfInternship}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                row
              >
                <FormControlLabel value="Online" control={<Radio />} label="Online" />
                <FormControlLabel value="Offline" control={<Radio />} label="Offline" />
              </RadioGroup>
              {formik.touched.ModeOfInternship && formik.errors.ModeOfInternship && (
                <div className="text-danger">{formik.errors.ModeOfInternship}</div>
              )}
            </FormControl>
          </div>
          <div className="col-12 col-md-6 mb-3">
            <FormControl component="fieldset" className="w-100" error={formik.touched.belongedToVasaviFoundation && Boolean(formik.errors.belongedToVasaviFoundation)}>
              <FormLabel component="legend" className="fw-bold text-secondary">Are you belonged to Vasavi Foundation</FormLabel>
              <RadioGroup
                name="belongedToVasaviFoundation"
                value={formik.values.belongedToVasaviFoundation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                row
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes, I am" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {formik.touched.belongedToVasaviFoundation && formik.errors.belongedToVasaviFoundation && (
                <div className="text-danger">{formik.errors.belongedToVasaviFoundation}</div>
              )}
            </FormControl>
          </div>
          <div className="col-12 col-md-6 mb-3">
            <FormControl variant="outlined" className="w-100" error={formik.touched.domain && Boolean(formik.errors.domain)}>
              <InputLabel className="fw-bold text-secondary">Select your stream</InputLabel>
              <Select
                name="domain"
                value={formik.values.domain}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Select your stream"
                required
              >
                <MenuItem value="full stack java">Full Stack Java</MenuItem>
                <MenuItem value="full stack python">Full Stack Python</MenuItem>
                <MenuItem value="full stack web developer (mern)">Full Stack Web Developer (MERN)</MenuItem>
                <MenuItem value="full stack dotnet">Full Stack .NET</MenuItem>
                <MenuItem value="manual testing">Manual Testing</MenuItem>
                <MenuItem value="data science">Data Science</MenuItem>
                <MenuItem value="others">Others</MenuItem>
              </Select>
              {formik.touched.domain && formik.errors.domain && (
                <div className="text-danger">{formik.errors.domain}</div>
              )}
            </FormControl>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button className="fw-bold px-5 p-2 rounded" type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Registration;

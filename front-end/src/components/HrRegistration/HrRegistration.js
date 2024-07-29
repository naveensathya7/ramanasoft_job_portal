import React, { useState,useEffect,useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, MenuItem, Select, InputLabel, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, InputAdornment, keyframes } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ramana from '../../images/p3.jpeg';
import { toast } from 'react-toastify';
import '../../App.css';
import './HrRegistration.css';
import { useNavigate ,Link} from 'react-router-dom';
import axios from 'axios';
import OtpInput from 'react-otp-input';
import Cookies from 'js-cookie';

// validation schema using Yup
const validationSchema = Yup.object({
  fullName: Yup.string()
    .required('Full name is required')
    .matches(/^[A-Za-z ]*$/, 'Only alphabets are allowed for this field'),
  email: Yup.string()
    .required('Email is required')
    .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/, 'Invalid email format'),
  mobileno: Yup.string()
    .required('Mobile number is required')
    .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits'),
  
});

const HrRegistration = () => {
  const navigate = useNavigate();
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [formData, setFormData] = useState({
    mobileNo: '',
    otp: ['', '', '', '', '','',]
  });
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [isOtpError, setIsOtpError] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [timer, setTimer] = useState(30); 
  const firstOtpInputRef = useRef(null)

  useEffect(() => {
    let interval;
    if (isButtonDisabled) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isButtonDisabled]);

  useEffect(() => {
    if (timer === 0) {
      setIsButtonDisabled(false);
      setTimer(30); // Reset the timer duration (in seconds)
    }
  }, [timer]);

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      mobileno: '',
      
    },
    validationSchema,
    onSubmit: async(values, { resetForm }) => {
      console.log("Hello")
      if (!isEmailVerified) {
        toast.error("Please verify your email before submitting");
        return;
      }
      const{fullName,email,mobileno}=values
      await axios.post("http://localhost:5000/signup-hr",{fullName,email,mobileNo:mobileno})
      .then(response=>{
        console.log("Registration request sent",response)
        toast.success(`Registration request send`, {
          autoClose: 5000
        })
        resetForm();
        setFormData({otp:['','','','','','']})
        setIsEmailVerified(false)
        setIsEmailSent(false)
      })
      .catch(error=>{
        console.error('There was an error registering!', error);
                console.log(error)
                toast.error(`${error.response.data.message}`, {
                  autoClose: 5000
                })
                resetForm()
                setIsEmailVerified(false)
        setIsEmailSent(false)
      })
      
      
      
    },
  });

  const sendOtp = () => {
    const generated = Math.floor(100000 + Math.random() * 900000).toString();
    
    const email=formik.values.email
    const otp=generated
    
    // Simulate sending OTP
    axios.post('http://localhost:5000/send-email', {email,otp})
            .then(response => {
                console.log("Email sent")
                toast.info(`OTP sent to ${formik.values.email}`, {
                  autoClose: 5000
                })
                setGeneratedOtp(generated);
                setIsButtonDisabled(true);
                setIsEmailSent(true)
            })
            .catch(error => {

                console.error('There was an error sending the email!', error);
                console.log(error)
                toast.error(`There was an error sending the email! ${error}`, {
                  autoClose: 5000
                })
            });
   
  };

  const verifyOtp = () => {
    const otp=formData.otp.join('')
    console.log("Generated",generatedOtp,otp)
    if (otp.length < 6) {
      setIsOtpError(true);
      console.log(formData.otp)
      toast.error("Invalid OTP", {
        autoClose: 5000
      });
    }
      
    else if (otp === generatedOtp) {
      console.log(otp,generatedOtp)
      setIsEmailVerified(true);
      setIsOtpError(false);
      toast.success("Email verified successfully", {
        autoClose: 2000
      });
    } else {
      toast.error("Invalid OTP", {
        autoClose: 2000
      });
    }
  };

  const handleResendOtp = () => {
    // Logic to resend OTP
    setIsButtonDisabled(true);
    sendOtp()
  };

  const handleOtpChange = (e, index) => {
    const { value } = e.target;
    const newOtp = [...formData.otp];

    if (/[0-9]/.test(value) || value === '') {
      newOtp[index] = value;
      setFormData({ ...formData, otp: newOtp });
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }

    if (e.key === 'Backspace' && index > 0 && !newOtp[index]) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };


  return (
    <div className="container d-flex flex-column align-items-center register">
      <h3 className="text-center fw-bold text-secondary mb-4 mt-3">
        <img src={ramana} alt='logo' className='rounded' style={{ width: '250px' }} />
      </h3>
      <form className="w-100 border rounded shadow p-2" onSubmit={formik.handleSubmit} autoComplete='off'>
        <div className="d-flex flex-column align-items-center">
          <h3 className='fw-semibold text-nowrap' style={{ fontFamily: 'monospace' }}>HR Registration Form <i className="fa-solid fa-fingerprint"></i></h3>
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
              InputProps={{
                className: 'fw-bold',
                endAdornment: isEmailVerified ? (
                  <InputAdornment position="end">
                    <CheckCircleOutlineIcon style={{ color: 'green' }} />
                  </InputAdornment>
                ) : null,
              }}
              InputLabelProps={{ className: 'fw-bold text-secondary' }}
            />
            {!isEmailVerified && (
              <div>
                {!isEmailSent ?(<button type="button" onClick={sendOtp} className="btn btn-secondary mt-2">Send OTP</button>)
                :(<div className="mt-2">
                 
                 <div className="  d-flex justify-content-between mb-3 w-100">
                {formData.otp.map((digit, index) => (
                  <TextField
                    key={index}
                    id={`otp-${index}`}
                    inputRef={index === 0 ? firstOtpInputRef : null} // Attach the ref to the first input field
                    variant="outlined"
                    className="text-center mx-1 "
                    inputProps={{
                      maxLength: 1,
                      style: { textAlign: 'center', fontWeight: 'bold', width: '0.8rem', height: '0.8rem'},
                    }}
                    value={digit}
                    onChange={(e) => handleOtpChange(e, index)}
                    onFocus={(e) => e.target.select()}
                    onKeyDown={(e) => handleOtpChange(e, index)}
                  />
                ))}
              </div>
                   <div className='d-flex flex-row justify-content-between'>
                    <button onClick={handleResendOtp} disabled={isButtonDisabled} className="btn btn-primary mt-2 resend-otp-button">
                        {isButtonDisabled ? `Resend OTP in ${timer}s` : 'Resend OTP'}
                            </button>

                    <button type="button" onClick={verifyOtp} className="btn btn-primary mt-2">Verify OTP</button>
                   </div>
                  
                </div>)}
              </div>
            )}
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
          
        </div>
        <div className="d-flex flex-column align-items-center">
          <button className="fw-bold px-5 p-2 rounded bg-primary btn text-white" type="submit">Submit</button>
          <p className='mt-3 fw-bold text-secondary'>Already have an account? 
            <Link to='/hr-login' className='text-decoration-none ms-1'>
              <span className='fw-bold text-primary' style={{ cursor: 'pointer' }}>
                Login <i className="fa-solid fa-arrow-right"></i>
              </span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default HrRegistration;

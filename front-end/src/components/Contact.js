import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import ramana from '../images/p3.jpeg';
import contact from '../images/contact.jpg';
import Footer from './Footer';
import '../App.css';
import { toast } from 'react-toastify';

const Contact = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [formData, setFormData] = useState({
    to_name: '',
    from_name: '',
    message: '',
  });
  useEffect(()=>{
    window.scrollTo(0, 0);
 },[]);
 
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_b8w3fbs', 'template_jwxga0b', form.current, 'IbKEkzMWeB4fDNBSj')
      .then(
        () => {
          toast.success('e-mail sent!');
          setFormData({
            to_name: '',
            from_name: '',
            message: '',
          })
        },
        (error) => {
          toast.warning('FAILED...', error.text);
        },
      );
  };

  return (
    <div className='p-1'>
      <section className='header'>
        <div style={{ background: '#013356' }}>
          <ul className='d-flex justify-content-end text-nowrap align-items-center header w-100 text-white p-2 fw-bold' style={{ listStyle: 'none' }}>
            <NavLink to='/about' className='text-decoration-none text-white'>
              <li className='mx-lg-3 navlink'>About RamanaSoft</li>
            </NavLink>
            <NavLink to='/about-staff-hiring' className='text-decoration-none text-white'>
              <li className='mx-lg-3 navlink'>About IT Staffing</li>
            </NavLink>
            <li className='mx-lg-3'>CSR</li>
            <NavLink to='/contact' className='text-decoration-none text-white'>
              <li className='mx-lg-3 navlink'>Contact Us</li>
            </NavLink>
            <li className='mx-lg-3'>
              <i className="fa-brands fa-facebook"></i>
            </li>
            <li className='mx-3'>
              <i className="fa-brands fa-x-twitter"></i>
            </li>
            <li className='mx-3'>
              <i className="fa-brands fa-linkedin"></i>
            </li>
          </ul>
        </div>
      </section>
      <section className='logo-bar'>
        <div className='d-flex justify-content-between align-items-center m-3'>
          {/* Logo on the left */}
          <Link to='/'>
            <img src={ramana} alt="ramanaSoft" className='rounded ramana' width={'250px'} />
          </Link>
          {/* Hamburger icon for small screens */}
          <div className='d-md-none'>
            <button className='btn border text-nowrap' onClick={() => setShowMenu(!showMenu)}>
              <i className={`fas ${showMenu ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
          {/* Buttons */}
          <div className={`d-none d-md-flex ${showMenu ? 'd-none' : 'd-flex'}`}>
            <Link to='/'>
              <button className='btn border text-nowrap text-dark btn-outline-info fw-bold'>I am Looking For A Job</button>
            </Link>
            <Link to='/hire'>
              <button className='btn border text-nowrap text-dark ms-2 btn-outline-info fw-bold'>I am Looking For Candidates</button>
            </Link>
          </div>
        </div>
        {/* Buttons for small screens */}
        <div className={`d-md-none ${showMenu ? 'd-block' : 'd-none'} bg-secondary-subtle rounded mb-2 p-1`}>
          <Link to='/'>
            <button className='btn border-dark text-nowrap btn-outline-info fw-bold mb-2' style={{ color: '#013356' }}>I am Looking For A Job</button>
          </Link>
          <Link to='/hire'>
            <button className='btn border-dark text-nowrap btn-outline-info fw-bold mb-2' style={{ color: '#013356' }}>I am Looking For Candidates</button>
          </Link>
        </div>
      </section>
      <section className='image'>
        <div>
          <img src={contact} alt='contact' className='w-100 contact' style={{ height: '55vh' }} />
        </div>
      </section>
      <section className="branches mt-5">
        <div className="container">
          <h2 className="text-center mb-4" style={{color:'#c80000'}}>Our Branches <i className="fa-solid fa-code-branch fs-4"></i></h2>
          <div className="row mb-5 border rounded p-2 bg">
            <div className="col-md-5 px-5 py-4">
              <h4>RamanaSoft IT-Services</h4>
              <p>
                <strong>Address:</strong><br />
                Aditya Trade Center<br />
                404, fourth floor, <br />
                Ameerpet, Hyderabad<br />
                Telangana, India.
              </p>
              <p>
                <strong>Phone:</strong> 1800-2020-0344<br />
                <strong>Email:</strong> support@ramanasoft.gmail.com
              </p>
            </div>
            <div className="col-md-7">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d238.0516257759557!2d78.44636970361658!3d17.43667573157586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb90cf65909a77%3A0x711aa7f9600e3ad1!2sAditya%20Trade%20Center!5e0!3m2!1sen!2sus!4v1718983589638!5m2!1sen!2sus"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Location 1"
              ></iframe>
            </div>
          </div>
          
          <div className="row border rounded p-2 bg">
            <div className="col-md-5 px-5 py-4">
              <h4>RamanaSoft IT-Consulting Services</h4>
              <p>
                <strong>Address:</strong><br />
                Ayyappa Society<br />
                Plot No.850,Road No.45,<br />
                Madhapur, Hyderabad<br />
                Telangana
              </p>
              <p>
                <strong>Phone:</strong> 1800-2024-0345<br />
                <strong>Email:</strong> support@ramanasoft.gmail.com
              </p>
            </div>
            <div className="col-md-7">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.1753988040136!2d78.39019107501167!3d17.451317083446757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb918aba783f41%3A0xb24cecb6b2120129!2sRamana%20Soft%20-%20IT%20Consulting%20Services!5e0!3m2!1sen!2sus!4v1718983204082!5m2!1sen!2sus"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Location 2"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      <section className='contact-form'>
        <div className='mt-4 text-center'>
          <h2 className='text-center fw-bold' style={{color:'#c80000'}}>Contact Us <i className="fa-solid fa-circle-question"></i></h2>
          <h1 className='fw-bold p-2' style={{fontFamily:'cursive',color:'#013356'}}>For Customer Queries</h1>
          <h4 className='text-secondary mt-2'><i className="fa-solid fa-headset"></i> <a href='callto:1800-2020-0344' className='text-decoration-none text-secondary fw-bold'>1800-2020-0344</a></h4>
          <h4 className='text-secondary mt-2'><i className="fa-solid fa-headset"></i> <a href='callto:1800-2020-0344' className='text-decoration-none text-secondary fw-bold'>1800-2024-0345</a></h4>
          <h1 className='fw-bold p-2' style={{fontFamily:'cursive',color:'#013356'}}>For Support Chat</h1>
          <h4 className='text-secondary mt-2'><i className="fa-solid fa-envelope"></i> <a href='mailto:support@ramanasoft.gmail.com' className='text-decoration-none text-secondary fw-bold'>support@ramanasoft.gmail.com</a></h4>
        </div>
        <div className='d-flex justify-content-center mb-4 mt-3'>
          <div className='p-3 mx-lg-5 mx-1 mt-3 w-50 form border shadow rounded'>
            <h2 className='text-center fw-bold text-info'>Write a Message <i className="fa-solid fa-comment"></i></h2>
            <form ref={form} onSubmit={sendEmail}>
              <div className="mb-3">
                <label htmlFor="to_name" className="form-label fw-bold text-secondary">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="to_name"
                  name="to_name"
                  value={formData.to_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="from_name" className="form-label fw-bold text-secondary">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="from_name"
                  name="from_name"
                  value={formData.from_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label fw-bold text-secondary">Message</label>
                <textarea
                  className="form-control"
                  id="message"
                  name="message"
                  rows="3"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary px-4 fw-bold shadow">Submit <i className="fa-solid fa-paper-plane"></i></button>
            </form>
          </div>
        </div>
      </section>
      <section className='footer'>
        <Footer />
      </section>
      {showBackToTop && (
        <div className="back-to-top" style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '999' }} onClick={scrollToTop}>
          <button className='p-2 rounded btn btn-outline-dark' title='back to top'>
            <i className="fas fa-arrow-up text-warning fs-5"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default Contact;

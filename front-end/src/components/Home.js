import React, { useEffect, useState } from 'react';
import ramana from '../images/p3.jpeg';
import slider1 from '../images/slider1.jpeg';
import slider2 from '../images/slider2.jpeg';
import slider3 from '../images/slider3.jpeg';
import jobsearch from '../images/jobsearch.jpeg';
import avatar1 from '../images/avatar1.jpg'
import avatar2 from '../images/avatar2.avif'
import avatar3 from '../images/avatar3.jpg'
import Footer from './Footer';
import '../App.css';
import { Link, NavLink } from 'react-router-dom';

const Home = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(()=>{
    window.scrollTo(0, 0);
 },[]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
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
  return (
    <div className='container-fluid'>
      <section className='header'>
        <div style={{ background: '#013356' }}>
          <ul className='d-flex justify-content-end text-nowrap align-items-center header w-100 text-white p-2 fw-bold' style={{ listStyle: 'none' }}>
            <NavLink to='/about' className='text-decoration-none  text-white'>
              <li className='mx-lg-3 navlink'>
                About RamanaSoft
              </li>
            </NavLink>
            <NavLink to='/about-staff-hiring' className='text-decoration-none  text-white'>
            <li className='mx-lg-3 navlink'>
              About IT Staffing
            </li>
            </NavLink>
            <li className='mx-lg-3'>
              CSR
            </li>
            <NavLink to='/contact' className='text-decoration-none  text-white'>
              <li className='mx-lg-3 navlink'>
                Contact Us
              </li>
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
            <button className='btn border text-nowrap  btn-info  fw-bold' style={{ color: '#013356' }}>I am Looking For A Job</button>
            <Link to='/hr-login'>
              <button  className='btn border text-nowrap  ms-2 btn-outline-info fw-bold' style={{ color: '#013356' }}>I am Looking For Candidates</button>
            </Link>
          </div>
        </div>
        {/* Buttons for small screens */}
        <div className={`d-md-none ${showMenu ? 'd-block' : 'd-none'} bg-secondary-subtle rounded mb-2 p-1`}>
          <button className='btn border-dark text-nowrap btn-info  fw-bold mb-2' style={{ color: '#013356' }}>I am Looking For A Job</button>
          <Link to='/hr-dashboard'>
            <button className='btn border-dark text-nowrap btn-outline-info fw-bold mb-2' style={{ color: '#013356' }}>I am Looking For Candidates</button>
          </Link>
        </div>
      </section>
      <section className='carousel'>
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={slider1} className="d-block w-100" alt="Slider 1" />
            </div>
            <div className="carousel-item">
              <img src={slider2} className="d-block w-100" alt="Slider 2" />
            </div>
            <div className="carousel-item">
              <img src={slider3} className="d-block w-100" alt="Slider 3" />
            </div>
          </div>
          <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </a>
        </div>
      </section>
      <section className='info'>
        <div className='d-lg-flex align-items-center justify-content-center'>
          <div>
            <img src={jobsearch} alt='seeking for jobs?' className='w-100' />
          </div>
          <div>
            <div>
              <h1 className='text-center fw-semibold' style={{ fontFamily: 'sans-serif', color: '#013356' }}>Looking for a Job?</h1>
              <h4 className='text-center mt-3'>We empower people to realize their potential and build rewarding careers. As India’s Largest IT Staffing & Solutions Company, we can help turn your ambition to reality.</h4>
              <h3 className='text-center text-secondary mt-4' style={{ fontFamily: 'monospace' }}>Your dream IT career. We’ll help you live it.</h3>
              <p className='text-center fw-bold text-secondary'>Register here,to View Job Vacancies.</p>
              <div className='d-flex justify-content-center mt-4'>
                <Link to ='/login'>
                <button className='btn btn-info px-5 rounded shadow fw-bold text-white vacancy'>Continue to Register.</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='testimonial p-lg-4 mt-4 mt-lg-2' style={{ backgroundColor: '#f8f9fa' }}>
        <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="4000">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#testimonialCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Testimonial 1"></button>
            <button type="button" data-bs-target="#testimonialCarousel" data-bs-slide-to="1" aria-label="Testimonial 2"></button>
            <button type="button" data-bs-target="#testimonialCarousel" data-bs-slide-to="2" aria-label="Testimonial 3"></button>
          </div>
          <div className="carousel-inner testmonial">
            <div className="carousel-item active">
              <div className="d-lg-flex align-items-center p-lg-4">
                <img src={avatar2} className="rounded-circle me-lg-4 mx-5 mb-2 mb-lg-0 img-thumbnail shadow" alt="Testimonial 1" />
                <div>
                  <p className='fw-bold text-secondary'>"RamanaSoft has transformed my career. The support and opportunities provided are unmatched. Highly recommend!"</p>
                  <h5 className='text-info client'>- Kumar Yadav |</h5>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="d-lg-flex align-items-center p-lg-4">
                <img src={avatar3} className="rounded-circle me-lg-4 mx-5  mb-2 mb-lg-0 img-thumbnail shadow" alt="Testimonial 2" />
                <div>
                  <p className='fw-bold text-secondary'>"The team at RamanaSoft is very professional and helpful. They guided me through every step of the job search process."</p>
                  <h5 className='text-info client'>- Sree Harsha |</h5>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="d-lg-flex align-items-center p-lg-4">
                <img src={avatar1} className="rounded-circle me-lg-4 mx-5 mb-2 mb-lg-0 img-thumbnail shadow" alt="Testimonial 3" />
                <div>
                  <p className='fw-bold text-secondary'>"I am grateful for the opportunities RamanaSoft has provided. Their dedication to their clients is evident."</p>
                  <h5 className='text-info client'>- Hari Manas |</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='footer'>
        <Footer />
      </section>
      {showBackToTop && (
        <div className="back-to-top" style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '999' }} onClick={scrollToTop}>
          <button className='p-2 rounded  btn btn-outline-dark' title='back to top'>
            <i className="fas fa-arrow-up  text-warning fs-5"></i>
          </button>
        </div>
      )}

    </div>
  );
}

export default Home;

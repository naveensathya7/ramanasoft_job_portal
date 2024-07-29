import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import ramana from '../images/p3.jpeg';
import company from '../images/IT Staffig.jpg';
import '../App.css';

const StaffHire = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div>
      <section className='header'>
        <div style={{ background: '#013356' }}>
          <ul className='d-flex justify-content-end text-nowrap align-items-center header w-100 text-white p-2 fw-bold' style={{ listStyle: 'none' }}>
            <NavLink to='/about' className='text-decoration-none  text-white'>
              <li className='mx-lg-3 navlink'>
                About RamanaSoft
              </li>
            </NavLink>
            <NavLink to='/about-staff-hiring' className='text-decoration-none  text-white'>
              <li className='mx-lg-3'>
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
            <Link to='/'>
              <button className='btn border text-nowrap  btn-outline-info  fw-bold' style={{ color: '#013356' }}>I am Looking For A Job</button>
            </Link>
            <Link to='/hire'>
              <button className='btn border text-nowrap  ms-2 btn-outline-info fw-bold' style={{ color: '#013356' }}>I am Looking For Candidates</button>
            </Link>
          </div>
        </div>
        {/* Buttons for small screens */}
        <div className={`d-md-none ${showMenu ? 'd-block' : 'd-none'} bg-secondary-subtle rounded mb-2 p-1`}>
          <Link to='/'>
            <button className='btn border-dark text-nowrap  fw-bold mb-2' style={{ color: '#013356' }}>I am Looking For A Job</button>
          </Link>
          <Link to='/hire'>
            <button className='btn border-dark text-nowrap fw-bold mb-2' style={{ color: '#013356' }}>I am Looking For Candidates</button>
          </Link>
        </div>
      </section>
      <section>
        <div className='row'>
          <hr></hr>
          <div>
            <h2 className='text-center fw-semibold'style={{ color: '#013356' }}>RamanaSoft IT Staffing</h2>
            <p className='px-5 text-center fw-bold text-secondary'>At Ramanasoft, we recruit top IT talent through diverse channels and a thorough multi-stage interview process. We prioritize technical skills, problem-solving, and cultural fit. Offering competitive compensation and growth opportunities, we aim to build a team that drives innovation and delivers outstanding results for our clients.</p>
          </div>
          <div className='col-5 mx-5 mt-3'>
            <img src={company} alt='IT Staffig' className='w-75 rounded shadow'/>
          </div>
          <div className='col-6 mt-4'>
        
          </div>
        </div>
      </section>
    </div>
  )
}

export default StaffHire

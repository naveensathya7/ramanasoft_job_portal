import React from 'react'
import ramana from '../images/p3.jpeg'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
      <div className='footer p-2 mt-2' style={{background:'#013356'}}>
        <div className='d-lg-flex justify-content-around align-items-center text-white'>
            <ul style={{listStyle:'none'}}>
                <li><Link to='/'><img src={ramana} alt='logo'style={{width:'200px',cursor:'pointer'}} className='rounded mb-2'/></Link></li>
                <li className='text-secondary fw-bold'>RamanaSoft IT Services</li>
                <li>Aditya Trade Center, </li>
                <li>Ameerpet,Hyderabad,</li>
                <li>Telangana, 500073.</li>
            </ul>
            <ul style={{listStyle:'none'}}>
              
                <li className='fw-bold'><Link to='/' className='text-decoration-none text-white'>I am looking for a Job</Link></li>
                <li>Job Vacancies</li>
                <li className='fw-bold'><Link to='/hire' className='text-decoration-none text-white'>I am looking for candidates</Link></li>
                <li>Case Studies</li>
                <li>About Us</li>
                <li>About Search & Recruitment</li>
            </ul>
            <ul style={{listStyle:'none'}}>
                <li className='fw-bold'><Link to='/about-staff-hiring' className='text-decoration-none text-white'>Staffing Services</Link></li>
                <li>Managed Solutions</li>
                <li>Managed Services Provider</li>
                <li>Disclaimer</li>
                <li>Privacy Policy</li>
                <li>Privacy Statement</li>
            </ul>
            <ul style={{listStyle:'none'}}>
                <li className='fw-bold'>RamanaSoft Services</li>
                <li>Workforce Management</li>
                <li>Operating Asset Management</li>
                <li>Global Technology Solutions</li>
                <li>Product Led Businesses</li>
            </ul>
        </div>
            <p className='text-center text-secondary fw-semibold'>©2024 RamanaSoft. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer

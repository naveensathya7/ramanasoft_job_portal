import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import { TextField, MenuItem } from '@mui/material';
import ramana from '../images/p3.jpeg';
import slider1 from '../images/slider1.jpeg';
import slider2 from '../images/slider2.jpeg';
import slider3 from '../images/slider3.jpeg';
import py from '../images/python.png';
import java from '../images/java.png';
import react from '../images/atom.png';
import dotnet from '../images/software.png';
import QA from '../images/testing.png';
import cloud from '../images/cloud.png';
import Footer from './Footer';
import HR1 from '../images/HR1.avif';
import HR2 from '../images/HR2.avif';
import HR3 from '../images/HR3.avif';
import HR4 from '../images/HR4.avif';
import HR5 from '../images/H5.jpg';
import HR6 from '../images/HR6.jpg'
import { toast } from 'react-toastify';
import '../App.css';
import axios from 'axios';

const Hire = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedDomain, setSelectedDomain] = useState('');
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        experience: '',
        domain: ''
    });
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


    const handleShowModal = (domain) => {
        setSelectedDomain(domain);
        setFormData((prevFormData) => ({
            ...prevFormData,
            domain: domain
        }));
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            const response = await axios.post('http://localhost:3001/submitForm', formData);
            console.log("Server response:", response.data);
            if(response.status===200){
                handleCloseModal();
                setFormData({
                    name:'',
                    email: '',
                    experience:'',
                    domain:''
                })
                toast.success(response.data); 
            }
        }catch(error){
            toast.error("something went wrong");
            console.log("submit error"+error.message);
        } 
    };



    return (
        <div className='container-fluid p-2'>
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
                        <Link to='/'>
                            <button className='btn border text-nowrap  btn-outline-info  fw-bold' style={{ color: '#013356' }}>I am Looking For A Job</button>
                        </Link>
                        <button className='btn border text-nowrap  ms-2 btn-info fw-bold' style={{ color: '#013356' }}>I am Looking For Candidates</button>
                    </div>
                </div>
                {/* Buttons for small screens */}
                <div className={`d-md-none ${showMenu ? 'd-block' : 'd-none'} bg-secondary-subtle rounded mb-2 p-1`}>
                    <Link to='/'>
                        <button className='btn border-dark text-nowrap btn-info-outline  fw-bold mb-2' style={{ color: '#013356' }}>I am Looking For A Job</button>
                    </Link>
                    <button className='btn border-dark text-nowrap btn-info fw-bold mb-2' style={{ color: '#013356' }}>I am Looking For Candidates</button>
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
            <section className='domains'>
                <h2 className='mt-5 text-center fw-bold' style={{ color: '#013356' }}>Talent acquisition across multiple Domain's</h2>
                <p className='text-center fw-bold px-md-5 px-2 text-secondary mt-3'>Empowering the Future of Technology with Talent. Connecting top-tier developers in Python, Java, MERN, Dotnet, QA, Cloud, and more, with opportunities that shape the industry. Submit your application today, and let our dedicated HR team guide you to your next career milestone.</p>
                <div className='container mt-5'>
                    <div className='row'>
                        <div className='col-lg-4 col-md-6 mb-4'>
                            <div className="p-4 domain shadow border rounded h-100" onClick={() => handleShowModal('Python')}>
                                <h2 className='text-center fw-bold'>Python <img src={py} className='w-25' alt='python developer' /></h2>
                                <h3 className='text-center text-secondary'>Full Stack Development</h3>
                            </div>
                        </div>
                        <div className='col-lg-4 col-md-6 mb-4'>
                            <div className="p-4 domain shadow border rounded h-100" onClick={() => handleShowModal('Java')}>
                                <h2 className='text-center fw-bold'>Java <img src={java} className='w-25' alt='java developer' /></h2>
                                <h3 className='text-center text-secondary'>Full Stack Development</h3>
                            </div>
                        </div>
                        <div className='col-lg-4 col-md-6 mb-4'>
                            <div className="p-4 domain shadow border rounded h-100" onClick={() => handleShowModal('MERN')}>
                                <h2 className='text-center fw-bold'>MERN <img src={react} className='w-25' alt='mern developer' /></h2>
                                <h3 className='text-center text-secondary'>Full Stack Development</h3>
                            </div>
                        </div>
                        <div className='col-lg-4 col-md-6 mb-4'>
                            <div className="p-4 domain shadow border rounded h-100" onClick={() => handleShowModal('Dotnet')}>
                                <h2 className='text-center fw-bold'>Dotnet <img src={dotnet} className='w-25' alt='dotnet developer' /></h2>
                                <h3 className='text-center text-secondary'>Full Stack Development</h3>
                            </div>
                        </div>
                        <div className='col-lg-4 col-md-6 mb-4'>
                            <div className="p-4 domain shadow border rounded h-100" onClick={() => handleShowModal('QA')}>
                                <h2 className='text-center fw-bold'>QA <img src={QA} className='w-25' alt='QA Tester' /></h2>
                                <h3 className='text-center text-secondary'>Testing</h3>
                            </div>
                        </div>
                        <div className='col-lg-4 col-md-6 mb-4'>
                            <div className="p-4 domain shadow border rounded h-100" onClick={() => handleShowModal('Devops')}>
                                <h2 className='text-center fw-bold'>Devops <img src={cloud} className='w-25' alt='QA Tester' /></h2>
                                <h3 className='text-center text-secondary'>Cloud Engineer's</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='hr'>
                <div>
                    <h2 className='text-center fw-bold mt-3' style={{ color: '#013356' }}>Connect with our HR specialists for top IT talent.</h2>
                    <p className='text-center fw-semibold text-secondary'>Receive expert assistance anytime with our reliable 24/7 support services.</p>
                    <div className='d-flex flex-wrap justify-content-center mt-4'>
                        <div className="card p-2 mb-3" style={{ maxWidth: '540px' }}>
                            <div className="row g-0">
                                <div className="col-md-4 d-flex justify-content-center">
                                    <img src={HR1} className="img-fluid rounded" alt="python HR" />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h3 className='text-center fw-bold text-secondary'>Python</h3>
                                        <h5 className="card-title">Shaik Abdullah</h5>
                                        <h4 className="card-text text-nowrap"><i className="fa-solid fa-phone text-primary"></i> +91 7756546454</h4>
                                        <h4 className="card-text text-nowrap"><i className="fa-solid fa-envelope text-secondary"></i> <a href='mailto:shaikadbullah@gmail.com' className='text-decoration-none text-dark mail'>shaikadbullah@gmail.com</a></h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card p-2 mb-3 ms-2" style={{ maxWidth: '540px' }}>
                            <div className="row g-0">
                                <div className="col-md-4 d-flex justify-content-center">
                                    <img src={HR4} className="img-fluid rounded" alt="python HR" />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h3 className='text-center fw-bold text-secondary'>Java</h3>
                                        <h5 className="card-title">Jessy Pinkman</h5>
                                        <h4 className="card-text text-nowrap"><i className="fa-solid fa-phone text-primary"></i> +91 9565664356</h4>
                                        <h4 className="card-text text-nowrap"><i className="fa-solid fa-envelope text-secondary"></i> <a href='mailto:jessypinkman@gmail.com' className='text-decoration-none text-dark mail'>jessypinkman@gmail.com</a></h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card p-2 mb-3" style={{ maxWidth: '540px' }}>
                            <div className="row g-0">
                                <div className="col-md-4 d-flex justify-content-center">
                                    <img src={HR3} className="img-fluid rounded" alt="python HR" />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h3 className='text-center fw-bold text-secondary'>MERN</h3>
                                        <h5 className="card-title">Mallikarjun</h5>
                                        <h4 className="card-text text-nowrap"><i className="fa-solid fa-phone text-primary"></i> +91 7895889549</h4>
                                        <h4 className="card-text text-nowrap"><i className="fa-solid fa-envelope text-secondary"></i> <a href='mailto:mallik.fasthr@gmail.com' className='text-decoration-none text-dark mail'>mallik.fasthr@gmail.com</a></h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card p-2 mb-3 ms-2" style={{ maxWidth: '540px' }}>
                            <div className="row g-0">
                                <div className="col-md-4 d-flex justify-content-center">
                                    <img src={HR2} className="img-fluid rounded" alt="python HR" />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h3 className='text-center fw-bold text-secondary'>Dotnet</h3>
                                        <h5 className="card-title">Anitha Raj</h5>
                                        <h4 className="card-text text-nowrap"><i className="fa-solid fa-phone text-primary"></i> +91 8788778899</h4>
                                        <h4 className="card-text text-nowrap"><i className="fa-solid fa-envelope text-secondary"></i> <a href='mailto:anitharaj.hr@gmail.com' className='text-decoration-none text-dark mail'>anitharaj.hr@gmail.com</a></h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card p-3 mb-3" style={{ maxWidth: '540px' }}>
                            <div className="row g-0">
                                <div className="col-md-4 d-flex justify-content-center">
                                    <img src={HR5} className="img-fluid rounded" alt="python HR" />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h3 className='text-center fw-bold text-secondary'>QA Testing</h3>
                                        <h5 className="card-title">Vasath Raju</h5>
                                        <h4 className="card-text text-nowrap"><i className="fa-solid fa-phone text-primary"></i> +91 8897734688</h4>
                                        <h4 className="card-text text-nowrap"><i className="fa-solid fa-envelope text-secondary"></i> <a href='mailto:vasanth95@gmail.com' className='text-decoration-none text-dark mail'>vasanthraju95@gmail.com</a></h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card p-3 mb-3 ms-2" style={{ maxWidth: '540px' }}>
                            <div className="row g-0">
                                <div className="col-md-4 d-flex justify-content-center">
                                    <img src={HR6} className="img-fluid rounded" alt="python HR" />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h3 className='text-center fw-bold text-secondary'>Devops</h3>
                                        <h5 className="card-title">Satya Dev</h5>
                                        <h4 className="card-text text-nowrap"><i className="fa-solid fa-phone text-primary"></i> +91 8997678897</h4>
                                        <h4 className="card-text text-nowrap"><i className="fa-solid fa-envelope text-secondary"></i> <a href='mailto:satyadev225@gmail.com' className='text-decoration-none text-dark mail'>satyadev225@gmail.com</a></h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />

            {/* Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title><img src={ramana} alt='logo' className='rounded' style={{ width: '200px' }} /></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Modal.Title className='text-center' style={{ color: '#c80000',fontFamily:'monospace' }}>Hire Staff From {selectedDomain}</Modal.Title>
                    <Form onSubmit={handleSubmit}>
                        <TextField
                            label="Name/Company"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            InputProps={{ className: 'fw-bold' }}
                            InputLabelProps={{ className: 'fw-bold text-secondary' }}
                            onKeyPress={(e) => {
                                // Prevent input if the key pressed is not a Alpha
                                const onlyAlpha = /[A-Za-z ]/;
                                if (!onlyAlpha.test(e.key)) {
                                  e.preventDefault();
                                }
                              }}
                            
                        />
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            InputProps={{ className: 'fw-bold' }}
                            InputLabelProps={{ className: 'fw-bold text-secondary' }}
                        />
                        <TextField
                            select
                            label="Experience (years)"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            className='fw-bold'
                            required
                            InputProps={{ className: 'fw-bold' }}
                            InputLabelProps={{ className: 'fw-bold text-secondary' }}
                        >
                            <MenuItem value="fresher">Fresher</MenuItem>
                            <MenuItem value="1Yr">1 Year</MenuItem>
                            <MenuItem value="2Yrs">2 Years</MenuItem>
                            <MenuItem value="3Yrs">3 Years</MenuItem>
                            <MenuItem value="4Yrs">4 Years</MenuItem>
                            <MenuItem value="5Yrs+">5 Years+</MenuItem>
                        </TextField>
                        <TextField
                            label="Domain"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="domain"
                            value={formData.domain}
                            onChange={handleChange}
                            required
                            disabled
                            InputProps={{ className: 'fw-bold' }}
                            InputLabelProps={{ className: 'fw-bold text-secondary' }}
                        >
                        </TextField>
                        <Button variant="info" type="submit" className="w-100 fw-bold text-white fs-5" >Submit <i class="fa-solid fa-paper-plane"></i></Button>
                    </Form>
                </Modal.Body>
            </Modal>
            {showBackToTop && (
                <div className="back-to-top" style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '999' }} onClick={scrollToTop}>
                    <button className='p-2 rounded  btn btn-outline-dark' title='back to top'>
                        <i className="fas fa-arrow-up  text-warning fs-5"></i>
                    </button>
                </div>
            )}
        </div>
    );
};

export default Hire;

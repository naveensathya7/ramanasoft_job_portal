
import { Navbar, Nav, Container,Dropdown } from 'react-bootstrap';
import {Link,useNavigate,} from 'react-router-dom';
import Cookies from 'js-cookie';
import ramana from '../../images/p3.jpeg';
//import './HrNavbar.css'

const HrNavbar=()=>{
    const navigate=useNavigate()
    const getUserInitials = (hr) => {
        console.log(hr)
        const initials = hr.split(' ').map((n) => n[0]).join('');
        console.log(initials)
        return initials.toUpperCase();
      };
      const logout=()=>{
            sessionStorage.removeItem('user')
            navigate("/hr-login")

      }

    return(  
        <Navbar bg="#B3C8CF" expand="lg" style={{width:'100%',justifyContent:'center',paddingLeft:'0px',backgroundColor:'#526D82',color:'white',zIndex:1}}>
          <Container  style={{width: '100vw'}}>
            <Link to="/hr-dashboard"><Navbar.Brand href="#home">
              <img
                src={ramana}
                width="150"
                className="d-inline-block align-top rounded"
                alt="Left Logo"
              />
            </Navbar.Brand></Link>
            
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" style={{width: '100vw',color:'white'}} >
              <Nav className="ms-auto">
              <Nav.Item style={{width:'100px',textDecoration:'none'}} className="nav-link fw-bold me-4 ">
    <Link to="/about"  style={{textDecoration:'none',color:'white'}} >About</Link>
  </Nav.Item >
  
  <Dropdown as={Nav.Item} className="fw-bold me-4 h-25">
            <Dropdown.Toggle as={Nav.Link} style={{ color: 'white', textDecoration: 'none' }}>
              Post a Job
            </Dropdown.Toggle>
            <Dropdown.Menu className='h-25  custom-dropdown-menu' >
              <Dropdown.Item as={Link} to="/hr-dashboard/post-jobs">Post Job</Dropdown.Item>
              <Dropdown.Item as={Link} to="/hr-dashboard/view-jobs">View Jobs</Dropdown.Item>
              <Dropdown.Item as={Link} to="/hr-dashboard/past-jobs">Past Jobs</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
                <Nav.Item style={{width:'120px',textDecoration:'none',textAlign:'center'}} className="nav-link fw-bold me-4 ">
    <Link to="/hr-dashboard/registration-requests"  style={{textDecoration:'none',color:'white'}} >Registrations</Link>
  </Nav.Item >
  <Nav.Item style={{width:'100px',textDecoration:'none',textAlign:'center'}} className="nav-link fw-bold me-4 ">
    <Link to="/hr-dashboard/profile"  style={{textDecoration:'none',color:'white'}} >Profile</Link>
  </Nav.Item >
  <Nav.Item  style={{width:'100px',textDecoration:'none',color:'white',marginLeft:0,textAlign:'center'}} className="nav-link fw-bold me-4 pt-1 ml-0 d-flex justify-content-center">
   <button onClick={logout} className='btn bg-transparent logout-btn fw-bold ml-5 w-100 pt-0' style={{color:'white',alignSelf:'center',width:'100%'}}> Logout</button> 
  </Nav.Item >
              </Nav>
              <Nav>
                <div className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center fw-bold" style={{ width: '50px', height: '50px' }}>
                  {getUserInitials(sessionStorage.getItem('user')||'Guest')}
                </div>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    
)}

export default HrNavbar
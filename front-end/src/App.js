import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Hire from './components/Hire';
import StaffHire from './components/StaffHire';
import Registration from './components/Registration';
import RegistrationRequests  from './components/RegistrationRequests/RegistrationRequests';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import DashBoard from './components/DashBoard';
import HrDashBoard from './components/HrDashboard';
import HrRegistration from './components/HrRegistration/HrRegistration';
import HrLogin from './components/HrLogin';
import PostJobs from './components/HrPostJobs/HrPostJobs';
import HrRegistrationRequests from './components/HrRegistrationRequests/HrRegistrationRequests';
import HrProfile from './components/HrProfile';
import 'bootstrap/dist/css/bootstrap.min.css';
import HrViewJobs from './components/HrViewJobs/HrViewJobs';
import HrPastJobs from './components/HrPastJobs/HrPastJobs';
import StudentsApplied from './components/StudentsApplied';
import StudentsQualified from './components/StudentsQualified'
import StudentsPlaced from './components/StudentsPlaced';
import StudentsNotPlaced from './components/StudentsNotPlaced'

const hrDetails = {
  companyName: 'Ramanasoft',
  email: 'naveensathya.vanamoju@gmail.com',
  phone: '09515982621',
  jobTitle: 'Associate Software Engineer',
  // Add more details as needed
};


function App() {
  return (
    <div className=''>
       <BrowserRouter>
       <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/hire' element={<Hire/>}/>
        <Route path='/about-staff-hiring' element={<StaffHire/>}/>
        <Route path='/registration' element={<Registration/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<DashBoard/>}/>
        <Route path='/hr-dashboard' element={<HrDashBoard/>}/>
        <Route path='/hr-registration' element={<HrRegistration/>}/>
        <Route path='/hr-login' element={<HrLogin/>}/>
        <Route path="/hr-dashboard/registration-requests" element={<RegistrationRequests/>}/>
        <Route path="/hr-dashboard/post-jobs" element={<PostJobs/>}/>
        <Route path="/hr-dashboard/past-jobs" element={<HrPastJobs/>}/>
        <Route path="/hr-dashboard/view-jobs" element={<HrViewJobs/>}/>
        <Route path="/superadmin-dashboard/hr-requests" element={<HrRegistrationRequests/>}/>
        <Route path="/hr-dashboard/profile" element={<HrProfile hrDetails={hrDetails}/>}/>
        <Route path="/hr-dashboard/students-applied" element={<StudentsApplied/>} />
        <Route path="/hr-dashboard/students-qualified" element={<StudentsQualified/>} />
        <Route path="/hr-dashboard/students-placed" element={<StudentsPlaced/>} />
       <Route path="/hr-dashboard/students-not-placed" element={<StudentsNotPlaced/>} />
        {/*<Route path="/hr-dashboard/hr-leads" element={<HrLeads/>} />
        <Route path="/hr-dashboard/hr-confirmed-leads" element={<HrConfirmedLeads/>} />
        <Route path="/hr-dashboard/recruiters" element={<Recruiters/>} />
        <Route path="/hr-dashboard/not-interested-hrs" element={<NotInterestedHrs/>} />*/}
       </Routes>
       
       </BrowserRouter>
       <ToastContainer autoClose={5000}/>
    </div>
  );
}

export default App;

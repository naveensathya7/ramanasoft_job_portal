import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { IoPersonAddSharp } from "react-icons/io5";
import { FaChevronCircleRight, FaCheck, FaTimes, FaUserTie } from "react-icons/fa";
import HrNavbar from './HrNavbar/HrNavbar';
import axios from 'axios';
import './HrDashboard.css';

const HrPortal = () => {
  const [statistics, setStatistics] = useState([
    { title: 'Total Students Applied', value: 0, link: '/hr-dashboard/students-applied', color: '#37a6b8', element: IoPersonAddSharp },
    { title: 'Total Students Qualified', value: 0, link: '/hr-dashboard/students-qualified', color: '#e8c93f', element: FaCheck },
    { title: 'Total Students Placed', value: 0, link: '/hr-dashboard/students-placed', color: '#21bf40', element: FaUserTie },
    { title: 'Total Students Not Placed', value: 0, link: '/hr-dashboard/students-not-placed', color: '#f73643', element: FaTimes },
    { title: 'Total HR Leads', value: 0, link: '/hr-dashboard/hr-leads', color: '#838485', element: IoPersonAddSharp },
    { title: 'HR Confirmed Leads', value: 0, link: '/hr-dashboard/hr-confirmed-leads', color: '#21bf40', element: FaCheck },
    { title: 'Recruiters', value: 0, link: '/hr-dashboard/recruiters', color: '#3377f5', element: FaUserTie },
    { title: 'Not Interested HRs', value: 0, link: '/hr-dashboard/not-interested-hrs', color: '#49494a', element: FaTimes }
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const [
          { data: applied },
          { data: qualified },
          { data: placed },
          { data: notPlaced },
          { data: hrLeads },
          { data: confirmedLeads },
          { data: recruiters },
          { data: notInterestedHrs }
        ] = await Promise.all([
          axios.get('http://localhost:5000/statistics/applied'),
          axios.get('http://localhost:5000/statistics/Qualified'),
          axios.get('http://localhost:5000/statistics/Placed'),
          axios.get('http://localhost:5000/statistics/Not%20Qualified'),
          axios.get('http://localhost:5000/statistics/hr-leads'),
          axios.get('http://localhost:5000/statistics/hr-confirmed-leads'),
          axios.get('http://localhost:5000/statistics/recruiters'),
          axios.get('http://localhost:5000/statistics/not-interested-hrs')
        ]);

        setStatistics(prevStats => prevStats.map(stat => {
          switch (stat.title) {
            case 'Total Students Applied':
              return { ...stat, value: applied.count };
            case 'Total Students Qualified':
              return { ...stat, value: qualified.count };
            case 'Total Students Placed':
              return { ...stat, value: placed.count };
            case 'Total Students Not Placed':
              return { ...stat, value: notPlaced.count };
            case 'Total HR Leads':
              return { ...stat, value: hrLeads.count };
            case 'HR Confirmed Leads':
              return { ...stat, value: confirmedLeads.count };
            case 'Recruiters':
              return { ...stat, value: recruiters.count };
            case 'Not Interested HRs':
              return { ...stat, value: notInterestedHrs.count };
            default:
              return stat;
          }
        }));
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStatistics();
  }, [navigate]);

  const handleMoreInfo = (link) => {
    navigate(link);
  };

  return (
    <div style={{ backgroundColor: '#dfe1e6', zIndex: 2, height: '100vh' }}>
      <HrNavbar />
      <Container fluid className="my-4">
        <h2 className="mb-4" style={{ fontFamily: 'Roboto' }}>HR Panel</h2>
        <Row>
          {statistics.map((stat, index) => (
            <Col key={index} md={6} lg={3} className="mb-4 pb-0" style={{ borderRadius: '10px' }}>
              <Card className="pb-0 mb-0" style={{ backgroundColor: `${stat.color}`, border: 'none', borderRadius: '5px' }}>
                <div className='d-flex flex-row justify-content-between mt-2 mb-3 '>
                  <div>
                    <Card.Title style={{ fontSize: '30px', color: '#ffffff', fontWeight: 'bold', marginLeft: '10px' }}>{stat.value}</Card.Title>
                    <Card.Text style={{ color: '#ffffff', marginLeft: '10px' }}>
                      {stat.title}
                    </Card.Text>
                  </div>
                  {React.createElement(stat.element, {
                    key: index,
                    style: { alignSelf: 'center', color: '#000000', opacity: '0.2', marginRight: '15px' },
                    size: 40
                  })}
                </div>
                <Button className='mb-0 w-100 ' style={{ backgroundColor: '#000000', border: "none", borderRadius: '0px 0px 5px 5px', opacity: '0.3' }} onClick={() => handleMoreInfo(stat.link)}>More Info <FaChevronCircleRight className='mb-1' size={20} /></Button>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default HrPortal;

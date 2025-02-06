import React, { useState, useEffect } from 'react';
import { Nav, Navbar, Container,NavDropdown } from "react-bootstrap";
import { Toaster, toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import '../style_folder/Navbar.css';
import axios from 'axios';

function NavbarComponent() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [courseNames, setCourseNames] = useState([]);
  const [loading , setLoading] = useState(false);
  const [error , setError] = useState(false);

  useEffect(() => {
    const fetchCourseNames = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await axios.get('http://127.0.0.1:5000/add_language/add_course');
        if (response.data && Array.isArray(response.data)) {
          setCourseNames(response.data.map((course) => course.language_name)); // Extract course names
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
        console.error('Error fetching course names:', error);
        toast.error('Failed to fetch course names');
      }
    };

    // function call 
    fetchCourseNames();  
     const handleScroll = () => {
       setIsScrolled(window.scrollY > 50); // Change background after 50px scroll
     };
     window.addEventListener('scroll', handleScroll);
     return () => {
       window.removeEventListener('scroll', handleScroll);
     };
  }, []);

   // **Handle different states**
   if (loading) {
    return <div className="alert alert-info text-center mt-5">Loading Navbar... ⏳</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center mt-5">❌ Error fetching Navbar. Please try again later.</div>;
  }
  return (
    <> 
    <Toaster />
    <Navbar
  expand="lg"
  className={`navbar-custom ${isScrolled ? 'scrolled' : ''}`}
  fixed="top">
  <Container>
    <Link to="/" className="navbar-brand me-5">
      <b>Beginner friendly</b>
    </Link>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="me-2">
  {courseNames.length > 0 ? (
    courseNames.map((name, index) => (
      <Link
        key={index}
        to={`/${name.toLowerCase()}`}
        className="nav-link"
        style={{
          marginRight: index === 0 ? '0px' : index === 1 ? '0px' : '0px',
        }}>
        {name}
      </Link>
    ))
  ) : (
  <span className="nav-link disabled"><h4 className="text-danger">No Course Available</h4></span>
  )}
        <NavDropdown title="More" id="basic-nav-dropdown">
          <Link to="/question_content" className="dropdown-item">Exam</Link>
          <Link to="#" className="dropdown-item">Calculator</Link>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <Nav className="ms-auto">
        <Nav.Link href="#" >Logout</Nav.Link>
        <Link to={"/admin"}>
          <FontAwesomeIcon icon={faUser} size="2x" color="#2c3e50" style={{ cursor: 'pointer', marginLeft: '10px' }}/>
        </Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
    </>
  );
}

export default NavbarComponent;

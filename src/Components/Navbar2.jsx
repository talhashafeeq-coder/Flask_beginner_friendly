import { useState } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../style_folder/Navbar.css';



export default function Navbar2() {
    const [showModal, setShowModal] = useState(false);
  
    // Toggle the modal visibility
    const toggleModal = () => {
      setShowModal(!showModal);
    };
  
  return (
    <> 
    <Navbar className="navbar-custom" expand="lg" sticky="top" variant="dark" 
    style={{
      background: "linear-gradient(to right, #ffd89b, #19547b)", // Gradient value as a string
      boxShadow: "0 0 10px rgba(0,0,0,0.4)",
    }}>
      <Container>
        <Navbar.Brand as={Link} to="/">Admin Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/addcourse" className="btn text-white" onClick={toggleModal}>
              Add New Course
            </Nav.Link>
            <Nav.Link as={Link} className="btn text-white" onClick={toggleModal} to="/exam_content">Exam Question Add</Nav.Link>
            <Nav.Link as={Link} className="btn text-white" onClick={toggleModal} to="/question_content_add">Add Question</Nav.Link>
            <Nav.Link as={Link} className="btn text-white" to={"/content_course"} onClick={toggleModal} >Add Content of Course</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

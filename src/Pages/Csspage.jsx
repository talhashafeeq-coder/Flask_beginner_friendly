import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style_folder/sidemenu_html.css';// import style file
import { Link } from 'react-router-dom';
import useScrollToSection from '../Hooks/ScrollToSection';


const csspage = () => {
  const [tutorials, setTutorials] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false); 
    const {scrollToSection} = useScrollToSection()

  useEffect(() => {
    const fetchCourseContent = async () => {
      try {
        setError(false);
        setLoading(false)
        const response = await axios.get('http://127.0.0.1:5000/add_content/course_content');
        if (Array.isArray(response.data)) {
          setTutorials(response.data);
        }
      } catch (error) {
        setError(true)
        setLoading(true)
        console.error('Error fetching course content:', error.message);
      } finally {
        setLoading(false)
      }
    };

    fetchCourseContent();
  }, []);
  // Filter tutorials to show only CSS courses
  const cssTutorials = tutorials.filter(tutorial =>
    tutorial.course_name && tutorial.course_name.trim().toLowerCase().includes('css')
  );
  // **Handle different states**
  if (loading) {
    return <div className="alert alert-info text-center mt-5">Loading tutorials... ⏳</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center mt-5">❌ Error fetching tutorials. Please try again later.</div>;
  }
  
  if (cssTutorials.length === 0) {
    return <div className="alert alert-info text-center mt-5">🚀 No CSS tutorials available at the moment.</div>;
  }
  return (
    <>
      <div className='container'>
        <div className="row">
          {/* Sidebar with Course Names */}
          <div className="col-sm-4 side-menu">
            <h2 style={{ padding: "10px", fontFamily: "cursive", color: "rebeccapurple" }}>CSS Course Topics</h2>
            <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
              {cssTutorials.map((tutorial) => (
                <li key={tutorial.id} style={{ padding: "5px 0" }}>
                  <button onClick={() => scrollToSection(tutorial.id)} style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer', textAlign: 'left', padding: 0 }}>
                    {tutorial.course_name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Main Content */}
          <div className="col-sm-8 offset-sm-4">
            <h1 style={{ padding: "20px", fontFamily: "cursive" }}>CSS  Tutorials</h1>
            <br />
            <button type="button" className="btn btn-lg btn-info" style={{ borderRadius: "20px" }}>
              <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                Home
              </Link>
            </button>
            {/* Render Css Tutorials Only */}
            <div>
              {cssTutorials.map((tutorial) => (
                <div key={tutorial.id} id={`tutorial-${tutorial.id}`} style={{ marginBottom: '20px' }}>
                  <h2 style={{ color: "rebeccapurple", padding: "10px", borderTop: "1px solid", borderBottom: "1px solid" }}>{tutorial.course_name}</h2>
                  <div style={{ padding: "10px" }} dangerouslySetInnerHTML={{ __html: tutorial.content }} />
                  {/* <h2 style={{ color: "rebeccapurple", padding: "10px" }}>Example</h2>
                  <div style={{ backgroundColor: "lightcyan" }} dangerouslySetInnerHTML={{ __html: tutorial.example }}></div> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default csspage;

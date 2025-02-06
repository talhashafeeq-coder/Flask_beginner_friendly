import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style_folder/sidemenu_html.css'; // Style file
import useScrollToSection from '../Hooks/ScrollToSection';
import { Link } from 'react-router-dom';

const HtmlPage = () => {
  const [tutorials, setTutorials] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false); 
  const {scrollToSection} = useScrollToSection()

  useEffect(() => {
    const getTutorials = async () => {
      try {
        setError(false);
        setLoading(true);
        console.log('Fetching tutorials...');
        const response = await axios.get('http://127.0.0.1:5000/add_content/course_content');
        
        if (response.data.length === 0) {
          console.warn("No tutorials found.");
        }

        setTutorials(response.data);
      } catch (error) {
        setError(true);
        console.error('Error fetching tutorials:', error);
      } finally {
        setLoading(false);
      }
    };

    getTutorials();
  }, []);

  // Filter tutorials to show only HTML courses
  const htmlTutorials = tutorials.filter(tutorial =>
    tutorial.course_name && tutorial.course_name.trim().toLowerCase().includes('html')
  );

  // **Handle different states**
  if (loading) {
    return <div className="alert alert-info text-center mt-5">Loading tutorials... ⏳</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center mt-5">❌ Error fetching tutorials. Please try again later.</div>;
  }

  if (htmlTutorials.length === 0) {
    return <div className="alert alert-warning text-center mt-5">🚀 No HTML tutorials available at the moment.</div>;
  }

  return (
    <div className="container">
      <div className="row">
        {/* Sidebar with Course Names */}
        <div className="col-sm-4 side-menu">
          <h2 style={{ padding: "10px", fontFamily: "cursive", color: "rebeccapurple" }}>HTML Course Topics</h2>
          <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
            {htmlTutorials.map((tutorial) => (
              <li key={tutorial.id} style={{ padding: "5px 0" }}>
                <button
                  onClick={() => scrollToSection(tutorial.id)}
                  style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer', textAlign: 'left', padding: 0 }}
                >
                  {tutorial.course_name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="col-sm-8 offset-sm-4">
          <h1 style={{ padding: "20px", fontFamily: "cursive" }}>HTML Tutorials</h1>
          <br />
          <Link to="/">
            <button type="button" className="btn btn-lg btn-info" style={{ borderRadius: "20px" }}>
              Home
            </button>
          </Link>
          <div>
            {htmlTutorials.map((tutorial) => (
              <div key={tutorial.id} id={`tutorial-${tutorial.id}`} style={{ marginBottom: '20px' }}>
                <h2 style={{ color: "rebeccapurple", padding: "10px", borderTop: "1px solid", borderBottom: "1px solid" }}>
                  {tutorial.course_name}
                </h2>
                <div style={{ padding: "10px" }} dangerouslySetInnerHTML={{ __html: tutorial.content }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HtmlPage;

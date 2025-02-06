import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style_folder/Sidemenu_html.css';// import style file
import useScrollToSection from '../Hooks/ScrollToSection';
import { Link } from 'react-router-dom';

const python = () => {
    const [tutorials, setTutorials] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const {scrollToSection} = useScrollToSection()

    useEffect(() => {
        const fetchCourseContent = async () => {
            try {
                setError(false);
                setLoading(true);
                const response = await axios.get('http://127.0.0.1:5000/add_content/course_content');

                if (Array.isArray(response.data)) {
                    setTutorials(response.data);
                    console.log('Fetched course content:', response.data);
                }
                setLoading(false);
            } catch (error) {
                setError(true);
                console.error('Error fetching course content:', error.message);
            }finally {
                setLoading(false);
            }
        };

        fetchCourseContent();
    }, []);
    // Filter tutorials to show only Python courses
    const pythonTutorials = tutorials.filter(tutorial =>
        tutorial.course_name && tutorial.course_name.trim().toLowerCase().includes('python')
    );

    // **Handle different states**
  if (loading) {
    return <div className="alert alert-info text-center mt-5">Loading tutorials... ⏳</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center mt-5">❌ Error fetching tutorials. Please try again later.</div>;
  }

  if (pythonTutorials.length === 0) {
    return <div className="alert alert-info text-center mt-5">🚀 No Python tutorials available at the moment.</div>;
  }
    return (
        <>
            <div className='container'>
                <div className="row">
                    {/* Sidebar with Course Names */}
                    <div className="col-sm-4 side-menu">
                        <h2 style={{ padding: "10px", fontFamily: "cursive", color: "rebeccapurple" }}>Python Course Topics</h2>
                        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                            {pythonTutorials.map((tutorial) => (
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
                        <h1 style={{ padding: "20px", fontFamily: "cursive" }}>Python Tutorials</h1>
                        <br />
                        <button type="button" className="btn btn-lg btn-info" style={{ borderRadius: "20px" }}>
                            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                                Home
                            </Link>
                        </button>
                        {/* Render Python Tutorials Only */}
                        <div>
                            {pythonTutorials.map((tutorial) => (
                                <div key={tutorial.id} id={`tutorial-${tutorial.id}`} style={{ marginBottom: '20px' }}>
                                    <h2 style={{ color: "rebeccapurple", padding: "10px", borderTop: "1px solid", borderBottom: "1px solid" }}>{tutorial.course_name}</h2>
                                    <div style={{ padding: "10px" }} dangerouslySetInnerHTML={{ __html: tutorial.content }} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default python;

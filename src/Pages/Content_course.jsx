import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IndexUrl from '../Hooks/IndexUrl'
import '../style_folder/adminlinkpages.css';
const CourseContent = () => {
  const [courseData, setCourseData] = useState({
    content: '',
    status: 1, 
    project_id: '',
  });

  const [courseList, setCourseList] = useState([]);
  const [loading , setLoading] = useState(false);
  const [error , setError] = useState(false);

  // Fetching all course content data
  const fetchCourseContent = async () => {
    try {
      setError(false);
      setLoading(true);
      const response = await axios.get('http://127.0.0.1:5000/add_content/course_content');
      console.log('Fetched course content:', response.data);
      setCourseList(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching course content:', error);
      setError(true);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
 // **Handle different states**
  useEffect(() => {
    fetchCourseContent();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log the data before sending to verify it's correct
    console.log('Data being sent:', courseData);

    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/add_content/course_content', 
        courseData, // Send the courseData object
        {
          headers: {
            'Content-Type': 'application/json', // Ensure backend treats it as JSON
          },
        }
      );
      console.log('Course content added successfully:', response.data);
      setCourseData({ content: '', status: 1, project_id: '' }); // Reset form
      fetchCourseContent(); // Refresh course list after adding
      // Optionally reload the page or use another method to refresh UI
    } catch (error) {
      console.error('Error adding course content:', error);
    }
  };
  if (loading) {
    return <div className="alert alert-info text-center mt-5">Loading tutorials... ⏳</div>;
  }
  
  if (error) {
    return <div className="alert alert-danger text-center mt-5">❌ Error fetching tutorials. Please try again later.</div>;
  }
  

  return (
    <> 
        <IndexUrl.Navbar2 />
    <div className='wapper'>
    <div className="container mt-5 sub_wapper">
      <h2 className="mb-4 text-center">Add Course Content</h2>

      <form onSubmit={handleSubmit} className="shadow p-4 wapper">
        <div className="form-group mb-3">
          <label htmlFor="content" className='label_style'>Course Content</label>
          <textarea
            className="form-control "
            id="content"
            name="content"
            value={courseData.content}
            onChange={handleChange}
            rows="3"
            required
          ></textarea>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="status" className='label_style'>Status</label>
          <select
            className="form-control"
            id="status"
            name="status"
            value={courseData.status}
            onChange={handleChange}
            required
          >
            <option value={1}>Active</option>
            <option value={0}>Inactive</option>
          </select>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="project_id" className='label_style'>Reference ID Name</label>
          <input
            type="text"
            className="form-control input_style"
            id="project_id"
            name="project_id"
            value={courseData.project_id}
            onChange={handleChange}
            required
          />
        </div>
        <div className='text-center mt-3'>
        <button type="submit" className="btn btn-primary btn-sm  mt-3" style={{ padding: "10px", borderRadius: "5px",  fontWeight: "bold" }}>
          Add Content
        </button>
        </div>
      </form>

      <h3 className="mt-4">Course Content List</h3>
      <ul className="list-group mt-3">
        {courseList.map((content, index) => (
          <li key={index} className="list-group-item">
            <strong>Content:</strong> {content.content}
            <br />
            <strong>Status:</strong> {content.status === 1 ? 'Active' : 'Inactive'}
            <br />
            <strong>Reference ID Name:</strong> {content.reference_id_name} - {content.course_name || 'Unknown'}
          </li>
        ))}
      </ul>
    </div>
    </div>
    </>
  );
};

export default CourseContent;

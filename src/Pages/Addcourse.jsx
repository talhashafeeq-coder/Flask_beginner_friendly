import React, { useState } from 'react';
import axios from 'axios';
import IndexUrl from '../Hooks/IndexUrl';
import '../style_folder/adminlinkpages.css';

const AddCourse = () => {
  const [courseData, setCourseData] = useState({
    language_name: '',
    name: '',
    is_part: false,
    status: 1, // 1 for active, 0 for inactive
    parent_id: '',
  });
  const [loading , setLoading] = useState(false);
  const [error , setError] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCourseData({
      ...courseData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(false);
      setLoading(true);
      const response = await axios.post(
        'http://127.0.0.1:5000/add_language/add_course',
        courseData
      );
      console.log('Course added successfully:', response.data);
      closeModal();
      setLoading(false);
    } catch (error) {
      console.error('Error adding course:', error);
      setError(true);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

   // **Handle different states**
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
      <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Add New Course</h3> 
    <form onSubmit={handleSubmit} className="shadow p-4 wapper">
      <div className="form-group mb-3">
        <label htmlFor="language_name" className='label_style'>Language Name</label><br/>
        <small className="form-text text-muted" style={{ fontSize: "14px" }}>
          First, enter the language name once, <span className='text-danger'>then complete all the topics</span>, and <span className="text-success"> <b>finally enter the new language name</b></span>.
        </small>
        <input
          type="text"
          className="form-control input_style"
          id="language_name"
          name="language_name"
          value={courseData.language_name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group mb-3">
        <label htmlFor="name" className='label_style'>Topic Name</label>
        <small className="form-text text-muted" style={{ fontSize: "14px" }}> <br/>
          Enter the topic name one by one and remember the ID number.
        </small>
        <input
          type="text"
          className="form-control input_style"
          id="name"
          name="name"
          value={courseData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group mb-3">
        <label htmlFor="is_part" className='label_style'>Is Part of Another Course</label>
        <input
          type="checkbox"
          id="is_part"
          name="is_part"
          checked={courseData.is_part}
          onChange={handleChange}
        /><br/>
        <small style={{ fontSize: "14px", color: "#555" }}>Add this course as a part of another course</small>
      </div>

      <div className="form-group mb-3">
        <label htmlFor="status" className='label_style'>Status</label>
        <select
          className="form-control input_style"
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
        <label htmlFor="parent_id" className='label_style'>Parent Course ID (Optional)</label>
        <input
          type="text"
          className="form-control input_style"
          id="parent_id"
          name="parent_id"
          value={courseData.parent_id}
          onChange={handleChange}
        />
      </div>
        <div className='text-center mt-3'>
      <button type="submit" className="btn btn-primary btn-sm" style={{ padding: "10px", borderRadius: "5px",  fontWeight: "bold" }} > 
        Add Course
      </button>
      </div>
    </form>
</div>
</div>
</>
  );
};

export default AddCourse;

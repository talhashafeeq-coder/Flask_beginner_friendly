import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IndexUrl from '../Hooks/IndexUrl';

const ExamContent = () => {
  const [examData, setExamData] = useState({
    created_at: new Date().toISOString().slice(0, 16),
    updated_at: new Date().toISOString().slice(0, 16),
    name: '',
    description: '',
    total_marks: '',
    time_limit: '',
  });

  const [examList, setExamList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Fetching all exam data
  const fetchExamContent = async () => {
    setLoading(true);
    try {
      setLoading(true);
      const response = await axios.get('http://127.0.0.1:5000/exam_collection/exam_collection');
      setExamList(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching exams:', error);
      setLoading(true)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExamContent();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExamData({ ...examData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Ensure time_limit and total_marks are positive numbers
    if (examData.total_marks <= 0 || examData.time_limit <= 0) {
      alert('Total Marks and Time Limit must be positive numbers.');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/exam_collection/exam_collection', examData);
      setLoading(false);
      setMessage('Exam added successfully!');
      fetchExamContent(); // Refresh exam list after adding
      setExamData({
        name: '',
        description: '',
        total_marks: '',
        time_limit: '',
        updated_at: new Date().toISOString().slice(0, 16),
        created_at: new Date().toISOString().slice(0, 16),
      });
    } catch (error) {
      console.error('Error adding exam:', error);
      setMessage('Error adding exam. Please try again.');
      setLoading(true);
    }
  };

  return (
    <>
          <IndexUrl.Navbar2 />
    <div className='wapper'>
      <div className="container mt-5 sub_wapper">
        <h2 className="mb-4 text-center">Add Exam Question!</h2>

        {message && <div className="alert alert-info">{message}</div>}
        {loading && <div className="alert alert-info">Loading...</div>}

        <form onSubmit={handleSubmit} className="shadow p-4 wapper">
          <div className="form-group mb-3">
            <label htmlFor="name" className='label_style'>Exam Name</label>
            <input
              type="text"
              className="form-control input_style"
              id="name"
              name="name"
              value={examData.name}
              onChange={handleChange}
              maxLength={100}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="description" className='label_style'>Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={examData.description}
              onChange={handleChange}
              rows="3"
              maxLength={300}
              required
            ></textarea>
          </div>

          <div className="form-group mb-3">
            <label htmlFor="total_marks" className='label_style'>Total Marks</label>
            <input
              type="number"
              className="form-control input_style"
              id="total_marks"
              name="total_marks"
              value={examData.total_marks}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="time_limit" className='label_style'>Time Limit (in minutes)</label>
            <input
              type="number"
              className="form-control input_style"
              id="time_limit"
              name="time_limit"
              value={examData.time_limit}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="updated_at" className='label_style'>Updated At</label>
            <input
              type="datetime-local"
              className="form-control input_style "
              id="updated_at"
              name="updated_at"
              value={examData.updated_at}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="created_at" className='label_style'>Created At</label>
            <input
              type="datetime-local"
              className="form-control input_style"
              id="created_at"
              name="created_at"
              value={examData.created_at}
              onChange={handleChange}
              required
            />
          </div>
          <div className='text-center mt-3'>
          <button type="submit" className="btn btn-primary  mt-3" style={{ padding: "10px", borderRadius: "5px",  fontWeight: "bold" }}>
            Add Exam
          </button>
          </div>
        </form>

        <h3 className="mt-4">Exam List</h3>
        {loading ? (
          <p>Loading exams...</p>
        ) : (
          <ul className="list-group mt-3">
            {examList.map((exam, index) => (
              <li key={index} className="list-group-item">
                <strong>Name:</strong> {exam.name}
                <br />
                <strong>Description:</strong> {exam.description}
                <br />
                <strong>Total Marks:</strong> {exam.total_marks}
                <br />
                <strong>Time Limit:</strong> {exam.time_limit} minutes
                <br />
                <strong>Created At:</strong> {new Date(exam.created_at).toLocaleString()}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
    </>
  );
};

export default ExamContent;

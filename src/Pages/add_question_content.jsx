import React, { useState } from 'react';
import axios from 'axios';
import IndexUrl from '../Hooks/IndexUrl';
import '../style_folder/adminlinkpages.css';


const AddQuestionContent = () => {
  const [questionText, setQuestionText] = useState('');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [optionC, setOptionC] = useState('');
  const [optionD, setOptionD] = useState('');
  const [message, setMessage] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [examName, setExamName] = useState(''); // Updated to examName
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newQuestion = {
      question_text: questionText,
      option_a: optionA,
      option_b: optionB,
      option_c: optionC,
      option_d: optionD,
      correct_option: correctAnswer,
      exam_name: examName, // Updated to exam_name
    };

    try {
      setError(false);
      setLoading(true);
      const response = await axios.post('http://127.0.0.1:5000/add_question/question', newQuestion);
      setMessage(`Question added successfully: ${response.data.message}`);
      console.log(newQuestion);
      // Reset fields
      setQuestionText('');
      setOptionA('');
      setOptionB('');
      setOptionC('');
      setOptionD('');
      setCorrectAnswer('');
      setExamName('');
      setLoading(false);
    } catch (error) {
      console.error('Error adding question:', error);
      setError(true);
      setLoading(false);
      setMessage('Failed to add the question. Please try again.');
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
      <div className="container mt-5  sub_wapper" >
        <h2 className="mb-4 text-center">Add New Question</h2>
        {message && <p className="alert alert-info">{message}</p>}
        <form onSubmit={handleSubmit} className="shadow wapper p-4 ">
          <div className="form-group mb-3">
            <label htmlFor='questionText' className='label_style'>Question Text</label>
            <input
              type="text"
              className="form-control input_style"
              value={questionText}
              required
              onChange={(e) => setQuestionText(e.target.value)}
              style={{ borderRadius: "5px", padding: "10px" }}

            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor='optionA' className='label_style'>Option A</label>
            <input
              type="text"
              className="form-control input_style"
              value={optionA}
              onChange={(e) => setOptionA(e.target.value)}
              style={{ borderRadius: "5px", padding: "10px" }}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor='optionB' className='label_style'>Option B</label>
            <input
              type="text"
              className="form-control input_style"
              value={optionB}
              onChange={(e) => setOptionB(e.target.value)}
              style={{ borderRadius: "5px", padding: "10px" }}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor='optionC' className='label_style'>Option C</label>
            <input
              type="text"
              className="form-control input_style"
              value={optionC}
              onChange={(e) => setOptionC(e.target.value)}
              style={{ borderRadius: "5px", padding: "10px" }}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor='optionD' className='label_style'>Option D</label>
            <input
              type="text"
              className="form-control input_style"
              value={optionD}
              onChange={(e) => setOptionD(e.target.value)}
              style={{ borderRadius: "5px", padding: "10px" }}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor='correctAnswer' className='label_style'>Correct Answer</label>
            <input
              type="text"
              className="form-control input_style"
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              style={{ borderRadius: "5px", padding: "10px" }}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor='examName' className='label_style'>Exam Name</label>
            <input
              type="text"
              className="form-control input_style"
              value={examName} // Updated to examName
              onChange={(e) => setExamName(e.target.value)} // Updated to setExamName
              style={{ borderRadius: "5px", padding: "10px" }}
              required
            />
          </div>
          <div className='text-center mt-3'>
            <button type="submit" className="btn btn-success btn-sm" style={{ padding: "10px", borderRadius: "5px", fontWeight: "bold" }}>
              Add Question
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default AddQuestionContent;

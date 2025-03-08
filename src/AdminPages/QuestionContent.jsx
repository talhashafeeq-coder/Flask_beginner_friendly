import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const QuestionContent = () => {
  const [questionList, setQuestionList] = useState([]); 
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(30); 
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null); 
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false); 
  
  const navigate = useNavigate(); 

  // Fetch questions from API
  const fetchQuestions = async () => {
    try {
      setError(false);
      setLoading(true);
      const response = await axios.get('http://127.0.0.1:5000/add_question/question');
      setQuestionList(response.data);
      setLoading(false);
      const savedIndex = parseInt(localStorage.getItem('currentQuestionIndex'), 10);
      if (!isNaN(savedIndex) && savedIndex < response.data.length) {
        setCurrentQuestionIndex(savedIndex);
        setTimer(response.data[savedIndex].time_limit || 30);
      } else if (response.data.length > 0) {
        setTimer(response.data[0].time_limit || 30);
      }
    } catch (error) {
      setError(true);
      setLoading(false);
      console.error('Error fetching questions:', error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (timer > 0 && !isTimeUp && isAnswerCorrect === null) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else if (timer === 0) {
      setIsTimeUp(true);
      alert('Time is up!');
    }
  }, [timer, isTimeUp, isAnswerCorrect]);

  const handleNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questionList.length) {
      setCurrentQuestionIndex(nextIndex);
      setTimer(questionList[nextIndex].time_limit || 30);
      setIsTimeUp(false);
      setUserAnswer('');
      setIsAnswerCorrect(null);
      setShowCorrectAnswer(false);
      setCorrectAnswer('');
      
      // Update localStorage with the new question index
      localStorage.setItem('currentQuestionIndex', nextIndex.toString());
    } else {
      alert('No more questions.');
      navigate('/'); 
    }
  };

  const handleSubmitAnswer = async () => {
    const currentQuestion = questionList[currentQuestionIndex];
    try {
      setError(false);
      setLoading(true);
      const response = await axios.post('http://127.0.0.1:5000/add_question/verify_question', {
        question_id: currentQuestion.id,
        selected_option: userAnswer,
      });
      setLoading(false);

      const { is_correct, correct_option } = response.data;
      setIsAnswerCorrect(is_correct);
      setCorrectAnswer(correct_option);
      setShowCorrectAnswer(true);

      if (is_correct) {
        // Store next question index in localStorage before moving to the next question
        localStorage.setItem('currentQuestionIndex', (currentQuestionIndex + 1).toString());
        
        setTimeout(handleNextQuestion, 1000); 
      }
    } catch (error) {
      setError(true);
      console.error('Error verifying the answer:', error);
      alert('Failed to verify the answer. Please try again.');
    }
  };

  if (questionList.length === 0) {
    return <div className="alert alert-info text-center mt-5">Loading tutorials... ⏳</div>;
  }
    // **Handle different states**
    if (loading) {
      return <div className="alert alert-info text-center mt-5">Loading tutorials... ⏳</div>;
    }
  
    if (error) {
      return <div className="alert alert-danger text-center mt-5">❌ Error fetching tutorials. Please try again later.</div>;
    }
    
    if (questionList.length === 0) {
      return <div className="alert alert-info text-center mt-5">🚀 No Question  are  not available at the moment.</div>;
    }
  

  const currentQuestion = questionList[currentQuestionIndex];

  return (
    <div className="container mt-5">
      <h2>Question {currentQuestionIndex + 1}</h2>
      <div className="card p-4 mb-4 shadow">
        <p><strong>Question:</strong> {currentQuestion.question_text}</p>

        <ol>
          {['option_a', 'option_b', 'option_c', 'option_d'].map((optionKey) => (
            <li key={optionKey}>
              {currentQuestion[optionKey]}
            </li>
          ))}
        </ol>

        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Type your answer here"
          className="form-control mt-3"
          disabled={isTimeUp || isAnswerCorrect === true}
        />

        <p><strong>Time Left:</strong> {timer} seconds</p>

        <button
          className="btn btn-success mt-3"
          onClick={handleSubmitAnswer}
          disabled={isTimeUp || !userAnswer || isAnswerCorrect === true}
        >
          Submit Answer
        </button>

        {showCorrectAnswer && (
          <div className="mt-3">
            <strong>Correct Answer:</strong> {correctAnswer}
            {isAnswerCorrect === true ? (
              <div className="text-success">Your answer is correct!</div>
            ) : (
              <div className="text-danger">Your answer is incorrect.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionContent;

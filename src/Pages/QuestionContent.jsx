// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

// const QuestionContent = () => {
//   const [questionList, setQuestionList] = useState([]); // get all questions help of this state
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [timer, setTimer] = useState(30); // Default 30 seconds
//   const [isTimeUp, setIsTimeUp] = useState(false);
//   const [userAnswer, setUserAnswer] = useState(''); // For typed answer
//   const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
//   const [correctAnswer, setCorrectAnswer] = useState('');
//   const [isAnswerCorrect, setIsAnswerCorrect] = useState(null); // To track answer correctness
//   const [intervalId, setIntervalId] = useState(null); // Store the interval ID to clear it when necessary
//   const navigate = useNavigate(); // For navigation

//   // Fetch questions from the database
//   const fetchQuestions = async () => {
//     try {
//       const response = await axios.get('http://127.0.0.1:5000/add_question/question');
//       console.log('Fetched questions:', response.data);
//       setQuestionList(response.data);
  
//       const savedIndex = parseInt(localStorage.getItem('currentQuestionIndex'), 10);
      
//       if (!isNaN(savedIndex) && savedIndex < response.data.length) {
//         setCurrentQuestionIndex(savedIndex);
//         setTimer(response.data[savedIndex].time_limit || 30);
//       } else if (response.data.length > 0) {
//         setTimer(response.data[0].time_limit || 30);
//       }
//     } catch (error) {
//       console.error('Error fetching questions:', error);
//     }
//   };
//   useEffect(() => {
//     const savedIndex = parseInt(localStorage.getItem('currentQuestionIndex'), 10);
//     if (!isNaN(savedIndex) && savedIndex < questionList.length) {
//       setCurrentQuestionIndex(savedIndex);
//     }
//   }, [questionList]);

  
//   useEffect(() => {
//     fetchQuestions();
//     handleEditAnswer();
//   }, []);

//   useEffect(() => {
//     if (timer > 0 && !isTimeUp && !isAnswerCorrect) {
//       const countdown = setInterval(() => {
//         setTimer((prev) => prev - 1);
//       }, 1000);
//       setIntervalId(countdown);
//       return () => clearInterval(countdown);
//     } else if (timer === 0) {
//       setIsTimeUp(true);
//       alert('Time is up!');
//     }
//   }, [timer, isTimeUp, isAnswerCorrect]);

//   const handleNextQuestion = () => {
//     if (currentQuestionIndex + 1 < questionList.length) {
//       setCurrentQuestionIndex((prev) => prev + 1);
//       setTimer(questionList[currentQuestionIndex + 1].time_limit || 30);
//       setIsTimeUp(false);
//       setUserAnswer('');
//       setIsAnswerCorrect(null);
//       setShowCorrectAnswer(false);
//       setCorrectAnswer('');
//       localStorage.setItem('currentQuestionIndex', nextIndex.toString());
//           } else {
//       alert('No more questions.');
//       navigate('/end'); // Redirect to a different page (like an end page)
//     }
//   };

//   const handleSubmitAnswer = async () => {
//     const currentQuestion = questionList[currentQuestionIndex];
//     try {
//       const response = await axios.post('http://127.0.0.1:5000/add_question/verify_question', {
//         question_id: currentQuestion.id,
//         selected_option: userAnswer,
//       });

//       const { is_correct, correct_option } = response.data;

//       setIsAnswerCorrect(is_correct);
//       setCorrectAnswer(correct_option); // Store the correct answer
//       setShowCorrectAnswer(true); // Automatically show the correct answer

//       if (is_correct) {
//         clearInterval(intervalId); // Stop the timer if the answer is correct
//         setTimeout(handleNextQuestion, 1000); // Move to the next question after 1 second
//       }

//     } catch (error) {
//       console.error('Error verifying the answer:', error);
//       alert('Failed to verify the answer. Please try again.');
//     }
//   };

//   // const handleShowCorrectAnswer = async () => {
//   //   const currentQuestion = questionList[currentQuestionIndex];
//   //   try {
//   //     const response = await axios.get(`http://127.0.0.1:5000/add_question/verify_question/${currentQuestion.id}`);
//   //     setCorrectAnswer(response.data.correct_option);
//   //     setShowCorrectAnswer(true);
//   //   } catch (error) {
//   //     console.error('Error fetching correct answer:', error);
//   //   }
//   // };

//   // This is for enabling the user to edit their answer when it's wrong and submit it again.
//   const handleEditAnswer = async () => {
//     if (isAnswerCorrect === false) {
//       handleSubmitAnswer(); // Automatically submit after editing if the previous answer was wrong
//     }
//   };

//   if (questionList.length === 0) {
//     return <p>Loading questions...</p>;
//   }

//   const currentQuestion = questionList[currentQuestionIndex];

//   return (
//     <div className="container mt-5">
//       <h2>Question {currentQuestionIndex + 1}</h2>
//       <div className="card p-4 mb-4 shadow">
//         <p><strong>Question:</strong> {currentQuestion.question_text}</p>

//         {/* Display options in an ordered list */}
//         <ol>
//           {['option_a', 'option_b', 'option_c', 'option_d'].map((optionKey) => (
//             <li key={optionKey}>
//               {currentQuestion[optionKey]}
//             </li>
//           ))}
//         </ol>

//         {/* Input field for user answer */}
//         <input
//           type="text"
//           value={userAnswer}
//           onChange={(e) => setUserAnswer(e.target.value)}
//           placeholder="Type your answer here"
//           className="form-control mt-3"
//           disabled={isTimeUp || (isAnswerCorrect !== null && isAnswerCorrect === true)}
//         />

//         <p><strong>Time Left:</strong> {timer} seconds</p>

//         {/* Submit button */}
//         <button
//           className="btn btn-success mt-3"
//           onClick={handleSubmitAnswer}
//           disabled={isTimeUp || !userAnswer || isAnswerCorrect === true}
//         >
//           Submit Answer
//         </button>
//            {showCorrectAnswer && (
//           <div className="mt-3">
//             <strong>Correct Answer:</strong> {correctAnswer}
//             {isAnswerCorrect === true ? (
//               <div className="text-success">Your answer is correct!</div>
//             ) : isAnswerCorrect === false ? (
//               <div className="text-danger">
//                 Your answer is incorrect.
//               </div>
//             ) : null}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default QuestionContent;
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
      navigate('/end'); 
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

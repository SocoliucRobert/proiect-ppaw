import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from './supabaseClient';
import styles from './QuizPage.module.css';

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Track the selected answer
  const [userPlan, setUserPlan] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions();
    fetchUserPlan();
  }, []);

  const fetchUserPlan = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        const { data, error } = await supabase
          .from('users')
          .select('subscription_plan')
          .eq('email', session.user.email)
          .single();

        if (error) throw error;
        setUserPlan(data.subscription_plan || '');
      }
    } catch (error) {
      console.error('Error fetching user plan:', error.message);
    }
  };

  const fetchQuestions = async () => {
    try {
      const { data, error } = await supabase
        .from('questions')
        .select('id, question_text, answers(id, answer_text, is_correct)');

      if (error) throw error;

      const formattedQuestions = data.map((q) => ({
        ...q,
        answers: q.answers || [],
      }));

      setQuestions(formattedQuestions);
    } catch (error) {
      console.error('Error fetching questions:', error.message);
    }
  };

  const handleAnswer = (isCorrect, answerId) => {
    setSelectedAnswer(answerId);

    if (isCorrect) setScore((prev) => prev + 1);

    setTimeout(() => {
      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedAnswer(null); 
      } else {
        alert(`Chestionar finalizat! Punctajul tau: ${score + (isCorrect ? 1 : 0)} / ${questions.length}`);
        navigate('/Chestionare');
      }
    }, 1500); 
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className={styles.quizPage}>
      <h1 className={styles.quizHeader}>Solve the Quiz</h1>

      <div className={styles.progress}>
        <div
          className={styles.progressBar}
          style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      {currentQuestion ? (
        <div className={styles.questionContainer}>
          <h2>Intrebarea {currentQuestionIndex + 1}</h2>
          <p>{currentQuestion.question_text}</p>
          <div className={styles.answers}>
            {currentQuestion.answers.map((answer) => {
              const isCorrect = answer.is_correct;
              const isSelected = answer.id === selectedAnswer;

              return (
                <button
                  key={answer.id}
                  onClick={() => handleAnswer(isCorrect, answer.id)}
                  className={
                    userPlan === 'Plan Pro' && selectedAnswer
                      ? isCorrect
                        ? styles.correctAnswer
                        : isSelected
                        ? styles.wrongAnswer
                        : ''
                      : ''
                  }
                  disabled={!!selectedAnswer}
                >
                  {answer.answer_text}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <p>Loading questions...</p>
      )}

      <div className={styles.quizFooter}>
        {questions.length > 0 && (
          <p>
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
        )}
      </div>
    </div>
  );
};

export default QuizPage;

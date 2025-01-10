import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from './supabaseClient';
import styles from './QuizPage.module.css';

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthentication();
  }, []);

  useEffect(() => {
    if (userEmail) fetchQuestions();
  }, [userEmail]);

  const checkAuthentication = async () => {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) throw error;

      if (session) {
        const email = session.user?.email || '';
        setUserEmail(email);
      } else {
        navigate('/Login');
      }
    } catch (error) {
      console.error('Error checking authentication:', error.message);
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
        finishQuiz();
      }
    }, 1500);
  };

  const finishQuiz = async () => {
    try {
      const finalScore = score;

      const { error } = await supabase.from('completed_quizzes').insert([
        {
          email: userEmail,
          quiz_id: 1, // Replace with the actual quiz ID if you have dynamic quiz loading
          score: finalScore,
          completed_at: new Date(),
        },
      ]);

      if (error) throw error;

      alert(`Chestionar completat! Punctajul tău: ${finalScore} / ${questions.length}`);
      navigate('/Chestionare');
    } catch (error) {
      console.error('Error saving quiz completion:', error.message);
      alert('A apărut o eroare la salvarea progresului chestionarului.');
    }
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
          <h2>Întrebarea {currentQuestionIndex + 1}</h2>
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
                    selectedAnswer
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
            Întrebarea {currentQuestionIndex + 1} din {questions.length}
          </p>
        )}
      </div>
    </div>
  );
};

export default QuizPage;

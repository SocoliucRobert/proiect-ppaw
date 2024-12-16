import React, { useEffect, useState } from 'react';
import supabase from './supabaseClient';
import styles from './AvailableQuizzes.module.css';

const AvailableQuizzes = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userSubscription, setUserSubscription] = useState('');
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    checkAuthentication();
  }, []);

  useEffect(() => {
    if (userSubscription) {
      fetchQuizzes();
    }
  }, [userSubscription]);

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
        fetchUserSubscription(email);
      } else {
        setUserEmail('');
      }
    } catch (error) {
      console.error('Error checking authentication:', error.message);
    }
  };

  const fetchUserSubscription = async (email) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('subscription_plan')
        .eq('email', email)
        .single();

      if (error) throw error;

      setUserSubscription(data.subscription_plan || '');
    } catch (error) {
      console.error('Error fetching user subscription:', error.message);
    }
  };

  const fetchQuizzes = async () => {
    try {
      const { data, error } = await supabase
        .from('quizzes')
        .select('*')
        .eq('subscription_plan', userSubscription);

      if (error) throw error;

      setQuizzes(data);
    } catch (error) {
      console.error('Error fetching quizzes:', error.message);
    }
  };

  return (
    <div className={styles.dashboard}>
      <h2>Available Quizzes</h2>
      {userEmail ? (
        <p>
          Logged in as: <strong>{userEmail}</strong>
        </p>
      ) : (
        <p style={{ color: 'red' }}>Please log in to access quizzes.</p>
      )}
      {userSubscription && (
        <p>
          Your Plan: <strong>{userSubscription}</strong>
        </p>
      )}

      <div className={styles.quizGrid}>
        {quizzes.map((quiz) => (
          <div key={quiz.id} className={styles.quizCard}>
            <h3>{quiz.subscription_plan}</h3>
            <p>Score: {quiz.score || 0}</p>
            <p>Total Questions: {quiz.total_questions}</p>
            <p>Correct Answers: {quiz.correct_answers || 0}</p>
            <button className={styles.startQuizButton}>
              Start Quiz
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableQuizzes;

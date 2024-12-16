import React, { useEffect, useState } from 'react';
import supabase from './supabaseClient';
import styles from './QuizzesDashbord.module.css';

const QuizzesDashboard = () => {
  const [quizzesBySubscription, setQuizzesBySubscription] = useState({});

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const { data, error } = await supabase
        .from('quizzes')
        .select(`
          id,
          subscription_plan,
          total_questions,
          questions (category)
        `);

      if (error) throw error;

      
      const groupedQuizzes = data.reduce((acc, quiz) => {
        const category = quiz.questions?.category || 'Unknown'; 
        if (!acc[quiz.subscription_plan]) {
          acc[quiz.subscription_plan] = [];
        }
        acc[quiz.subscription_plan].push({
          id: quiz.id,
          category,
          total_questions: quiz.total_questions,
        });
        return acc;
      }, {});

      setQuizzesBySubscription(groupedQuizzes);
    } catch (error) {
      console.error('Error fetching quizzes:', error.message);
    }
  };

  return (
    <div className={styles.dashboard}>
      <h2>Intrebari chestionare in functie de planuri</h2>
      {Object.entries(quizzesBySubscription).map(([subscription, quizzes]) => (
        <div key={subscription} className={styles.subscriptionGroup}>
          <h3 className={styles.subscriptionTitle}>
            {subscription || 'Unknown'}
          </h3>
          <div className={styles.quizGrid}>
            {quizzes.map((quiz) => (
              <div key={quiz.id} className={styles.quizCard}>
                <h4>{quiz.category}</h4>
                <p> {quiz.total_questions} intrebări</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuizzesDashboard;

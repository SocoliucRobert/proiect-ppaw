import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from './supabaseClient';
import styles from './AvailableQuizzes.module.css';

const AvailableQuizzes = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userSubscription, setUserSubscription] = useState('');
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthentication();
  }, []);

  useEffect(() => {
    if (userSubscription) fetchQuizzes();
  }, [userSubscription]);

 
  const checkAuthentication = async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) {
      console.error('Error fetching session:', error.message);
      return;
    }

    if (session) {
      const email = session.user?.email || '';
      setUserEmail(email);
      fetchUserSubscription(email);
    } else {
      navigate('/Login');
    }
  };


  const fetchUserSubscription = async (email) => {
    const { data, error } = await supabase
      .from('users')
      .select('subscription_plan')
      .eq('email', email)
      .single();

    if (error) {
      console.error('Error fetching subscription:', error.message);
      return;
    }

    setUserSubscription(data.subscription_plan || '');
  };

  
  const fetchQuizzes = async () => {
    let plans = [];

    
    if (userSubscription === 'Plan Pro') {
      plans = ['Plan Gratuit', 'Plan Premium', 'Plan Pro'];
    } else if (userSubscription === 'Plan Premium') {
      plans = ['Plan Gratuit', 'Plan Premium'];
    } else {
      plans = ['Plan Gratuit'];
    }

    try {
      const { data, error } = await supabase
        .from('quizzes')
        .select(`
          id,
          total_questions,
          question_id,
          questions:question_id (category)
        `)
        .in('subscription_plan', plans); 

      if (error) throw error;

     
      const updatedQuizzes = data.map((quiz) => ({
        ...quiz,
        total_questions: quiz.total_questions || 0, 
        category: quiz.questions?.category || 'Necunoscut', 
      }));

      setQuizzes(updatedQuizzes);
    } catch (error) {
      console.error('Error fetching quizzes:', error.message);
    }
  };

  
  const handleStartQuiz = (quizId) => {
    navigate(`/quiz/${quizId}`);
  };

  return (
    <div className={styles.dashboard}>
      <h2>Chestionare Disponibile</h2>
  
      <p>Planul tău: <strong>{userSubscription}</strong></p>

      <div className={styles.quizGrid}>
        {quizzes.length > 0 ? (
          quizzes.map((quiz) => (
            <div key={quiz.id} className={styles.quizCard}>
              <h3>{quiz.category}</h3>
              
              <button 
                onClick={() => handleStartQuiz(quiz.id)} 
                className={styles.startQuizButton}
              >
                Începe Chestionar
              </button>
            </div>
          ))
        ) : (
          <p>Nu există chestionare disponibile pentru planul tău.</p>
        )}
      </div>
    </div>
  );
};

export default AvailableQuizzes;

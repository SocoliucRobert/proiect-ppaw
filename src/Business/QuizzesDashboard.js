import React, { useEffect, useState } from 'react';
import supabase from '../Servicii/supabaseClient';
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
          questions:question_id (category)
        `);

      if (error) throw error;

      const planDescriptions = {
        "Plan Gratuit": "Acces la un număr limitat de chestionare.",
        "Plan Premium": "Acces la un număr mai mare de chestionare.",
        "Plan Pro": "Acces complet la toate chestionarele disponibile, inclusiv statistici și revizuire.",
      };

      // Initialize grouped quizzes with plan descriptions
      const groupedQuizzes = {
        "Plan Gratuit": { quizzes: [], description: planDescriptions["Plan Gratuit"] },
        "Plan Premium": { quizzes: [], description: planDescriptions["Plan Premium"] },
        "Plan Pro": { quizzes: [], description: planDescriptions["Plan Pro"] },
      };

      data.forEach((quiz) => {
        const category = quiz.questions?.category || 'Necunoscut';

        if (quiz.subscription_plan === 'Plan Gratuit') {
          groupedQuizzes['Plan Gratuit'].quizzes.push({
            id: quiz.id,
            category,
          });
        }

        if (['Plan Gratuit', 'Plan Premium'].includes(quiz.subscription_plan)) {
          groupedQuizzes['Plan Premium'].quizzes.push({
            id: quiz.id,
            category,
          });
        }

        groupedQuizzes['Plan Pro'].quizzes.push({
          id: quiz.id,
          category,
        });
      });

      setQuizzesBySubscription(groupedQuizzes);
    } catch (error) {
      console.error('Error fetching quizzes:', error.message);
    }
  };

  return (
    <div className={styles.dashboard}>
      <h2>Chestionare disponibile în funcție de plan</h2>
      {Object.entries(quizzesBySubscription).map(([subscription, data]) => (
        <div key={subscription} className={styles.subscriptionGroup}>
          <h3 className={styles.subscriptionTitle}>{subscription}</h3>
          <p className={styles.planDescription}>{data.description}</p>
          <div className={styles.quizGrid}>
            {data.quizzes.map((quiz) => (
              <div key={quiz.id} className={styles.quizCard}>
                <h4>{quiz.category}</h4>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuizzesDashboard;

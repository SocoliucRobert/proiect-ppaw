import React, { useState, useEffect } from 'react';
import styles from './AdminQuizzes.module.css';
import Meniusus from '../Meniusus';
import supabase from '../supabaseClient';

const AdminQuizzes = () => {
  const [subscriptionPlan, setSubscriptionPlan] = useState('');
  const [totalQuestions, setTotalQuestions] = useState('');
  const [questionId, setQuestionId] = useState('');
  const [quizzes, setQuizzes] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [editingQuizId, setEditingQuizId] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchQuizzes();
    fetchQuestions();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const { data, error } = await supabase
        .from('quizzes')
        .select(`
          id,
          subscription_plan,
          total_questions,
          question_id,
          questions (question_text)
        `);

      if (error) throw error;

      setQuizzes(data);
    } catch (error) {
      console.error('Error fetching quizzes:', error.message);
    }
  };

  const fetchQuestions = async () => {
    try {
      const { data, error } = await supabase.from('questions').select('id, question_text');
      if (error) throw error;

      setQuestions(data);
    } catch (error) {
      console.error('Error fetching questions:', error.message);
    }
  };

  const handleAddQuiz = async () => {
    if (!subscriptionPlan || !totalQuestions || !questionId) {
      setMessage('Completează toate câmpurile!');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('quizzes')
        .insert([
          {
            subscription_plan: subscriptionPlan,
            total_questions: parseInt(totalQuestions, 10),
            question_id: parseInt(questionId, 10),
          },
        ])
        .select();

      if (error) throw error;

      if (data && Array.isArray(data)) {
        setMessage('Chestionarul a fost adăugat cu succes!');
        setSubscriptionPlan('');
        setTotalQuestions('');
        setQuestionId('');
        setQuizzes((prev) => [...prev, ...data]);
      } else {
        setMessage('Eroare la preluarea chestionarului adăugat!');
      }
    } catch (error) {
      console.error('Error adding quiz:', error.message);
      setMessage('Eroare la adăugarea chestionarului!');
    }
  };

  const handleEditToggle = (quizId) => {
    setEditingQuizId(quizId);
    const quizToEdit = quizzes.find((q) => q.id === quizId);
    if (quizToEdit) {
      setSubscriptionPlan(quizToEdit.subscription_plan);
      setTotalQuestions(quizToEdit.total_questions);
      setQuestionId(quizToEdit.question_id);
    }
  };

  const handleUpdateQuiz = async () => {
    try {
      const { error } = await supabase
        .from('quizzes')
        .update({
          subscription_plan: subscriptionPlan,
          total_questions: parseInt(totalQuestions, 10),
          question_id: parseInt(questionId, 10),
        })
        .eq('id', editingQuizId);

      if (error) throw error;

      setMessage('Chestionarul a fost actualizat cu succes!');
      setEditingQuizId(null);
      setSubscriptionPlan('');
      setTotalQuestions('');
      setQuestionId('');
      fetchQuizzes();
    } catch (error) {
      console.error('Error updating quiz:', error.message);
      setMessage('Eroare la actualizarea chestionarului!');
    }
  };

  const handleDeleteQuiz = async (quizId) => {
    if (window.confirm('Sigur doriți să ștergeți acest chestionar?')) {
      try {
        const { error } = await supabase.from('quizzes').delete().eq('id', quizId);
        if (error) throw error;

        setMessage('Chestionarul a fost șters cu succes!');
        setQuizzes((prev) => prev.filter((q) => q.id !== quizId));
      } catch (error) {
        console.error('Error deleting quiz:', error.message);
        setMessage('Eroare la ștergerea chestionarului!');
      }
    }
  };

  return (
    <div>
      <Meniusus />
      <div className={styles.adminContainer}>
        <div className={styles.sidebar}>
          <ul>
            <li>Chestionare</li>
            <li>Întrebări</li>
            <li>Răspunsuri</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className={styles.content}>
          <h1>Admin Panel - Chestionare</h1>
          <div className={styles.form}>
            <select value={questionId} onChange={(e) => setQuestionId(e.target.value)}>
              <option value="">Selectează Întrebarea</option>
              {questions.map((q) => (
                <option key={q.id} value={q.id}>
                  {q.question_text}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Planul Abonamentului"
              value={subscriptionPlan}
              onChange={(e) => setSubscriptionPlan(e.target.value)}
            />
            <input
              type="number"
              placeholder="Număr total de întrebări"
              value={totalQuestions}
              onChange={(e) => setTotalQuestions(e.target.value)}
            />
            {editingQuizId ? (
              <button onClick={handleUpdateQuiz}>Actualizează Chestionarul</button>
            ) : (
              <button onClick={handleAddQuiz}>Adaugă Chestionar</button>
            )}
          </div>
          {message && <p className={styles.message}>{message}</p>}
          <div className={styles.quizzesList}>
            <h2>Lista Chestionarelor</h2>
            {quizzes.map((quiz) => (
              <div key={quiz.id} className={styles.quizItem}>
                <p>
                  <strong>Plan:</strong> {quiz.subscription_plan}
                </p>
                <p>
                  <strong>Întrebare:</strong> {quiz.questions?.question_text || 'N/A'}
                </p>
                <p>
                  <strong>Număr Întrebări:</strong> {quiz.total_questions}
                </p>
                <div className={styles.actions}>
                  <button onClick={() => handleEditToggle(quiz.id)}>Editează</button>
                  <button onClick={() => handleDeleteQuiz(quiz.id)}>Șterge</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminQuizzes;

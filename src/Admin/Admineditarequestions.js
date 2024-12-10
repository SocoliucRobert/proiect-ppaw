import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './admineditarequestions.module.css';
import supabase from '../supabaseClient';

const Admineditarequestions = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({ category: '', question_text: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const { data, error } = await supabase.from('questions').select('*');
      if (error) throw error;
      setQuestions(data.map((question) => ({ ...question, editing: false })));
    } catch (error) {
      console.error('Error fetching questions:', error.message);
    }
  };

  const handleEditToggle = (questionId) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === questionId ? { ...question, editing: !question.editing } : question
      )
    );
  };

  const handleSaveQuestion = async (questionId) => {
    const question = questions.find((q) => q.id === questionId);
    const updatedQuestion = { ...question };
    delete updatedQuestion.editing;

    try {
      const { data, error } = await supabase
        .from('questions')
        .update(updatedQuestion)
        .eq('id', question.id);
      if (error) throw error;
      alert('Întrebarea a fost actualizată cu succes!');
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) => (q.id === questionId ? { ...q, editing: false } : q))
      );
    } catch (error) {
      console.error('Error updating question:', error.message);
      alert('Eroare la actualizarea întrebării!');
    }
  };

  const handleDeleteQuestion = async (question) => {
    if (window.confirm(`Sigur vrei să ștergi această întrebare? "${question.question_text}"`)) {
      try {
        const { error } = await supabase.from('questions').delete().eq('id', question.id);
        if (error) throw error;
        alert('Întrebarea a fost ștearsă cu succes!');
        setQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== question.id));
      } catch (error) {
        console.error('Error deleting question:', error.message);
        alert('Eroare la ștergerea întrebării!');
      }
    }
  };

  const handleInputChange = (questionId, field, value) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === questionId ? { ...question, [field]: value } : question
      )
    );
  };

  const handleAddQuestion = async () => {
    try {
      console.log('New Question:', newQuestion);
  
      if (!newQuestion.category || !newQuestion.question_text) {
        alert('Completează toate câmpurile!');
        return;
      }
  
      const { data, error } = await supabase
        .from('questions')
        .upsert([newQuestion], { onConflict: ['category', 'question_text'] });  
  
      if (error) {
        console.error('Supabase error:', error);
        alert('Eroare la adăugarea întrebării!');
        return;
      }
  
      if (data && data.length > 0) {
        alert('Întrebarea a fost adăugată cu succes!');
        setQuestions((prevQuestions) => [...prevQuestions, { ...data[0], editing: false }]);
        setNewQuestion({ category: '', question_text: '' });
      } else {
        console.error('No data returned:', data);
        alert('Eroare la adăugarea întrebării! Nu au fost returnate date.');
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('Eroare la adăugarea întrebării!');
    }
  };
  
  
  

  return (
    <div className={styles.adminContainer}>
      <h2>Lista Întrebări</h2>

      {/* Adăugare Întrebare Nouă */}
      <div className={styles.addQuestionForm}>
        <input
          type="text"
          placeholder="Categorie"
          value={newQuestion.category}
          onChange={(e) => setNewQuestion({ ...newQuestion, category: e.target.value })}
        />
        <input
          type="text"
          placeholder="Textul întrebării"
          value={newQuestion.question_text}
          onChange={(e) => setNewQuestion({ ...newQuestion, question_text: e.target.value })}
        />
        <button onClick={handleAddQuestion}>Adaugă Întrebare</button>
      </div>

      <div className={styles.questionList}>
        {questions.map((question) => (
          <div key={question.id} className={styles.questionItem}>
            {!question.editing ? (
              <>
                <h3>{question.category}</h3>
                <p>{question.question_text}</p>
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={question.category}
                  onChange={(e) => handleInputChange(question.id, 'category', e.target.value)}
                />
                <input
                  type="text"
                  value={question.question_text}
                  onChange={(e) => handleInputChange(question.id, 'question_text', e.target.value)}
                />
              </>
            )}
            <div className={styles.buttonContainer}>
              {question.editing ? (
                <button onClick={() => handleSaveQuestion(question.id)}>Salvează</button>
              ) : (
                <button onClick={() => handleEditToggle(question.id)}>Editează</button>
              )}
              <button onClick={() => handleDeleteQuestion(question)}>Șterge</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admineditarequestions;

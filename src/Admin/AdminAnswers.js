import React, { useState, useEffect } from "react";
import styles from "./AdmindAnswers.module.css";
import Meniusus from "../PaginiPrincipale/Meniusus";
import supabase from "../Servicii/supabaseClient";
import { Link } from "react-router-dom";

const AdminAnswers = () => {
  const [questionId, setQuestionId] = useState("");
  const [answerText, setAnswerText] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [editingAnswerId, setEditingAnswerId] = useState(null);
  const [message, setMessage] = useState("");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchAnswers();
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const { data, error } = await supabase
        .from("questions")
        .select("id, question_text");
      if (error) throw error;
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error.message);
    }
  };

  const fetchAnswers = async () => {
    try {
      const { data, error } = await supabase.from("answers").select(`
          id,
          answer_text,
          is_correct,
          question_id,
          questions (question_text)
        `);

      if (error) throw error;

      const formattedAnswers = data.map((answer) => ({
        ...answer,
        question_text: answer.questions?.question_text || "Unknown Question",
      }));

      setAnswers(formattedAnswers);
    } catch (error) {
      console.error("Error fetching answers:", error.message);
    }
  };

  const handleAddAnswer = async () => {
    if (!questionId || !answerText) {
      setMessage("Completează toate câmpurile!");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("answers")
        .insert([
          {
            question_id: parseInt(questionId, 10),
            answer_text: answerText,
            is_correct: isCorrect,
          },
        ])
        .select();

      if (error) throw error;

      if (data && Array.isArray(data)) {
        setMessage("Răspunsul a fost adăugat cu succes!");
        setQuestionId("");
        setAnswerText("");
        setIsCorrect(false);
        setAnswers((prev) => [...prev, ...data]);
      } else {
        setMessage("Eroare la preluarea răspunsului adăugat!");
      }
    } catch (error) {
      console.error("Error adding answer:", error.message);
      setMessage("Eroare la adăugarea răspunsului!");
    }
  };

  const handleEditToggle = (answerId) => {
    setEditingAnswerId(answerId);
    const answerToEdit = answers.find((a) => a.id === answerId);
    if (answerToEdit) {
      setQuestionId(answerToEdit.question_id);
      setAnswerText(answerToEdit.answer_text);
      setIsCorrect(answerToEdit.is_correct);
    }
  };

  const handleUpdateAnswer = async () => {
    try {
      const { error } = await supabase
        .from("answers")
        .update({
          question_id: parseInt(questionId, 10),
          answer_text: answerText,
          is_correct: isCorrect,
        })
        .eq("id", editingAnswerId);

      if (error) throw error;

      setMessage("Răspunsul a fost actualizat cu succes!");
      setEditingAnswerId(null);
      setQuestionId("");
      setAnswerText("");
      setIsCorrect(false);
      fetchAnswers();
    } catch (error) {
      console.error("Error updating answer:", error.message);
      setMessage("Eroare la actualizarea răspunsului!");
    }
  };

  const handleDeleteAnswer = async (answerId) => {
    if (window.confirm("Sigur doriți să ștergeți acest răspuns?")) {
      try {
        const { error } = await supabase
          .from("answers")
          .delete()
          .eq("id", answerId);
        if (error) throw error;

        setMessage("Răspunsul a fost șters cu succes!");
        setAnswers((prev) => prev.filter((a) => a.id !== answerId));
      } catch (error) {
        console.error("Error deleting answer:", error.message);
        setMessage("Eroare la ștergerea răspunsului!");
      }
    }
  };

  return (
    <div>
      <Meniusus />
      <div className={styles.adminContainer}>
      <div className={styles.sidebar}>
          <ul>
            <li>
            <Link to="/AdminQuizzes" className={styles.link}>Chestionare</Link>
            </li>
            <li>
            <Link to="/AdminQuestions" className={styles.link}>Întrebări</Link>
            </li>
            <li>
            <Link to="/AdminAnswers" className={styles.link}>Răspunsuri</Link>
            </li>
            <li>
            <Link to="/AdminContact" className={styles.link}>Contact</Link>

            </li>
          </ul>
        </div>
        <div className={styles.content}>
          <h1>Admin Panel - Răspunsuri</h1>
          <div className={styles.form}>
            <select
              value={questionId}
              onChange={(e) => setQuestionId(e.target.value)}
            >
              <option value="">Selectează Întrebarea</option>
              {questions.map((q) => (
                <option key={q.id} value={q.id}>
                  {q.question_text}
                </option>
              ))}
            </select>
            <textarea
              placeholder="Textul răspunsului"
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
            />
            <label>
              <input
                type="checkbox"
                checked={isCorrect}
                onChange={(e) => setIsCorrect(e.target.checked)}
              />
              Răspuns Corect
            </label>
            {editingAnswerId ? (
              <button onClick={handleUpdateAnswer}>
                Actualizează Răspunsul
              </button>
            ) : (
              <button onClick={handleAddAnswer}>Adaugă Răspuns</button>
            )}
          </div>
          {message && <p className={styles.message}>{message}</p>}
          <div className={styles.answersList}>
            <h2>Lista Răspunsurilor</h2>
            {answers.map((answer) => (
              <div key={answer.id} className={styles.answerItem}>
                <p>
                  <strong>Întrebare:</strong> {answer.question_text}
                </p>
                <p>
                  <strong>Răspuns:</strong> {answer.answer_text}
                </p>
                <p>
                  <strong>Corect:</strong> {answer.is_correct ? "Da" : "Nu"}
                </p>
                <div className={styles.actions}>
                  <button onClick={() => handleEditToggle(answer.id)}>
                    Editează
                  </button>
                  <button onClick={() => handleDeleteAnswer(answer.id)}>
                    Șterge
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnswers;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./AdmindQuestions.module.css";
import Meniusus from "../Meniusus";
import supabase from "../supabaseClient";

const AdminQuestions = () => {
  const [category, setCategory] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [questions, setQuestions] = useState([]);
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) throw error;

      if (session) {
        const email = session.user?.email || "";

        if (email !== "rob_roby_rob@yahoo.com") {
          navigate("/Acasa");
        }
      } else {
        navigate("/Acasa");
      }
    } catch (error) {
      console.error("Error fetching session:", error.message);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const { data, error } = await supabase.from("questions").select("*");
      if (error) throw error;
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error.message);
    }
  };

  const handleAddQuestion = async () => {
    if (!category || !questionText) {
      setMessage("Completează toate câmpurile!");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("questions")
        .insert([{ category, question_text: questionText }])
        .select(); 

      if (error) throw error;

      if (data && Array.isArray(data)) {
        setMessage("Întrebarea a fost adăugată cu succes!");
        setCategory("");
        setQuestionText("");
        setQuestions((prev) => [...prev, ...data]);
      } else {
        setMessage("Eroare la preluarea întrebării adăugate!");
      }
    } catch (error) {
      console.error("Error adding question:", error.message);
      setMessage("Eroare la adăugarea întrebării!");
    }
  };

  const handleEditToggle = (questionId) => {
    setEditingQuestionId(questionId);
    const questionToEdit = questions.find((q) => q.id === questionId);
    if (questionToEdit) {
      setCategory(questionToEdit.category);
      setQuestionText(questionToEdit.question_text);
    }
  };

  const handleUpdateQuestion = async () => {
    try {
      const { error } = await supabase
        .from("questions")
        .update({ category, question_text: questionText })
        .eq("id", editingQuestionId);

      if (error) throw error;

      setMessage("Întrebarea a fost actualizată cu succes!");
      setEditingQuestionId(null);
      setCategory("");
      setQuestionText("");
      fetchQuestions();
    } catch (error) {
      console.error("Error updating question:", error.message);
      setMessage("Eroare la actualizarea întrebării!");
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    if (window.confirm("Sigur doriți să ștergeți această întrebare?")) {
      try {
        const { error } = await supabase
          .from("questions")
          .delete()
          .eq("id", questionId);
        if (error) throw error;

        setMessage("Întrebarea a fost ștearsă cu succes!");
        setQuestions((prev) => prev.filter((q) => q.id !== questionId));
      } catch (error) {
        console.error("Error deleting question:", error.message);
        setMessage("Eroare la ștergerea întrebării!");
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
              <Link to="/AdminQuizzes" className={styles.link}>
                Chestionare
              </Link>
            </li>
            <li>
              <Link to="/AdminQuestions" className={styles.link}>
                Întrebări
              </Link>
            </li>
            <li>
              <Link to="/AdminAnswers" className={styles.link}>
                Răspunsuri
              </Link>
            </li>
            <li>
              <Link to="/AdminContact" className={styles.link}>
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.content}>
          <h1>Admin Panel - Întrebări</h1>
          <div className={styles.form}>
            <input
              type="text"
              placeholder="Categorie"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <textarea
              placeholder="Textul întrebării"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            />
            {editingQuestionId ? (
              <button onClick={handleUpdateQuestion}>
                Actualizează Întrebarea
              </button>
            ) : (
              <button onClick={handleAddQuestion}>Adaugă Întrebare</button>
            )}
          </div>
          {message && <p className={styles.message}>{message}</p>}
          <div className={styles.questionsList}>
            <h2>Lista Întrebărilor</h2>
            {questions.map((question) => (
              <div key={question.id} className={styles.questionItem}>
                <p>
                  <strong>Categorie:</strong> {question.category}
                </p>
                <p>
                  <strong>Întrebare:</strong> {question.question_text}
                </p>
                <div className={styles.actions}>
                  <button onClick={() => handleEditToggle(question.id)}>
                    Editează
                  </button>
                  <button onClick={() => handleDeleteQuestion(question.id)}>
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

export default AdminQuestions;

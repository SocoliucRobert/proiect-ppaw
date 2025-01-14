import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./AdminQuizzes.module.css";
import Meniusus from "../PaginiPrincipale/Meniusus";
import supabase from "../Servicii/supabaseClient";

const AdminQuizzes = () => {
  const [subscriptionPlan, setSubscriptionPlan] = useState("");
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const availablePlans = ["Plan Gratuit", "Plan Premium", "Plan Pro"];

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
      console.error("Error checking authentication:", error.message);
    }
  };

  useEffect(() => {
    fetchQuizzes();
    fetchQuestions();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const { data, error } = await supabase.from("quizzes").select(`
          id,
          subscription_plan,
          question_id,
          questions (question_text)
        `);

      if (error) throw error;

      const groupedQuizzes = data.reduce((acc, quiz) => {
        const plan = quiz.subscription_plan || "Unknown";
        if (!acc[plan]) acc[plan] = [];
        acc[plan].push(quiz);
        return acc;
      }, {});

      setQuizzes(groupedQuizzes);
    } catch (error) {
      console.error("Error fetching quizzes:", error.message);
    }
  };

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

  const handleAddQuiz = async () => {
    if (!subscriptionPlan || selectedQuestions.length === 0) {
      setMessage("Completează toate câmpurile!");
      return;
    }

    if (!availablePlans.includes(subscriptionPlan)) {
      setMessage("Planul selectat nu este valid!");
      return;
    }

    try {
      const insertData = selectedQuestions.map((questionId) => ({
        subscription_plan: subscriptionPlan,
        question_id: questionId,
      }));

      const { data, error } = await supabase
        .from("quizzes")
        .insert(insertData)
        .select();

      if (error) throw error;

      setMessage("Chestionarul a fost adăugat cu succes!");
      setSubscriptionPlan("");
      setSelectedQuestions([]);
      fetchQuizzes();
    } catch (error) {
      console.error("Error adding quiz:", error.message);
      setMessage("Eroare la adăugarea chestionarului!");
    }
  };

  const handleDeleteQuiz = async (subscriptionPlan) => {
    if (
      window.confirm(
        `Sigur doriți să ștergeți toate chestionarele pentru planul ${subscriptionPlan}?`
      )
    ) {
      try {
        const { error } = await supabase
          .from("quizzes")
          .delete()
          .eq("subscription_plan", subscriptionPlan);
        if (error) throw error;

        setMessage(
          `Chestionarele pentru planul ${subscriptionPlan} au fost șterse cu succes!`
        );
        fetchQuizzes();
      } catch (error) {
        console.error("Error deleting quizzes:", error.message);
        setMessage("Eroare la ștergerea chestionarelor!");
      }
    }
  };

  const handleToggleQuestion = (questionId) => {
    setSelectedQuestions((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
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
          <h1>Admin Panel - Chestionare</h1>
          <div className={styles.form}>
            <select
              value={subscriptionPlan}
              onChange={(e) => setSubscriptionPlan(e.target.value)}
            >
              <option value="">Selectează Planul</option>
              {availablePlans.map((plan) => (
                <option key={plan} value={plan}>
                  {plan}
                </option>
              ))}
            </select>
            <div className={styles.questionList}>
              <h4>Selectează Întrebări</h4>
              {questions.map((q) => (
                <div key={q.id} className={styles.questionItem}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedQuestions.includes(q.id)}
                      onChange={() => handleToggleQuestion(q.id)}
                    />
                    {q.question_text}
                  </label>
                </div>
              ))}
            </div>
            <button className={styles.addButton} onClick={handleAddQuiz}>
              Adaugă Chestionar
            </button>
          </div>
          {message && <p className={styles.message}>{message}</p>}
          <div className={styles.quizzesList}>
            <h2>Lista Chestionarelor</h2>
            {Object.entries(quizzes).map(([plan, quizzesForPlan]) => (
              <div key={plan} className={styles.quizGroup}>
                <div className={styles.planHeader}>
                  <h3>{plan}</h3>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDeleteQuiz(plan)}
                  >
                    Șterge toate
                  </button>
                </div>
                <ul>
                  {quizzesForPlan.map((quiz) => (
                    <li key={quiz.id} className={styles.quizItem}>
                      Întrebare: {quiz.questions?.question_text || "N/A"}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminQuizzes;

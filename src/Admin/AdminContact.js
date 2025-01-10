import React, { useEffect, useState } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import styles from "./AdmindContact.module.css";
import Meniusus from "../Meniusus";
import supabase from "../supabaseClient";

const AdminContact = () => {
  const [contacts, setContacts] = useState([]);
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
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const { data, error } = await supabase
        .from("contact")
        .select("*")
        .is("deletestate", null); // Only fetch rows where deletestate is null
      if (error) throw error;
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts:", error.message);
    }
  };

  const handleDeleteContact = async (contactId) => {
    if (window.confirm("Sigur doriți să ștergeți acest mesaj?")) {
      try {
        const { error } = await supabase
          .from("contact")
          .update({ deletestate: true }) // Set deletestate to true
          .eq("id", contactId);

        if (error) throw error;

        setMessage("Mesajul a fost șters cu succes!");
        setContacts((prev) =>
          prev.filter((contact) => contact.id !== contactId)
        );
      } catch (error) {
        console.error("Error deleting contact:", error.message);
        setMessage("Eroare la ștergerea mesajului!");
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
          <h1>Admin Panel - Contacte</h1>
          {message && <p className={styles.message}>{message}</p>}
          <div className={styles.contactsList}>
            <h2>Mesaje de Contact</h2>
            {contacts.length > 0 ? (
              contacts.map((contact) => (
                <div key={contact.id} className={styles.contactItem}>
                  <p>
                    <strong>Nume:</strong> {contact.first_name}{" "}
                    {contact.last_name}
                  </p>
                  <p>
                    <strong>Email:</strong> {contact.email}
                  </p>
                  <p>
                    <strong>Telefon:</strong> {contact.phone_number}
                  </p>
                  <p>
                    <strong>Mesaj:</strong> {contact.message}
                  </p>
                  <div className={styles.actions}>
                    <button onClick={() => handleDeleteContact(contact.id)}>
                      Șterge
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>Nu există mesaje de contact.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminContact;

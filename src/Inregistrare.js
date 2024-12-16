import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './stilizare/inregistrare.module.css';
import Meniusus from './Meniusus';
import Meniujos from './Meniujos';
import supabase from './supabaseClient';

const Inregistrare = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      // Create a new user in Supabase Auth
      const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        throw error;
      }

      // Derive username and set subscription plan
      const username = email.split('@')[0];
      const subscriptionPlan = 'Plan Gratuit';

      // Insert user into the 'users' table
      const { data, error: insertError } = await supabase
        .from('users')
        .upsert([
          {
            email: email,
            username: username,
            subscription_plan: subscriptionPlan,
          },
        ]);

      if (insertError) {
        throw insertError;
      }

      // Display confirmation message
      setConfirmationMessage('A fost trimis un email de confirmare la adresa dată.');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Error during signup:', error.message);
      setConfirmationMessage('Eroare la înregistrare. Încearcă din nou.');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div>
      <Meniusus />
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSignUp}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Adresă de e-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Parolă</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <button type="submit">Înregistrare</button>
          </div>
          {confirmationMessage && (
            <div className={styles.confirmationMessage}>
              {confirmationMessage}
            </div>
          )}
        </form>
        <div className={styles.footer}>
          <span>
            <Link to="/Login">Ai deja cont? Intră în cont</Link>
          </span>
        </div>
      </div>
      <Meniujos />
    </div>
  );
};

export default Inregistrare;

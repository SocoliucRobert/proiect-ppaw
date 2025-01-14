import React, { useState } from "react";
import styles from "../stilizare/resetareparola.module.css";
import Meniusus from "../PaginiPrincipale/Meniusus";
import Meniujos from "../PaginiPrincipale/Meniujos";
import supabase from '../Servicii/supabaseClient'; 

const Updateparola = () => {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      setMessage(`A intervenit o eroare la schimbarea parolei: ${error.message}`);
    } else {
      setMessage("Parola schimbata cu succes!");
      
    }
  };

  return (
    <div>
      <Meniusus />
      <div className={styles.container}>
        <div className={styles.form}>
        
          <form onSubmit={handlePasswordUpdate}>
            <label htmlFor="newPassword">Introduceți parola nouă:</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button type="submit7">Schimbă parola</button>
          </form>
          {message && <p>{message}</p>}
        </div>
        <div className={styles.footer}></div>
      </div>
      <Meniujos />
    </div>
  );
};

export default Updateparola;

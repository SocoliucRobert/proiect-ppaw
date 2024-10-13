import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './stilizare/meniusus.module.css';
import baraImage from './poze/bara.png';
import imagelogo from './poze/imagineLogo.png';
import { motion } from 'framer-motion';
import supabase from './supabaseClient';

const Meniusus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(true); 
  const [fadeClass, setFadeClass] = useState(''); 
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const session = localStorage.getItem('session');
      if (session) {
        try {
          const { data: { user }, error } = await supabase.auth.getUser();
          if (error || !user) {
            handleLogout();
            return;
          }
          setIsLoggedIn(true);
          setUsername(user.user_metadata.full_name || user.email);
        
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        setIsLoggedIn(false);
        setUsername('');
      }

      const currentPath = window.location.pathname;
      if ((session && currentPath === '/Login') || (session && currentPath === '/Inregistrare') || (session && currentPath === '/Resetareparola')) {
        navigate('/Acasa');
      }

      setIsLoading(false); 
      setFadeClass(styles['fade-in']); 
    };

    checkSession();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('session');
    setIsLoggedIn(false);
    setUsername('');
    navigate('/Login');
  };



  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
    >
      <div className={styles.topBar}>
        <div className={styles.logoContainer}>
          <img src={imagelogo} alt="Imagine Logo" className={styles.logo} />
          <span className={styles.brand}>CHESTIONARE AUTO</span>
        </div>
        <div className={`${styles.loginButton} ${fadeClass}`}>
          {isLoading ? (
            <span>Se incarca sesiunea</span>
          ) : isLoggedIn ? (
            <div className={styles.loggedInUser}>
              <span className={styles.loggedInText}  style={{ cursor: 'pointer' }}>
                Utilizator: {username}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className={`${styles.buttonStyle} ${styles.animateButton}`}
              >
                <span className={styles.buttonText}>IEȘIRE</span>
              </button>
            </div>
          ) : (
            <Link to="/Login" className={`${styles.buttonStyle} ${styles.animateButton}`}>
              <span className={styles.buttonText}>CONECTARE</span>
            </Link>
          )}
        </div>
      </div>
      <div className={styles.header}>
        <img src={baraImage} alt="Auto" className={styles.image} />
        <motion.div className={styles.wordsContainer}>
          <Link to="/Acasa" className={styles.link}><motion.span className={styles.word}>ACASĂ</motion.span></Link>
          <Link to="/Acasa" className={styles.link}><motion.span className={styles.word}>CHESTIONARE</motion.span></Link>
          <Link to="/Contact" className={styles.link}><motion.span className={styles.word}>CONTACT</motion.span></Link>
       
       
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Meniusus;

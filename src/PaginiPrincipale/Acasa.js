import React from "react";
import styles from "../stilizare/acasa.module.css";
import Meniusus from "./Meniusus";
import QuizzesDashboard from "../Business/QuizzesDashboard";

const Acasa = () => {
  return (
    <div>
      <Meniusus />
      <QuizzesDashboard />

      <div className={styles.imageContainer}></div>
    </div>
  );
};

export default Acasa;
